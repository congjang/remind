import { buildApp } from "./app.js";

// ─── 시작 시 필수 환경변수 가드 ────────────────────────────────────────────
// JWT_SECRET 없이는 로그인·인증 미들웨어 전부가 요청마다 500을 던지게 되므로,
// 산발적인 런타임 에러 대신 기동 시점에 즉시 crash-out.
if (!process.env.JWT_SECRET) {
  console.error(
    "[remind-api] FATAL: JWT_SECRET is not set — see server/.env.example. " +
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
