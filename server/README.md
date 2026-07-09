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

See [docs/first-launch/06-push-reminders.md](../docs/first-launch/06-push-reminders.md).
