// Simple frontend-only records store backed by localStorage.
// Intentionally minimal so it can be replaced by a real API later.

export type StoredRecord = {
  id: string;
  text: string;
  createdAt: string; // ISO string
  isTodo?: boolean;
  dueDate?: string | null; // YYYY-MM-DD
};

const STORAGE_KEY = "remind-records-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function readRaw(): StoredRecord[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is StoredRecord => {
      if (typeof item !== "object" || item === null) return false;
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
      return true;
    });
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
}): StoredRecord {
  const now = new Date();
  const record: StoredRecord = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    text: params.text,
    createdAt: now.toISOString(),
    isTodo: params.isTodo,
    dueDate: params.dueDate ?? null,
  };

  const current = getRecords();
  const next = [record, ...current];
  memoryCache = next;
  writeRaw(next);

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