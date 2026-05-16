/**
 * First-launch shared types: micro-journaling, emotion tags, AI artifacts, timeline.
 * Aligns with server Prisma schema (see server/prisma/schema.prisma).
 */

/** Catalog version for emotion tags (migrate mappings when bumping). */
export const EMOTION_CATALOG_VERSION = 1 as const;

export type EmotionTagId = string;

export type JournalEntrySource =
  | "app"
  | "widget"
  | "share"
  | "notification"
  | "import";

export type JournalEntry = {
  id: string;
  userId: string;
  /** Micro-journal body; never replaced by AI output. */
  body: string;
  emotionTagIds: EmotionTagId[];
  source: JournalEntrySource;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  /** Idempotent client mutation id for sync */
  clientMutationId?: string | null;
};

export type AiArtifactKind =
  | "summary"
  | "weekly_stats"
  | "reflection_card"
  | "timeline_summary";

export type AiArtifact = {
  id: string;
  entryId: string | null;
  userId: string;
  kind: AiArtifactKind;
  model: string;
  promptVersion: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

export type ReminderSpec = {
  id: string;
  userId: string;
  /** IANA tz, e.g. Asia/Seoul */
  timeZone: string;
  /** Cron-like or JSON schedule — server validates */
  schedule: Record<string, unknown>;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type JournalTimelineItem = {
  entry: JournalEntry;
  /** Latest reflection/summary for list preview (optional). */
  previewArtifact?: Pick<AiArtifact, "id" | "kind" | "payload"> | null;
};
