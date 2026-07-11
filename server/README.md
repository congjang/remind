# remind-api (Phase 1)

Fastify + Prisma + PostgreSQL. Dev auth uses **`X-Dev-Email`** header until JWT/session is added.

## Prerequisites

- Node 20+
- Docker (for Postgres / Redis)

## Setup

```bash
cd server
cp .env.example .env
docker compose up -d
npm install
npx prisma generate
npx prisma db push
npm run dev
```

- Health: [http://localhost:4000/health](http://localhost:4000/health)
- DB health: [http://localhost:4000/health/db](http://localhost:4000/health/db)

## Example: quick entry (widget/share contract)

```bash
curl -sS -X POST http://localhost:4000/v1/entries/quick \
  -H 'Content-Type: application/json' \
  -H 'X-Dev-Email: you@example.com' \
  -d '{"body":"hello","emotionTagIds":[],"source":"widget"}'
```

## Example: reminder spec + push token

See [docs/first-launch.md § 06](../docs/first-launch.md#06-푸시리마인더).

## Connecting the Next.js frontend

With `remind-api` running, create `.env.local` in the project root:

```bash
NEXT_PUBLIC_REMIND_API_URL=http://127.0.0.1:4000
NEXT_PUBLIC_DEV_EMAIL=you@example.com
```

On **기록 저장하기**, the app writes to `localStorage` first, then sends the same content to `POST /v1/entries/quick`. Leave the URL unset to stay local-only (see `.env.example` and [docs/PROGRESS_CHECKLIST.md § 부록 A](../docs/PROGRESS_CHECKLIST.md#부록-a--저장-흐름-병목-auth-근거) for the full save flow).
