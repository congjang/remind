This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## First launch (native + AI) — roadmap

- [docs/first-launch/README.md](docs/first-launch/README.md) — 범위·스택·백엔드·위젯·푸시 문서
- [docs/NEXT_TASKS_AND_COMPONENTS.md](docs/NEXT_TASKS_AND_COMPONENTS.md) — 플로우 다음 **권장 과업 3가지** + 컴포넌트 교체용 백로그
- [docs/GIT_SETUP_HISTORY.md](docs/GIT_SETUP_HISTORY.md) — 로컬 Git/remote 세팅 히스토리 정리
- [server/README.md](server/README.md) — Phase 1 API (`remind-api`)
- Shared types: [src/types/journal.ts](src/types/journal.ts)

### 기록 저장 → 서버(선택)

`remind-api`를 띄운 뒤 프로젝트 루트에 `.env.local`을 만들고:

```bash
NEXT_PUBLIC_REMIND_API_URL=http://127.0.0.1:4000
NEXT_PUBLIC_DEV_EMAIL=you@example.com
```

기록하기에서 **기록 저장하기** 시 `localStorage` 저장 후 같은 내용이 `POST /v1/entries/quick`으로 전송됩니다. URL을 비우면 기존처럼 로컬만 사용합니다. ([.env.example](.env.example) 참고)

## Design tokens (Figma plugin JSON)

운영 가이드: [docs/DESIGN_TOKENS_RUNBOOK.md](docs/DESIGN_TOKENS_RUNBOOK.md)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
