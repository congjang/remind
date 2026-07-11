import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { enqueueAiJob } from "./jobs/ai-queue.js";

// ─── 프로덕션 안전 가드 ────────────────────────────────────────────────────
// DEV AUTH는 개발 환경 전용입니다.
// NODE_ENV=production 에서는 반드시 ALLOW_DEV_AUTH=true 를 명시해야만 서버가 뜹니다.
// (실수로 프로덕션 배포 시 즉시 crash-out)
if (
  process.env.NODE_ENV === "production" &&
  process.env.ALLOW_DEV_AUTH !== "true"
) {
  console.error(
    "[remind-api] FATAL: X-Dev-Email auth is dev-only. " +
    "Set ALLOW_DEV_AUTH=true only if you have replaced this with real JWT auth. " +
    "Refusing to start."
  );
  process.exit(1);
}
// ──────────────────────────────────────────────────────────────────────────

const prisma = new PrismaClient();

const weatherSnapshotSchema = z.object({
  location: z.string(),
  temp: z.string(),
  extra: z.string(),
  icon: z.string(),
  weatherId: z.number().optional(),
});

const quickEntrySchema = z.object({
  body: z.string().min(1).max(20000),
  emotionTagIds: z.array(z.string()).default([]),
  source: z
    .enum(["app", "widget", "share", "notification", "import"])
    .default("app"),
  weather: weatherSnapshotSchema.optional(),
  /** 클라이언트가 생성한 재시도용 idempotency key (recordsStore의 로컬 record id). */
  clientMutationId: z.string().min(1).optional(),
});

const reminderSpecSchema = z.object({
  timeZone: z.string().min(1),
  schedule: z.record(z.string(), z.unknown()),
  active: z.boolean().default(true),
});

const pushTokenSchema = z.object({
  platform: z.enum(["ios", "android"]),
  // APNs/FCM 토큰은 보통 100~200자 내외 — 넉넉히 512자로 상한
  token: z.string().min(1).max(512),
});

/**
 * Dev-only auth helper.
 * TODO: JWT/session으로 교체 시 이 함수만 수정하면 됩니다.
 */
function resolveDevEmail(headers: Record<string, string | string[] | undefined>): string | null {
  const raw = headers["x-dev-email"];
  const email = typeof raw === "string" ? raw.trim() : "";
  return email || null;
}

async function main() {
  // bodyLimit: 기본값(1MB)에 암묵적으로 의존하지 않고 명시. quickEntrySchema의
  // body.max(20000)보다 여유 있게 잡아 JSON 오버헤드·다른 필드를 감안.
  const app = Fastify({ logger: true, bodyLimit: 1024 * 1024 });

  // 보안 헤더 (CSP, X-Frame-Options, X-Content-Type-Options 등) — JSON API라
  // CSP는 최소 정책으로 충분, 브라우저에서 직접 렌더링되는 리소스가 아님
  await app.register(helmet, { contentSecurityPolicy: false });

  // 레이트 리미팅 — 인증 붙기 전에도 공개 엔드포인트 스팸·DoS 방어
  // 로그인 브루트포스 방어는 AUTH 구현 시 더 낮은 한도로 별도 적용 예정
  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  // CORS: 개발 환경은 모든 오리진 허용, 프로덕션은 CORS_ORIGIN 환경변수로 제한
  // TODO: 프로덕션 배포 시 CORS_ORIGIN=https://your-domain.com 로 설정
  const corsOrigin =
    process.env.NODE_ENV === "production"
      ? (process.env.CORS_ORIGIN ?? false)
      : true;
  await app.register(cors, { origin: corsOrigin });

  app.get("/health", async () => ({ ok: true as const }));

  app.get("/health/db", async (_req, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { ok: true as const, db: "up" as const };
    } catch (e) {
      reply.code(503);
      return { ok: false as const, db: "down" as const, error: String(e) };
    }
  });

  // TODO: X-Dev-Email → JWT/session으로 교체 필요 (프로덕션 배포 전)
  app.post("/v1/entries/quick", async (req, reply) => {
    const email = resolveDevEmail(req.headers as Record<string, string | string[] | undefined>);
    if (!email) {
      return reply.code(401).send({
        error: "Missing X-Dev-Email (dev auth — replace with real auth)",
      });
    }

    const parsed = quickEntrySchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: parsed.error.flatten() });
    }

    const user = await prisma.user.upsert({
      where: { email },
      create: { email },
      update: {},
    });

    // 재시도(오프라인 복귀 등) 시 같은 clientMutationId로 중복 생성되지 않도록 멱등 처리.
    let entry;
    if (parsed.data.clientMutationId) {
      const existing = await prisma.journalEntry.findUnique({
        where: { clientMutationId: parsed.data.clientMutationId },
      });
      if (existing) {
        return { entry: existing };
      }
    }
    try {
      entry = await prisma.journalEntry.create({
        data: {
          userId: user.id,
          body: parsed.data.body,
          emotionTagIds: parsed.data.emotionTagIds,
          source: parsed.data.source,
          clientMutationId: parsed.data.clientMutationId,
          ...(parsed.data.weather != null
            ? { weather: parsed.data.weather as object }
            : {}),
        },
      });
    } catch (err) {
      // 동시 재시도로 인한 경합(unique 위반)도 멱등하게 기존 row를 반환.
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002" &&
        parsed.data.clientMutationId
      ) {
        entry = await prisma.journalEntry.findUniqueOrThrow({
          where: { clientMutationId: parsed.data.clientMutationId },
        });
      } else {
        throw err;
      }
    }

    enqueueAiJob({
      entryId: entry.id,
      userId: user.id,
      kind: "summary",
    });

    return { entry };
  });

  app.post("/v1/reminders", async (req, reply) => {
    const email = resolveDevEmail(req.headers as Record<string, string | string[] | undefined>);
    if (!email) {
      return reply.code(401).send({ error: "Missing X-Dev-Email" });
    }
    const parsed = reminderSpecSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: parsed.error.flatten() });
    }
    const user = await prisma.user.upsert({
      where: { email },
      create: { email },
      update: {},
    });
    const spec = await prisma.reminderSpec.create({
      data: {
        userId: user.id,
        timeZone: parsed.data.timeZone,
        schedule: parsed.data.schedule as object,
        active: parsed.data.active,
      },
    });
    return { reminder: spec };
  });

  app.post("/v1/push-tokens", async (req, reply) => {
    const email = resolveDevEmail(req.headers as Record<string, string | string[] | undefined>);
    if (!email) {
      return reply.code(401).send({ error: "Missing X-Dev-Email" });
    }
    const parsed = pushTokenSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: parsed.error.flatten() });
    }
    const user = await prisma.user.upsert({
      where: { email },
      create: { email },
      update: {},
    });
    const row = await prisma.devicePushToken.upsert({
      where: {
        userId_token: { userId: user.id, token: parsed.data.token },
      },
      create: {
        userId: user.id,
        platform: parsed.data.platform,
        token: parsed.data.token,
      },
      update: { lastSeenAt: new Date(), platform: parsed.data.platform },
    });
    return { pushToken: row };
  });

  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST ?? "0.0.0.0";
  await app.listen({ port, host });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
