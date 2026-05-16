/**
 * AI job queue — production: BullMQ + Redis (see docs/first-launch/05-ai-pipeline.md).
 * This module is intentionally a no-op stub until Redis worker is wired.
 */
/** Stub: log only. Replace with queue.add(...) when BullMQ is configured. */
export function enqueueAiJob(params) {
    if (process.env.NODE_ENV !== "production") {
        console.info("[remind-api][ai-queue] stub enqueue", params);
    }
}
