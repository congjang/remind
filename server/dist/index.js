import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { enqueueAiJob } from "./jobs/ai-queue.js";
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
});
const reminderSpecSchema = z.object({
    timeZone: z.string().min(1),
    schedule: z.record(z.string(), z.unknown()),
    active: z.boolean().default(true),
});
const pushTokenSchema = z.object({
    platform: z.enum(["ios", "android"]),
    token: z.string().min(1),
});
async function main() {
    const app = Fastify({ logger: true });
    await app.register(cors, { origin: true });
    app.get("/health", async () => ({ ok: true }));
    app.get("/health/db", async (_req, reply) => {
        try {
            await prisma.$queryRaw `SELECT 1`;
            return { ok: true, db: "up" };
        }
        catch (e) {
            reply.code(503);
            return { ok: false, db: "down", error: String(e) };
        }
    });
    /**
     * Dev-only auth: pass `X-Dev-Email` to upsert a user. Replace with JWT/session in production.
     */
    app.post("/v1/entries/quick", async (req, reply) => {
        const emailRaw = req.headers["x-dev-email"];
        const email = typeof emailRaw === "string" ? emailRaw.trim() : "";
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
        const entry = await prisma.journalEntry.create({
            data: {
                userId: user.id,
                body: parsed.data.body,
                emotionTagIds: parsed.data.emotionTagIds,
                source: parsed.data.source,
                ...(parsed.data.weather != null
                    ? { weather: parsed.data.weather }
                    : {}),
            },
        });
        enqueueAiJob({
            entryId: entry.id,
            userId: user.id,
            kind: "summary",
        });
        return { entry };
    });
    app.post("/v1/reminders", async (req, reply) => {
        const emailRaw = req.headers["x-dev-email"];
        const email = typeof emailRaw === "string" ? emailRaw.trim() : "";
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
                schedule: parsed.data.schedule,
                active: parsed.data.active,
            },
        });
        return { reminder: spec };
    });
    app.post("/v1/push-tokens", async (req, reply) => {
        const emailRaw = req.headers["x-dev-email"];
        const email = typeof emailRaw === "string" ? emailRaw.trim() : "";
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
