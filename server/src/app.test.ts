import { describe, it, expect, beforeEach } from "vitest";
import type { PrismaClient } from "@prisma/client";
import { buildApp } from "./app.js";

/**
 * 실제 Postgres 없이 라우트 로직(인증·소유권 검증·멱등성)만 검증하기 위한
 * 최소 in-memory Prisma 대역. buildApp()이 실제로 호출하는 메서드만 구현한다.
 * (server/README.md — 실제 DB 연동 통합 테스트는 `docker compose up -d`로
 * Postgres를 띄운 뒤 별도로 수행)
 */
function createFakePrisma() {
  type FakeUser = { id: string; email: string; createdAt: Date; updatedAt: Date };
  type FakeEntry = {
    id: string;
    userId: string;
    body: string;
    emotionTagIds: string[];
    source: string;
    weather: unknown;
    deleted: boolean;
    clientMutationId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };

  const usersByEmail = new Map<string, FakeUser>();
  const entriesById = new Map<string, FakeEntry>();
  let seq = 0;
  const nextId = (prefix: string) => `${prefix}_${++seq}`;

  const prisma = {
    user: {
      async upsert({ where, create }: { where: { email: string }; create: { email: string } }) {
        const existing = usersByEmail.get(where.email);
        if (existing) return existing;
        const now = new Date();
        const user: FakeUser = { id: nextId("user"), email: create.email, createdAt: now, updatedAt: now };
        usersByEmail.set(where.email, user);
        return user;
      },
    },
    journalEntry: {
      async create({ data }: { data: Partial<FakeEntry> & { userId: string; body: string } }) {
        const now = new Date();
        const entry: FakeEntry = {
          id: nextId("entry"),
          userId: data.userId,
          body: data.body,
          emotionTagIds: data.emotionTagIds ?? [],
          source: data.source ?? "app",
          weather: data.weather ?? null,
          deleted: false,
          clientMutationId: data.clientMutationId ?? null,
          createdAt: now,
          updatedAt: now,
        };
        entriesById.set(entry.id, entry);
        return entry;
      },
      async findUnique({ where }: { where: { id?: string; clientMutationId?: string } }) {
        if (where.id) return entriesById.get(where.id) ?? null;
        if (where.clientMutationId) {
          for (const e of entriesById.values()) {
            if (e.clientMutationId === where.clientMutationId) return e;
          }
        }
        return null;
      },
      async update({ where, data }: { where: { id: string }; data: Partial<FakeEntry> }) {
        const entry = entriesById.get(where.id);
        if (!entry) throw new Error(`no entry ${where.id}`);
        Object.assign(entry, data, { updatedAt: new Date() });
        return entry;
      },
    },
  };

  return { prisma: prisma as unknown as PrismaClient, usersByEmail, entriesById };
}

describe("DELETE /v1/entries/:id (soft delete)", () => {
  let fake: ReturnType<typeof createFakePrisma>;
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeEach(async () => {
    fake = createFakePrisma();
    app = await buildApp({ prisma: fake.prisma });
  });

  async function createEntry(email: string, body = "테스트 기록") {
    const res = await app.inject({
      method: "POST",
      url: "/v1/entries/quick",
      headers: { "x-dev-email": email, "content-type": "application/json" },
      payload: { body },
    });
    expect(res.statusCode).toBe(200);
    return res.json().entry as { id: string; deleted: boolean; body: string };
  }

  it("X-Dev-Email 헤더 없이 호출하면 401", async () => {
    const res = await app.inject({ method: "DELETE", url: "/v1/entries/whatever" });
    expect(res.statusCode).toBe(401);
  });

  it("존재하지 않는 id는 404", async () => {
    const res = await app.inject({
      method: "DELETE",
      url: "/v1/entries/does-not-exist",
      headers: { "x-dev-email": "a@example.com" },
    });
    expect(res.statusCode).toBe(404);
  });

  it("소유자가 호출하면 deleted:true로 바뀌고 body는 그대로 유지된다", async () => {
    const entry = await createEntry("owner@example.com", "지우지 마세요 원본");

    const res = await app.inject({
      method: "DELETE",
      url: `/v1/entries/${entry.id}`,
      headers: { "x-dev-email": "owner@example.com" },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.entry.deleted).toBe(true);
    expect(body.entry.body).toBe("지우지 마세요 원본"); // append-only — 삭제가 본문을 건드리면 안 됨
  });

  it("다른 사용자의 기록을 삭제하려 하면 404 (소유권 검증, 존재 여부 노출 방지)", async () => {
    const entry = await createEntry("owner@example.com");

    const res = await app.inject({
      method: "DELETE",
      url: `/v1/entries/${entry.id}`,
      headers: { "x-dev-email": "attacker@example.com" },
    });

    expect(res.statusCode).toBe(404);
    expect(fake.entriesById.get(entry.id)?.deleted).toBe(false); // 실제로도 삭제되지 않았는지 확인
  });

  it("이미 삭제된 기록을 다시 삭제해도 에러 없이 멱등하게 처리된다", async () => {
    const entry = await createEntry("owner@example.com");

    const first = await app.inject({
      method: "DELETE",
      url: `/v1/entries/${entry.id}`,
      headers: { "x-dev-email": "owner@example.com" },
    });
    expect(first.statusCode).toBe(200);

    const second = await app.inject({
      method: "DELETE",
      url: `/v1/entries/${entry.id}`,
      headers: { "x-dev-email": "owner@example.com" },
    });
    expect(second.statusCode).toBe(200);
    expect(second.json().entry.deleted).toBe(true);
  });
});
