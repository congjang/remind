import { buildApp } from "./app.js";

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

async function main() {
  const app = await buildApp();
  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST ?? "0.0.0.0";
  await app.listen({ port, host });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
