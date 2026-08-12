// Simple frontend-only records store backed by localStorage.
// Intentionally minimal so it can be replaced by a real API later.

/**
 * 스키마 버전 관리
 * - 필드 추가/제거/타입 변경 시 CURRENT_SCHEMA_VERSION 을 올리고
 *   migrateRecords() 에 해당 버전 처리를 추가하세요.
 *
 * 버전 히스토리:
 *   1 — 최초 (id, text, createdAt, isTodo?, dueDate?, emotion?, weather?)
 *   2 — synced?: boolean 추가 (서버 동기화 재시도용). 기존 레코드는 재시도 폭주를
 *       막기 위해 synced: true로 간주(서버 동기화 여부는 실제로 불명확하나,
 *       과거엔 재시도 자체가 없었으므로 안전한 기본값).
 */
const CURRENT_SCHEMA_VERSION = 2;
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
      case 1:
        data = data.map((r) => ({ ...r, synced: true }));
        break;
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
  /** 서버(Fastify) 동기화 성공 여부. false/undefined면 재시도 대상. */
  synced?: boolean;
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
  if (typeof it.synced !== "undefined" && typeof it.synced !== "boolean") return false;
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

/**
 * localStorage 쓰기 시도. quota 초과·Safari 프라이빗 모드 등에서 예외가 나면
 * false를 반환한다 — 예전엔 여기서 그냥 삼켜서 호출부가 "저장된 줄" 알았지만,
 * 실제로는 새로고침하면 그 기록이 사라지는 무통보 유실이었다(SYNC-SAFETY).
 * 호출부(saveRecord)가 이 반환값을 보고 사용자에게 실패를 알릴 수 있게 한다.
 */
function writeRaw(records: StoredRecord[]): boolean {
  if (!isBrowser()) return true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (e) {
    console.warn("[recordsStore] localStorage 쓰기 실패 — 저장 공간이 가득 찼거나 프라이빗 모드일 수 있습니다", e);
    return false;
  }
}

let memoryCache: StoredRecord[] | null = null;

/** 다음 getRecords()가 localStorage를 다시 읽도록 함(피드 새로고침 등). */
export function invalidateRecordsCache() {
  memoryCache = null;
}

if (isBrowser()) {
  // 다른 탭이 STORAGE_KEY를 쓰면 이 탭의 메모리 캐시가 그 즉시 낡은 상태가 된다 —
  // 다음 getRecords() 호출이 반드시 localStorage를 다시 읽도록 무효화한다.
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) invalidateRecordsCache();
  });
}

export function getRecords(): StoredRecord[] {
  if (memoryCache) return memoryCache;
  const fromStorage = readRaw();
  memoryCache = fromStorage.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return memoryCache;
}

/**
 * 읽기(현재 상태 확인) → 병합 → 쓰기를 탭 간에 원자적으로 실행한다.
 * localStorage는 탭마다 별도 JS 스레드에서 동작해 "읽고 쓰는 사이"에 다른 탭이 끼어들면
 * 배열 전체를 덮어쓰는 writeRaw() 특성상 그 탭의 기록이 사라질 수 있다 — remindApi.ts의
 * refresh token 탭 경합과 같은 클래스의 문제라 같은 해법(Web Locks API)을 재사용한다.
 * 지원 안 하는 환경(구형 브라우저)에서는 락 없이 그대로 실행(기존 동작으로 폴백).
 */
async function withRecordsLock<T>(fn: () => T): Promise<T> {
  if (isBrowser() && "locks" in navigator) {
    return await navigator.locks.request("remind-records-write", () => fn());
  }
  return fn();
}

export type SaveRecordResult = StoredRecord & {
  /** false면 이 기록이 실제로는 localStorage에 저장되지 못했다는 뜻 — 호출부가 사용자에게 알려야 함. */
  persisted: boolean;
};

export async function saveRecord(params: {
  text: string;
  isTodo?: boolean;
  dueDate?: string | null;
  emotion?: string;
  weather?: StoredWeatherSnapshot | null;
}): Promise<SaveRecordResult> {
  const now = new Date();
  const record: StoredRecord = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    text: params.text,
    createdAt: now.toISOString(),
    isTodo: params.isTodo,
    dueDate: params.dueDate ?? null,
    emotion: params.emotion,
    synced: false,
    ...(params.weather ? { weather: params.weather } : {}),
  };

  let persisted = true;
  await withRecordsLock(() => {
    // getRecords()의 메모리 캐시가 아니라 readRaw()로 락 안에서 최신 localStorage를 직접 읽는다.
    const current = readRaw();
    const next = [record, ...current];
    memoryCache = next; // 낙관적 갱신 — 아래에서 실패하면 되돌린다.
    persisted = writeRaw(next);
    if (persisted) {
      writeMeta({ schemaVersion: CURRENT_SCHEMA_VERSION });
    } else {
      // 쓰기가 실패했는데 memoryCache만 next로 남아있으면, 화면(예: "N개 쌓았어요")은
      // 마치 저장된 것처럼 보이지만 새로고침하면 사라지는 유령 기록이 생긴다 — 실제로
      // 저장에 성공한 상태(current)로 되돌려 getRecords()가 진실을 반환하게 한다.
      memoryCache = current;
    }
  });

  return { ...record, persisted };
}

/** 아직 서버 동기화에 성공하지 못한 레코드 목록 (재시도 대상). */
export function getUnsyncedRecords(): StoredRecord[] {
  return getRecords().filter((r) => r.synced !== true);
}

/** 서버 동기화 성공 시 호출 — 재시도 대상에서 제외. */
export async function markRecordSynced(id: string): Promise<void> {
  await withRecordsLock(() => {
    const current = readRaw();
    const next = current.map((r) => (r.id === id ? { ...r, synced: true } : r));
    memoryCache = next;
    writeRaw(next);
  });
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