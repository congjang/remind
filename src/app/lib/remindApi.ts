/**
 * Optional sync to remind-api (Phase 1). If NEXT_PUBLIC_REMIND_API_URL is unset, no network calls.
 * @see server/README.md
 */

import type { StoredWeatherSnapshot } from "./recordsStore";

function baseUrl() {
  const raw = process.env.NEXT_PUBLIC_REMIND_API_URL?.trim();
  return raw ? raw.replace(/\/$/, "") : "";
}

function devEmail(): string {
  const fromEnv = process.env.NEXT_PUBLIC_DEV_EMAIL?.trim();
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem("remind-dev-email");
      if (stored?.trim()) return stored.trim();
    } catch {
      // ignore
    }
  }
  return "dev@local.invalid";
}

export async function postQuickEntry(params: {
  body: string;
  emotionTagIds?: string[];
  source?: "app" | "widget" | "share" | "notification" | "import";
  /** 기록하기 저장 시점 날씨(로컬과 동일 스냅샷). 서버가 지원할 때 DB에 함께 저장 */
  weather?: StoredWeatherSnapshot | null;
}): Promise<void> {
  const base = baseUrl();
  if (!base) return;

  const res = await fetch(`${base}/v1/entries/quick`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Dev-Email": devEmail(),
    },
    body: JSON.stringify({
      body: params.body,
      emotionTagIds: params.emotionTagIds ?? [],
      source: params.source ?? "app",
      ...(params.weather ? { weather: params.weather } : {}),
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `HTTP ${res.status}`);
  }
}
