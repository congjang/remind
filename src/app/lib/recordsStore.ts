// Simple frontend-only records store backed by localStorage.
// Intentionally minimal so it can be replaced by a real API later.

/**
 * 스키마 버전 관리
 * - 필드 추가/제거/타입 변경 시 CURRENT_SCHEMA_VERSION 을 올리고
 *   migrateRecords() 에 해당 버전 처리를 추가하세요.
 *
 * 버전 히스토리:
 *   1 — 최초 (id, text, createdAt, isTodo?, dueDate?, emotion?, weather?)
 */
const CURRENT_SCHEMA_VERSION = 1;
const META_KEY = "remind-records-meta-v1";

type StoreMeta = {
  schemaVersion: number;
};

function readMeta(): StoreMeta {
  if (!isBrowser()) return { schemaVersion: CURRENT_SCHEMA_VERSION };
  try {
    const raw = window.localStorage.getItem(META_KEY);
    if (!raw) return { schemaVersion: CURRENT_SCHEMA_VERSION };
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof (parsed as Record<string, unknown>).schemaVersion === "number"
    ) {
      return { schemaVersion: (parsed as { schemaVersion: number }).schemaVersion };
    }
  } catch {
    // ignore
  }
  return { schemaVersion: CURRENT_SCHEMA_VERSION };
}

function writeMeta(meta: StoreMeta) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch {
    // ignore
  }
}

/**
 * 구버전 데이터를 현재 스키마로 마이그레이션합니다.
 * 새 버전 추가 시: switch 문에 case 를 추가하고 CURRENT_SCHEMA_VERSION 을 올리세요.
 */
function migrateRecords(records: unknown[], fromVersion: number): StoredRecord[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data = records as any[];
  let version = fromVersion;

  while (version < CURRENT_SCHEMA_VERSION) {
    switch (version) {
      // 예시: 버전 1 → 2 마이그레이션
      // case 1:
      //   data = data.map((r) => ({ ...r, newField: "defaultValue" }));
      //   break;
      default:
        // 알 수 없는 버전: 안전하게 초기화 (데이터 손실 방지보다 무결성 우선)
        console.warn(`[recordsStore] Unknown schema version ${version}, resetting records.`);
        return [];
    }
    version++;
  }

  return data as StoredRecord[];
}

/** 기록 저장 시점 상단 날씨 블록 스냅샷 (OpenWeatherMap + 역지오코딩 결과). */
export type StoredWeatherSnapshot = {
  location: string;
  temp: string;
  extra: string;
  icon: string;
  weatherId?: number;
};

function isStoredWeatherSnapshot(w: unknown): w is StoredWeatherSnapshot {
  if (typeof w !== "object" || w === null) return false;
  const o = w as Record<string, unknown>;
  if (
    typeof o.location !== "string" ||
    typeof o.temp !== "string" ||
    typeof o.extra !== "string" ||
    typeof o.icon !== "string"
  ) {
    return false;
  }
  if (o.weatherId !== undefined && typeof o.weatherId !== "number") return false;
  return true;
}

export type StoredRecord = {
  id: string;
  text: string;
  createdAt: string; // ISO string
  isTodo?: boolean;
  dueDate?: string | null; // YYYY-MM-DD
  /** Emotion icon id from 기록하기 (optional for older records). */
  emotion?: string;
  /** 저장 시점 날씨 (optional). */
  weather?: StoredWeatherSnapshot;
};

const STORAGE_KEY = "remind-records-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function validateRecord(item: unknown): item is StoredRecord {
  if (typeof item !== "object" || item === null) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const it = item as any;
  if (typeof it.id !== "string") return false;
  if (typeof it.text !== "string") return false;
  if (typeof it.createdAt !== "string") return false;
  if (typeof it.isTodo !== "undefined" && typeof it.isTodo !== "boolean") return false;
  if (
    typeof it.dueDate !== "undefined" &&
    it.dueDate !== null &&
    typeof it.dueDate !== "string"
  )
    return false;
  if (typeof it.emotion !== "undefined" && typeof it.emotion !== "string") return false;
  if (it.weather !== undefined && !isStoredWeatherSnapshot(it.weather)) return false;
  return true;
}

function readRaw(): StoredRecord[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    // 스키마 버전 확인 후 마이그레이션
    const meta = readMeta();
    let records = parsed;
    if (meta.schemaVersion < CURRENT_SCHEMA_VERSION) {
      records = migrateRecords(parsed, meta.schemaVersion);
      writeRaw(records as StoredRecord[]);
      writeMeta({ schemaVersion: CURRENT_SCHEMA_VERSION });
    }

    return records.filter(validateRecord);
  } catch {
    return [];
  }
}

function writeRaw(records: StoredRecord[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded, etc)
  }
}

let memoryCache: StoredRecord[] | null = null;

/** 다음 getRecords()가 localStorage를 다시 읽도록 함(피드 새로고침 등). */
export function invalidateRecordsCache() {
  memoryCache = null;
}

export function getRecords(): StoredRecord[] {
  if (memoryCache) return memoryCache;
  const fromStorage = readRaw();
  memoryCache = fromStorage.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return memoryCache;
}

export function saveRecord(params: {
  text: string;
  isTodo?: boolean;
  dueDate?: string | null;
  emotion?: string;
  weather?: StoredWeatherSnapshot | null;
}): StoredRecord {
  const now = new Date();
  const record: StoredRecord = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    text: params.text,
    createdAt: now.toISOString(),
    isTodo: params.isTodo,
    dueDate: params.dueDate ?? null,
    emotion: params.emotion,
    ...(params.weather ? { weather: params.weather } : {}),
  };

  const current = getRecords();
  const next = [record, ...current];
  memoryCache = next;
  writeRaw(next);
  // 처음 저장 시 메타 버전 보장
  writeMeta({ schemaVersion: CURRENT_SCHEMA_VERSION });

  return record;
}

export function clearAllRecords() {
  memoryCache = [];
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}