# 백엔드 아키텍처 (Phase 1)

## 구성

- **API**: HTTPS JSON API (권장: Fastify 또는 Nest).
- **DB**: PostgreSQL (Prisma 스키마: [server/prisma/schema.prisma](../../server/prisma/schema.prisma)).
- **객체 저장**: 이미지/첨부가 생기면 S3 호환 버킷 (1.0에서는 생략 가능).
- **작업 큐**: Redis + BullMQ (AI 잡·집계) — [server/src/jobs/ai-queue.ts](../../server/src/jobs/ai-queue.ts) 스텁.

## Auth

- **액세스 토큰 + 리프레시** 또는 세션 쿠키(모바일은 Bearer 권장).
- 비밀번호는 해시만 저장 (Argon2/bcrypt).

## 동기화 (오프라인 큐)

- 클라이언트: 로컬 DB(SQLite/Watermelon 등) + **아웃박스 패턴** (실패 재시도).
- 서버: `Entry`에 `updatedAt`, `clientMutationId`로 멱등 처리.

## 백업

- DB **자동 스냅샷** + **PITR** 가능한 호스팅(RDS, managed Postgres) 권장.
- 앱 내 “내보내기”는 1.x로도 가능.

## 로컬 실행

[server/README.md](../../server/README.md) 참고.

---

## 구현 이력 (레포 동기화)

Phase 1 API·Next 앱 연동. (최신이 위.)

### 2026-04-17

- **프로덕션 가드:** `NODE_ENV=production` && `ALLOW_DEV_AUTH !== "true"` → `process.exit(1)`. 실수로 dev auth를 프로덕션에 배포하면 즉시 종료. `server/.env.example`에 `ALLOW_DEV_AUTH` 주석 경고 추가.
- **CORS 환경변수 제한:** `CORS_ORIGIN` 환경변수 도입. 프로덕션에서는 지정 도메인만 허용, 개발에서는 전체 허용 유지. `server/.env.example`에 `CORS_ORIGIN` 항목 추가.
- **`resolveDevEmail()` 헬퍼:** 3개 라우트의 `X-Dev-Email` 추출 코드 중앙화. JWT 교체 시 이 함수만 수정하면 전체 반영.
- **JWT 교체 TODO:** `// TODO: X-Dev-Email → JWT/session으로 교체 필요` 주석 삽입. 완료 기준: 실 유저 세션 발급·검증.

### 2025-03-24

- **Next (앱 라우트):** `GET /api/weather?lat=&lon=` — OpenWeatherMap Current Weather + Air Pollution; 선택 **카카오** `coord2address`로 시·구·동 문자열. 환경 변수: `OPENWEATHERMAP_API_KEY`, `KAKAO_REST_API_KEY` (Next 서버 전용, `.env.local`).
- **remind-api:** `POST /v1/entries/quick` 본문에 선택 **`weather`** (객체: `location`, `temp`, `extra`, `icon`, 선택 `weatherId`). Prisma `JournalEntry.weather` (`Json?`). 마이그레이션: `server/prisma/migrations/20250324120000_journal_entry_weather/`.
- **동기화:** 클라이언트는 로컬 `StoredRecord`에 동일 스냅샷을 먼저 저장 후, API URL이 설정된 경우에만 서버로 전송.
