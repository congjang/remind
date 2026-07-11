/**
 * Optional sync to remind-api (Phase 1). If NEXT_PUBLIC_REMIND_API_URL is unset, no network calls.
 * @see server/README.md
 */

import {
  getUnsyncedRecords,
  markRecordSynced,
  type StoredWeatherSnapshot,
} from "./recordsStore";

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
  /** 재시도 시 서버 측 중복 생성을 막기 위한 idempotency key (로컬 record id 재사용). */
  clientMutationId?: string;
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
      ...(params.clientMutationId
        ? { clientMutationId: params.clientMutationId }
        : {}),
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || `HTTP ${res.status}`);
  }
}

/**
 * 로컬엔 저장됐지만 서버 동기화에 실패했던 기록을 재시도.
 * 온라인 복귀 시점(앱 포커스, `online` 이벤트)에 호출됩니다.
 * 순차 처리 + 첫 네트워크 단절 시 즉시 중단 — 오프라인 상태에서 나머지를 계속
 * 재시도해 요청을 낭비하지 않기 위함.
 */
export async function syncPendingRecords(): Promise<void> {
  if (!baseUrl()) return;

  for (const record of getUnsyncedRecords()) {
    try {
      await postQuickEntry({
        body: record.text,
        emotionTagIds: record.emotion ? [`emotion:${record.emotion}`] : [],
        source: "app",
        weather: record.weather ?? undefined,
        clientMutationId: record.id,
      });
      markRecordSynced(record.id);
    } catch (e) {
      console.warn("[remind] 미동기화 기록 재시도 실패, 다음 기회에 재시도", e);
      return;
    }
  }
}
