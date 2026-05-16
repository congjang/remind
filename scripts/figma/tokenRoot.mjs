import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** remind-app 저장소 루트 (`scripts/figma` → `../../`) */
export const REMIND_APP_ROOT = path.resolve(__dirname, "..", "..");

/**
 * remind-app과 형제인 `adailyrecord-design-tokens` 패키지 루트.
 * `DESIGN_TOKENS_ROOT`로 덮어쓸 수 있음.
 */
export const DESIGN_TOKENS_ROOT =
  process.env.DESIGN_TOKENS_ROOT ||
  path.resolve(REMIND_APP_ROOT, "..", "adailyrecord-design-tokens");

/**
 * figma.config.json 상대 경로 해석.
 * - `.cache/...` → remind-app 루트 기준 (export 캐시)
 * - 그 외 → design-tokens 패키지 루트 기준
 */
export function resolveFigmaPath(relativePath) {
  const p = relativePath.replace(/\\/g, "/");
  if (p.startsWith(".cache")) {
    return path.resolve(REMIND_APP_ROOT, p);
  }
  return path.resolve(DESIGN_TOKENS_ROOT, p);
}
