# 전체 진행 현황 체크리스트

> 마지막 갱신: 2026-07-13 (디자인 제외 백엔드·데이터 안정화 3건: `SYNC-LIVE` 로그아웃/재로그인 로컬 데이터 무효화, `DATA-INTEGRITY` 소프트 삭제 엔드포인트 + 테스트, `AUTH` 데이터 마이그레이션 전략 초안)
> 디자인 시스템 검토 및 인터페이스 디자인 작업은 이 목록에서 제외합니다.

---

## Product Integrity 현황판

`SYNC`(기능 무결성)와 `SECURITY`(리스크 방어)는 판단 기준과 우선순위 논리가 다른 별개 축이지만, 둘 다 "제품이 사용자를 배신하지 않는다"는 같은 상위 목표를 섬깁니다. 이 상위 개념을 **Product Integrity**로 정의하고, 아래 두 축은 **이원 관리**(따로 추적, 합치지 않음) 합니다.

```
기능 무결성 SYNC       ████████████░░░░░░░░░░░░░░░░░░  5 / 12  (42%)
리스크 방어 SECURITY   █████████████████░░░░░░░░░░░░░ 10 / 18  (56%)
──────────────────────────────────────────────────────────────
Product Integrity 전체 ███████████████░░░░░░░░░░░░░░░ 15 / 30  (50%)
```

| 축 | 완료 | 어디서 | 남음 | 어디서 |
|---|---|---|---|---|
| **기능 무결성 (SYNC)** | `SYNC` 4/4, `SYNC-LIVE` 1/8(로그아웃/재로그인 로컬 데이터 무효화, 2026-07-13) | [부록 D](#sync--오프라인-동기화--저장-안전장치-2026-05-16--2026-07-11) / [부록 C § SYNC-LIVE](#sync-live--서버-동기화-활성화-실사용자-연결) | `SYNC-LIVE` 7/8 | [부록 C](#sync-live--서버-동기화-활성화-실사용자-연결) |
| **리스크 방어 (SECURITY)** | `SECURITY-BASELINE` 3/3, `SECURITY-HARDENING` 7/15(상시 보안 방어) | [부록 D](#security-baseline--최소-보안-가드-2026-04-17) / [부록 C § 상시 보안 방어](#상시-보안-방어) | `SECURITY-HARDENING` 3/15(상시 보안 방어 남은 것) + 5/15(배포 전 체크리스트, 전부 대기) | [부록 C § 상시 보안 방어](#상시-보안-방어) / [부록 C § 배포 전 체크리스트](#배포-전-체크리스트) |

`SECURITY-HARDENING`의 완료/전체는 **상시 보안 방어 + 배포 전 체크리스트를 합산**한 숫자입니다 (7/15) — 두 섹션은 성격이 달라 체크리스트 안에서는 나눠 보여주지만, 진행률 집계는 하나로 합쳐서 봅니다.

### 분류 기준 — 새 작업은 이 기준으로 자동 분류합니다

- **기능 무결성 (`SYNC`)**: 사용자가 **데이터 유실 없이** 서비스를 이용하게 하는 핵심 로직. (예: 재시도, 멱등 처리, 오프라인 큐, 백업·복구)
- **리스크 방어 (`SECURITY`)**: **외부 위협이나 오남용**으로부터 서비스를 보호하는 방어적 로직. (예: 인증, 레이트 리미팅, 보안 헤더, 입력 검증)

새 작업이 위 기준에 명확히 맞으면 묻지 않고 해당 축으로 분류해 이 표와 부록 C/D를 갱신합니다. 애매하면 근거를 적고 승인을 받은 뒤 반영합니다 — 아래 두 건은 2026-07-11에 승인 완료.

### 판정 완료 (2026-07-11 승인) — Product Integrity 밖에 유지

- **`AUTH`(신규 서버 실사용자 인증)** — 정의상 리스크 방어에 부합하지만, `SYNC-LIVE`를 포함해 거의 모든 후속 작업이 `AUTH` 완료를 전제로 하는 **"게이팅 인프라"** 성격이 강함. → C/H/M/L 표의 별도 최우선순위(🔴 Critical) 항목으로 유지, Product Integrity에는 포함하지 않음.
- **`DATA-INTEGRITY`(데이터 삭제·무결성 보장)** — 세부 항목 중 `body` 불변성·백업 복구 검증은 기능 무결성에 부합하지만, 삭제·내보내기는 사용자가 **의도적으로** 자기 데이터를 지우거나 가져가는 기능이라 유실 방지도 위협 방어도 아닌 **제3의 성격(데이터 소유권·사용자 권리)**. 10개 항목을 쪼개지 않고 → 독립 항목으로 통째로 유지, Product Integrity에는 포함하지 않음.

> 위 두 건은 승인 전까지 표·부록 C/D 어디도 옮기지 않았습니다 — 지금 상태 그대로입니다.

---

## 용어 — 2026-07-11부터 이 이름으로 부릅니다

`C-1`, `H-3`, `M-1` 같은 코드는 그 자체로 무슨 뜻인지 알 수 없어서 매번 표를 찾아봐야 했습니다. 이제 **기능을 바로 알 수 있는 이름**으로 부릅니다. 이미 끝난 대화·커밋 메시지에는 옛 코드가 남아있을 수 있어 매핑만 남겨둡니다 — 앞으로 이 문서를 포함해 어디서도 옛 코드를 새로 쓰지 않습니다.

| 새 이름 | 이전 코드 | 내용 |
|---|---|---|
| `AUTH-SERVER` | C-1 | JWT 인증 구현 (서버) |
| `AUTH-API` | C-2 | 회원가입 / 로그인 API |
| `AUTH-CLIENT` | C-3 | 클라이언트 인증 플로우 |
| `EMPTY-UI` | H-3 | 피드 빈 상태 UX |
| `PROFILE-UI` | H-4 | Red UI 교체 — 마이페이지 |
| `EDITOR-UI` | H-5 | Red UI 교체 — 편집 오버레이 |
| `ACCESSIBILITY` | M-1 | 접근성 최소 세트 |
| `SYNC-LIVE` | M-2 | 서버 동기화 활성화 (실사용자 연결) |
| `AI-PIPELINE` | M-3 | AI 파이프라인 구현 |
| `REFLECTION-UI` | M-4 | 회고 카드 UI |
| `TESTING` | L-1 | 유닛·통합 테스트 |
| `ERROR-TRACKING` | L-2 | 에러 추적 (Sentry) |
| `PUSH-NOTIFICATION` | L-3 | 푸시 알림 연동 |
| `NATIVE-APP` | L-4 | 네이티브 앱 착수 (Expo) |
| `WIDGET` | L-5 | 홈 화면 위젯 (1.1) |
| `STORYBOOK-DEPLOY` | L-6 | Storybook 배포 |
| `SAVE-GUARD` (완료) | H-1 | 저장 중 중복 클릭 방지 |
| `SAVE-ERROR-TOAST` (완료) | H-2 | 네트워크 실패 토스트 |
| `SYNC` (완료) | M-5 | 오프라인 동기화 큐 (재시도 + 멱등 처리) |
| `SECURITY-HARDENING` | 신규 (2026-07-11) | 레이트 리미팅·보안 헤더·요청 크기 제한 등 서버 보안 강화 |
| `DATA-INTEGRITY` | 신규 (2026-07-11) | 데이터 삭제·내보내기, `body` 불변성 강제, 백업 검증 |

`AUTH-SERVER`·`AUTH-API`·`AUTH-CLIENT` 셋을 묶어 말할 땐 그냥 **`AUTH`**라고 부릅니다.

---

## 현재 위치 (전체 프로세스 기준)

```
[웹 프로토타입]──────────────────────────────[V1.0 출시]
   ██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░
       ~40%
```

| 단계 | 상태 | 비고 |
|------|------|------|
| 핵심 UI 플로우 (기록·피드·마이) | ✅ 웹 작동 | Red UI 일부 잔존 |
| 디자인 토큰 시스템 (Figma 연동) | ✅ 운영 중 | primitives + semantic CSS |
| 로컬 데이터 저장 (localStorage) | ✅ 완료 | 스키마 버전 관리 포함 |
| 서버 스캐폴딩 (Fastify + Prisma) | ✅ 로컬 실행 가능 | 프로덕션 배포 불가 (AUTH 미완) |
| 날씨 스냅샷 (OWM + Kakao) | ✅ 완료 | |
| `SYNC` — 오프라인 동기화 (재시도+멱등) | ✅ 완료 | `synced` 필드 + `syncPendingRecords()` + 서버 `clientMutationId` 멱등 upsert (2026-07-11) |
| `SAVE-GUARD` — 저장 중 중복 클릭 방지 | ✅ 완료 | `isSaving` 가드 + 버튼 `disabled` + "저장 중..." 라벨 (2026-05-16부터 이미 있었음) |
| `SAVE-ERROR-TOAST` — 네트워크 실패 토스트 | ✅ 완료 | 실패 시 `ToastMessage`로 "저장됨 · 서버 연결 실패" 표시 (2026-07-09부터 이미 있었음) |
| FAB 기반 내비게이션 | ✅ 완료 | BottomNavBar 제거 |
| 프로젝트 규칙 (CLAUDE.md) | ✅ 완료 | |
| **`AUTH` — 인증 (JWT)** | 🔴 미완 (1/13) | 프로덕션 배포 차단. 데이터 마이그레이션 전략 초안만 작성됨([data-migration.md](./data-migration.md), 2026-07-13) — JWT 구현 자체는 미착수 |
| **`SECURITY-HARDENING`** | 🟡 진행중 (7/15) | 상시 보안 방어 7/10 완료(헤더·레이트 리미팅·bodyLimit·HSTS·토큰 길이·환경변수·`npm audit`), 배포 전 체크리스트 5개는 전부 배포 환경 접근이 필요해 대기 |
| **`DATA-INTEGRITY`** | 🟡 진행중 (1/10) | `DELETE /v1/entries/:id` 소프트 삭제 구현(`deleted` 필드 사용, `body` 불변 유지, 2026-07-13). 삭제 UI·회원 탈퇴 정책 등 나머지 9개는 대기 |
| **`SYNC-LIVE` — 서버 동기화 (실 사용자 연결)** | 🟡 진행중 (1/8) | 로그아웃/재로그인 시 로컬 데이터 무효화 구현(`session.ts`, 2026-07-13). `X-Dev-Email` → `Authorization: Bearer` 교체 등 나머지 7개는 대기 |
| **`AI-PIPELINE`** | 🔴 스텁만 | BullMQ + LLM 연동 없음 |
| **`PUSH-NOTIFICATION`** | 🔴 미완 | DB 테이블만 존재 |
| **`NATIVE-APP`** | 🔴 미착수 | README 플레이스홀더만 |
| `TESTING` | 🟡 시작 | 서버 `vitest` 도입, 소프트 삭제 라우트 5개 케이스만 커버(2026-07-13). 프론트엔드·나머지 라우트는 아직 없음 |

---

## 진행 현황 목록 (위험도 우선순위)

### 🔴 Critical — 미완 시 프로덕션 배포 불가

| 태그 | 항목 | 파일·위치 | 완료 기준 |
|---|------|-----------|-----------|
| `AUTH-SERVER` | **JWT 인증 구현** (서버) | `server/src/app.ts` → `resolveDevEmail()` 교체 | 실 유저 토큰 발급·검증, `ALLOW_DEV_AUTH` 플래그 제거 |
| `AUTH-API` | **회원가입 / 로그인 API** | `server/src/` 신규 라우트 | `POST /v1/auth/signup`, `POST /v1/auth/login`, 리프레시 토큰 |
| `AUTH-CLIENT` | **클라이언트 인증 플로우** | `src/app/lib/remindApi.ts` | Bearer 토큰 저장·갱신·만료 처리 |
| `SECURITY-HARDENING` | **서버 보안 강화** | `server/src/app.ts`, `server/package.json` | 상시 보안 방어(코드) + 배포 전 체크리스트(배포 환경) 둘 다 완료 |

근거: [부록 A](#부록-a--저장-흐름-병목-auth-근거) — `server/src/index.ts:106-141` DB 왕복 2회 문제. 실행용 상세 체크리스트: [부록 C](#부록-c--남은-마일스톤-실행-체크리스트).

---

### 🟠 High — 사용자 경험을 직접 깨는 문제

| 태그 | 항목 | 파일·위치 | 완료 기준 |
|---|------|-----------|-----------|
| `EMPTY-UI` | **피드 빈 상태 UX** | `src/app/feed/page.tsx` | 기록 0건일 때 샘플 데이터 대신 빈 상태 화면 + 안내 문구 |
| `PROFILE-UI` | **Red UI 교체 — 마이페이지** | `src/app/my/page.tsx` | `MyProfileCard`, `SettingsSection` 구현 (Figma 설계 후) |
| `EDITOR-UI` | **Red UI 교체 — 편집 오버레이** | `src/app/page.tsx` 편집 오버레이 | `RecordEditStatusBar`, `RecordEditToolbar` 구현; `IosKeyboardMock` 제거(네이티브 이전 시) |
| `DATA-INTEGRITY` | **데이터 삭제·무결성 보장** | `server/src/app.ts`, `server/prisma/schema.prisma` | 삭제 엔드포인트 구현(✓ 2026-07-13), `body` 불변성 코드로 강제, 백업 복구 1회 검증 |

> ~~`SAVE-GUARD`~~, ~~`SAVE-ERROR-TOAST`~~ — **이미 완료돼 있었음.** 위 [현재 위치](#현재-위치-전체-프로세스-기준) 표로 이동.

컴포넌트 후보 상세: [부록 B](#부록-b--red-ui-컴포넌트-후보-표-profile-ui-editor-ui-근거). `EMPTY-UI`, `DATA-INTEGRITY` 실행용 상세 체크리스트: [부록 C](#부록-c--남은-마일스톤-실행-체크리스트).

---

### 🟡 Medium — 핵심 기능이나 단기 차단 없음

| 태그 | 항목 | 파일·위치 | 완료 기준 |
|---|------|-----------|-----------|
| `ACCESSIBILITY` | **접근성(a11y) 최소 세트** | 홈·피드·마이 전반 | 편집 오버레이 포커스 트랩, Lighthouse Accessibility 통과 |
| `SYNC-LIVE` | **서버 동기화 활성화** | `src/app/lib/remindApi.ts` | `AUTH` 완료 후 Bearer 토큰으로 실 서버 동기화 |
| `AI-PIPELINE` | **AI 파이프라인 구현** | `server/src/jobs/ai-queue.ts` | BullMQ + Redis 워커, LLM 연동 (Claude/GPT), `AiArtifact` 저장 |
| `REFLECTION-UI` | **회고 카드 UI** | `src/app/feed/` 또는 신규 화면 | `AiArtifact` 데이터 피드에 노출 ([first-launch.md](./first-launch.md) 08 참고) |

`ACCESSIBILITY`, `SYNC-LIVE` 실행용 상세 체크리스트: [부록 C](#부록-c--남은-마일스톤-실행-체크리스트).

> ~~`SYNC`(오프라인 동기화 큐)~~ — **2026-07-11 완료.** `recordsStore.ts`의 `synced` 필드 + `getUnsyncedRecords()`/`markRecordSynced()`, `remindApi.ts`의 `syncPendingRecords()`(앱 시작·`online` 이벤트 시 재시도), 서버 `clientMutationId` 멱등 upsert까지 구현됨. 위 [현재 위치](#현재-위치-전체-프로세스-기준) 표로 이동, 코드 레벨 상세는 [부록 A](#부록-a--저장-흐름-병목-auth-근거) 참고.

---

### 🟢 Low — 품질·확장성 개선 (필수 경로 아님)

| 태그 | 항목 | 파일·위치 | 완료 기준 |
|---|------|-----------|-----------|
| `TESTING` | **유닛·통합 테스트** | `src/`, `server/src/` | `recordsStore`, API 라우트 핵심 함수 커버리지 |
| `ERROR-TRACKING` | **에러 추적 (Sentry)** | Next + Fastify 공통 | 프로덕션 에러 자동 수집 |
| `PUSH-NOTIFICATION` | **푸시 알림 연동** | `server/src/` 신규 잡 | APNs/FCM 실 발송, `DevicePushToken` 활용 |
| `NATIVE-APP` | **네이티브 앱 착수 (Expo)** | `native/` | Expo 프로젝트 초기화, 웹 API 재활용 |
| `WIDGET` | **홈 화면 위젯 (1.1)** | `native/` | iOS WidgetKit / Android App Widget |
| `STORYBOOK-DEPLOY` | **Storybook 배포** | CI/CD | 컴포넌트 문서 외부 공유 가능 상태 |

---

## 다음 스프린트 제안 (우선순위 기준)

설계 완료 대기 중인 항목(`PROFILE-UI`, `EDITOR-UI`)을 제외하고, **지금 바로 착수 가능한 순서:**

1. `EMPTY-UI` 피드 빈 상태 UX → 온보딩 경험
2. `ACCESSIBILITY` 접근성 최소 세트 → 포커스 트랩 + ARIA
3. `DATA-INTEGRITY` 삭제·무결성 — `AUTH` 없이도 착수 가능(삭제 엔드포인트 자체는 인증과 무관), 실사용자 노출 전에 먼저 끝내두는 게 안전
4. `AUTH` (AUTH-SERVER → AUTH-API → AUTH-CLIENT) → 프로덕션 배포 언블럭
5. `SECURITY-HARDENING` — `AUTH`와 같이 진행(로그인 rate limiting은 AUTH 쪽 체크리스트에도 있음, 나머지 엔드포인트 보안은 이쪽)

---

## 부록 A — 저장 흐름 병목 (`AUTH` 근거)

> "순간적인 생각을 빠르게 기록하는" 기능의 핵심 축인 **입력 속도**와 **데이터 저장 안정성**의 코드 레벨 근거입니다. 2026-07-11: 오프라인 재전송·멱등 처리(`SYNC`)가 구현되어 아래 내용을 실제 코드에 맞게 갱신함.

### 핵심 아키텍처

이 앱은 **로컬 우선 저장(동기) + 서버 동기화(비동기, best-effort + 재시도)** 로 분리되어 있습니다. 저장 버튼을 누르면 `localStorage` 쓰기가 먼저 끝나고 화면이 즉시 풀리며, 네트워크 요청은 그 뒤에 따라갑니다. **입력 속도는 네트워크 상태와 무관.** 실패해도 로컬에 `synced: false`로 남아 있다가 앱 재시작이나 온라인 복귀 시 자동으로 다시 시도됩니다 (`SYNC`).

### 데이터 흐름 — 최단 경로

```
[입력 & 저장 클릭]  src/app/page.tsx · handleSave() (159)
        │
        ├─▶ (동기, 체감 저장)
        │     1. saveRecord()            recordsStore.ts:186  (synced: false로 저장)
        │     2. localStorage.setItem    key: remind-records-v1
        │     3. UI 즉시 해제            setIsEditing(false) / setShowReward(true)
        │
        └─▶ (비동기, best-effort — 실패해도 위 동기 경로엔 영향 없음)
              4. postQuickEntry()               remindApi.ts:31  (clientMutationId: record.id 포함)
              5. POST /v1/entries/quick         X-Dev-Email 헤더 (dev 전용 인증)
              6. zod 검증 + user.upsert         server/src/app.ts:106  (2026-07-13: index.ts→app.ts 분리, 테스트 가능하게 buildApp()으로 추출)
              7. clientMutationId 멱등 upsert    server/src/app.ts:123-146
              8. enqueueAiJob() stub            server/src/jobs/ai-queue.ts (현재 no-op)
              9. 성공 시 markRecordSynced()      page.tsx:182 / recordsStore.ts:222

[재시도 경로(SYNC) — 앱 시작 시 + online 이벤트]  page.tsx:134-138
   getUnsyncedRecords() → syncPendingRecords()   remindApi.ts:72
   순차 처리, 첫 실패 시 중단(오프라인이면 나머지도 다음 기회로 미룸)
```

실패 시(6~8단계 중 어디서든): `page.tsx:183` catch → 토스트 표시(`SAVE-ERROR-TOAST`). 로컬 저장(1~3단계)은 이미 끝난 뒤라 데이터 유실은 없고, 위 재시도 경로(`SYNC`)가 나중에 다시 전송함.

### 병목 & 개선 포인트

| 심각도 | 위치 | 문제 | 개선 방향 | 관련 |
|---|---|---|---|---|
| 🟠 주의 | `server/src/app.ts:106-146` | 요청마다 `user.upsert` + `journalEntry` 조회/생성으로 DB 왕복 2~3회 — 서버 응답 지연은 곧 동기화 실패 창을 넓히는 요인 | `AUTH` 전환 시 user 조회를 인증 미들웨어로 옮기고 핸들러는 `userId`만 받아 왕복 줄이기 | `AUTH` |
| 🟡 참고 | `recordsStore.ts:162` (`writeRaw()`) | 저장마다 전체 기록 배열을 통째로 `JSON.stringify` — 기록 수천 건 누적 시 저장 지연 가능성 (현재는 체감 안 됨) | 급하지 않음. 체감 지연 발생 시 IndexedDB 전환 또는 오래된 기록 아카이빙 | — |
| 🟡 참고 | `recordsStore.ts` (storage 이벤트 리스너 없음) | `memoryCache`가 모듈 전역이라 다른 탭의 저장을 현재 탭이 못 봄 | `window.addEventListener("storage", invalidateRecordsCache)` 추가로 간단히 해결 | — |

**해결됨 (2026-07-11):** ~~재전송 큐 없음~~, ~~`clientMutationId` idempotency 미사용~~ — `SYNC`로 둘 다 구현 완료. 이전 버전 이 표에 있던 항목.

### 기능을 추가할 때 어디를 고칠까

| 작업 | 수정 체인 |
|---|---|
| 기록에 새 필드 추가 | `src/types/journal.ts` → `recordsStore.ts` (타입 + validate + 스키마 버전↑) → `page.tsx` UI/state → `remindApi.ts` payload → `server/src/app.ts` zod 스키마 → `schema.prisma` → `prisma migrate dev` |
| 인증 방식 교체 (`AUTH`) | `server/src/app.ts`의 `resolveDevEmail()` 함수 하나만 교체. `index.ts`는 부트스트랩(프로덕션 가드 + `listen()`)만 담당하므로 건드릴 필요 없음 |
| AI 요약/분석 파이프라인 연결 (`AI-PIPELINE`) | `server/src/jobs/ai-queue.ts`의 `enqueueAiJob()` stub을 BullMQ + Redis 구현으로 교체 (호출부는 그대로) |
| 재시도 정책 조정(지수 백오프 등, `SYNC` 확장) | `remindApi.ts`의 `syncPendingRecords()` — 지금은 실패 시 즉시 중단 후 다음 트리거(앱 시작/`online`)까지 대기하는 단순 정책 |
| 모아보기(피드)에 새 표시 추가 | `recordsStore.ts`의 `getRecords()` 반환 타입 확인 → `feed/page.tsx`에서 렌더링 |

## 부록 B — Red UI 컴포넌트 후보 표 (`PROFILE-UI`, `EDITOR-UI` 근거)

> `bg-red-200` 플레이스홀더 교체 작업 전용. 요약표는 [CLAUDE.md §4](../CLAUDE.md)에도 있고, 여기는 파일 링크·대안 이름·비고까지 붙인 상세판입니다.

Figma에서 대응 컴포넌트 노드를 확정하면 아래 표의 **비고** 칸에 `node-id`를 채우고, 교체 요청은 이런 식으로:

> `FeedNewRecordCta` — Figma 노드 `xxx:yyy` — [feed/page.tsx](../src/app/feed/page.tsx) 빨간 CTA 블록 교체

우선순위는 보통 **기록하기 → 모아보기 → 마이** 순입니다. (`playground`는 제품 화면이 아니므로 후순위)

| 화면 | 파일·위치 (대략) | 제안 컴포넌트명 | 비고 |
|------|------------------|-----------------|------|
| 기록하기 (`EDITOR-UI`) | [src/app/page.tsx](../src/app/page.tsx) 편집 오버레이 상단 | `RecordEditStatusBar` 또는 `IosStatusBarMock` | 시계·시그널 등 목업 |
| 기록하기 (`EDITOR-UI`) | 동일, 상단 도구 버튼 3개 | `RecordEditToolbar` | 이모지/첨부 등 플레이스홀더 |
| 기록하기 (`EDITOR-UI`) | 동일, 하단 키보드 영역 | `IosKeyboardMock` | 전체 키보드 UI는 앱 이전 시 제거 가능 |
| 모아보기 | [src/app/feed/page.tsx](../src/app/feed/page.tsx) "오늘의 새 기록" 블록 | `FeedNewRecordCta` | FAB/CTA 디자인에 맞게 |
| 모아보기 | 동일, 기록 리스트 카드 | `FeedRecordCard` (2줄 타입) | 현재 `Card` + 수동 레이아웃 |
| 모아보기 | 동일, 로딩 스켈레톤 | `FeedRecordSkeleton` | 선택 |
| 마이 (`PROFILE-UI`) | [src/app/my/page.tsx](../src/app/my/page.tsx) 프로필 영역 | `MyProfileCard` | 아바타·이메일·버튼 |
| 마이 (`PROFILE-UI`) | 동일, 설정 묶음 | `SettingsSection` + [List](../src/app/components/List.tsx) | 행은 `List` 아이템으로 통일 가능 |
| Playground | [src/app/playground/page.tsx](../src/app/playground/page.tsx) 섹션 래퍼 | (제품 컴포넌트 아님) | 데모 구획용; 필요 시 `PlaygroundSection`만 |

**접근성(a11y) 메모 — 교체 시 함께 확인:** 기록하기 텍스트 영역에 접근 가능한 레이블(placeholder만으로는 부족), 편집 모드 포커스 트랩 여부(`ACCESSIBILITY`). 모아보기 "오늘의 새 기록" 등의 역할(`button` vs `link`)과 `aria-label`. 공통으로 포커스 링이 디자인 토큰과 맞는지 확인.

## 부록 C — 남은 마일스톤 실행 체크리스트

> **이 프로젝트의 기술적 양심.** 위 표의 "완료 기준"은 한 줄이지만, 실제로 놓치기 쉬운 건 항상 디테일입니다. 작업을 완료할 때마다 **완료 여부 칸을 `☐ 대기` → `🔄 진행중` → `☑ 완료`로 직접 고쳐서** 이 표를 갱신하세요. 새 항목이 떠오르면 해당 마일스톤 표에 행을 추가하면 됩니다 — 이 문서가 유일한 사본이라 다른 곳에 옮겨 적을 필요가 없습니다.
>
> 마일스톤 전체가 100% 완료되면 [부록 D](#부록-d--완료된-마일스톤-프로젝트-시작부터-지금까지)로 옮깁니다. **`KEY-FEATURES`, `DESIGN-SYSTEM`은 반대로 2026-07-11에 부록 D에서 여기로 옮겨왔습니다** — 완료로 표시했던 항목 중 일부가 재작업 대상이 되면서 더 이상 100% 완료 마일스톤이 아니게 됐기 때문입니다. 진행 중이거나 대기 중인 항목이 하나라도 있는 마일스톤은 이 문서 상단(그리고 아티팩트 상단)에 둡니다.
>
> 순서: `KEY-FEATURES` → `DESIGN-SYSTEM` → `EMPTY-UI` → `ACCESSIBILITY` → `DATA-INTEGRITY` → `AUTH` → `SECURITY-HARDENING` → `SYNC-LIVE`. ([다음 스프린트 제안](#다음-스프린트-제안-우선순위-기준)은 C/H/M/L 표 기준 우선순위이며 이 순서와는 별개입니다.)

### KEY-FEATURES — 마이크로 저널링 핵심 플로우

> 이 서비스의 **핵심 컨셉**입니다 (구 `CORE-JOURNALING`, 2026-07-11 개명). 완료로 표시했던 항목 중 2개가 재작업 예정이라 `🔄 진행중`으로 조정했습니다.

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | 텍스트 기록 입력·저장 (홈 `handleSave`) — **입력·저장 플로우 개편 예정** | 상 | 🔄 진행중 |
| 기능 | 감정 태그 선택 UI (`EmotionIcon`) — **아이콘 작업 및 감정 선택 UI 변경 예정** | 중 | 🔄 진행중 |
| 기능 | 할 일(Todo) 토글 + 리마인더 날짜 선택 | 중 | ☑ 완료 |
| 데이터 | localStorage 기반 로컬 저장(`recordsStore.ts`) — 서버 없이도 항상 동작 | 상 | ☑ 완료 |
| 데이터 | localStorage 스키마 버전 관리(`CURRENT_SCHEMA_VERSION`, `migrateRecords()`) | 상 | ☑ 완료 |
| UX | FAB 기반 내비게이션으로 전환, `BottomNavBar` 제거(2026-04-17) | 중 | ☑ 완료 |
| UX | Segment Control 아이콘화 — 가로/세로 전환 텍스트 버튼을 SVG 아이콘으로 교체 | 하 | ☑ 완료 |

### DESIGN-SYSTEM — 디자인 토큰·아이콘·Storybook 파이프라인

> 파이프라인 자체는 완료됐지만, **아직 못 만든 컴포넌트**와 **화면설계(Figma)에 반영 안 된 신규 컴포넌트**가 있어 2026-07-11에 3건 추가.

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 디자인 | Figma REST API 기반 토큰 export → build 파이프라인 통일(2026-07-09) | 상 | ☑ 완료 |
| 디자인 | `primitives.css`/`semantic.css` 자동 생성 체계 | 상 | ☑ 완료 |
| 디자인 | 아이콘 시스템 — functional 32개, weather 9개·emotion 5개, Figma↔코드 매핑 검증 | 중 | ☑ 완료 |
| 디자인 | `variable_plugin_JSON`(구 수동 export 경로) deprecated 처리 | 중 | ☑ 완료 |
| 디자인 | Storybook 설정 + 컴포넌트 스토리 31개 | 중 | ☑ 완료 |
| 인프라 | `@adailyrecord/design-tokens`(`file:` 의존성) 제거 | 중 | ☑ 완료 |
| 디자인 | **아직 못 만든 Red UI 플레이스홀더 컴포넌트 구현** — `RecordEditStatusBar`, `RecordEditToolbar`, `IosKeyboardMock`, `FeedNewRecordCta`, `FeedRecordCard`, `FeedRecordSkeleton`, `MyProfileCard`, `SettingsSection` 8개 (상세는 [부록 B](#부록-b--red-ui-컴포넌트-후보-표-profile-ui-editor-ui-근거)) | 상 | ☐ 대기 |
| 디자인 | **신규 제작 필요 컴포넌트 중 Figma 화면설계에 아직 반영 안 된 것** 목록화 + 화면 반영 — 코드보다 디자인이 먼저 비어있는 케이스 | 중 | ☐ 대기 |
| 디자인 | 감정 선택 UI 개편에 따른 감정 아이콘 세트 재작업 (`KEY-FEATURES`의 감정 태그 항목과 연동) | 중 | ☐ 대기 |

### EMPTY-UI — 피드 빈 상태 UX

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | `getRecords().length === 0` 감지 후 전용 빈 상태 컴포넌트 렌더링 | 상 | ☐ 대기 |
| 기능 | "첫 기록 남기기" CTA → 홈(`/`)으로 이동, 기존 FAB 동작과 겹치지 않는지 확인 | 중 | ☐ 대기 |
| UX | 카피 톤 확정 — 앱 핵심가치("안도감·자아성찰")와 맞는 문구인지 | 중 | ☐ 대기 |
| UX | 로딩 스켈레톤 → 빈 상태 전환 시 깜빡임(flicker) 없는지 확인 | 상 | ☐ 대기 |
| UX | 가로형·세로형 타임라인 뷰 **둘 다** 빈 상태 처리 (하나만 하고 놓치기 쉬움) | 상 | ☐ 대기 |
| 데이터 | "전체 0건"과 "필터링 결과 0건"을 구분해 다른 문구 표시 | 중 | ☐ 대기 |
| 예외처리 | 네트워크 에러로 fetch 실패해 "빈 것처럼 보이는" 상태와 **진짜 빈 상태**를 혼동하지 않는지 (에러 토스트로 분리) | 상 | ☐ 대기 |
| 예외처리 | 빈 상태 영역에 적절한 role/`aria-live` 지정 (스크린리더 인지, `ACCESSIBILITY`와 연결) | 중 | ☐ 대기 |

### ACCESSIBILITY — 접근성(a11y) 최소 세트

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | 편집 오버레이 포커스 트랩 (Tab이 오버레이 밖으로 안 나감) | 상 | ☐ 대기 |
| 기능 | ESC 키로 편집 오버레이 닫기 + 트리거 요소로 포커스 복귀 | 중 | ☑ 완료 (2026-07-11) — `page.tsx`에 `keydown` 리스너 추가, ESC 시 `textareaRef`로 포커스 복귀 |
| UX | 텍스트 영역에 접근 가능한 레이블 (placeholder만으로 대체 금지) | 상 | ☑ 완료 (2026-07-11) — 홈·오버레이 두 `textarea` 모두 `aria-label="지금 떠오른 문장은 무엇인가요?"` 추가 |
| UX | 저장·취소·툴바 버튼 `aria-label` 전수 점검 | 중 | ☐ 대기 |
| UX | 포커스 링이 디자인 토큰 기준으로 시각적으로 뚜렷한지 | 하 | ☐ 대기 |
| 예외처리 | 마우스 없이 키보드만으로 "기록 작성 → 저장 → 피드 이동" 전체 완주 가능한지 | 상 | ☐ 대기 |
| 예외처리 | **기존 `SAVE-ERROR-TOAST`(이미 구현됨)가 스크린리더에 announce 되는지** — `aria-live` 영역 여부 확인. 시각적으로만 보이고 스크린리더엔 전달 안 될 수 있는 실제 취약점 | 상 | ☑ 완료 (2026-07-11) — 토스트를 담는 `aria-live="polite"` 컨테이너를 항상 DOM에 유지하도록 변경(기존엔 통째로 마운트/언마운트돼 일부 스크린리더가 announce 못할 수 있었음) |
| 예외처리 | Lighthouse 자동 통과와 실제 VoiceOver 수동 테스트 결과가 다를 수 있음 — 반드시 둘 다 확인 | 중 | ☐ 대기 |

### DATA-INTEGRITY — 데이터 삭제·무결성 보장

> **2026-07-13 갱신**: `JournalEntry.deleted`를 실제로 세팅하는 소프트 삭제 엔드포인트(`DELETE /v1/entries/:id`)를 구현했습니다(아래 표 1번째 행). 나머지 9개 항목(삭제 UI, 계정 삭제 정책, export, `body` 불변성 강제, 백업 검증 등)은 여전히 대기 상태입니다. `body` "절대 수정 금지"(CLAUDE.md §3-3)는 소프트 삭제 라우트가 `deleted` 필드만 건드리도록 구현했지만, 아직 코드로 강제하는 별도 가드(update 라우트 자체가 없어 우연히 지켜지는 상태)는 아닙니다.

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | `JournalEntry` 삭제 엔드포인트 구현 — 기존 `deleted` 필드를 실제로 사용하는 soft delete부터 | 상 | ☑ 완료 (2026-07-13) — `DELETE /v1/entries/:id`(`server/src/app.ts`). 소유권 검증(다른 사용자 소유면 404), 이미 삭제된 건 재호출해도 멱등하게 200. `body`는 절대 건드리지 않음. `server/src/app.test.ts` 5개 케이스(401/404/삭제 성공+body 불변/소유권/멱등)로 검증 완료(`npm --prefix server test`) |
| 기능 | 클라이언트(피드·마이)에 기록 삭제 UI 추가, 삭제 요청이 로컬(`recordsStore`)과 서버 양쪽에 반영되는지 확인 | 상 | ☐ 대기 |
| 기능 | 계정 삭제(회원 탈퇴) 시 관련 데이터(엔트리·AI 산출물·푸시 토큰) 처리 정책 결정 — 즉시 삭제 vs 유예 기간 | 중 | ☐ 대기 |
| 기능 | 데이터 내보내기(export) — 사용자가 자기 기록을 JSON/텍스트로 받아가는 최소 기능 | 중 | ☐ 대기 |
| UX | 삭제는 되돌릴 수 없다는 걸 명확히 안내 (확인 다이얼로그) — 실수 삭제 방지 | 상 | ☐ 대기 |
| 데이터 | `JournalEntry.body`가 생성 후 절대 수정되지 않도록 코드로 강제 (update 라우트가 생길 때 `body` 필드만 막는 가드 또는 Prisma 미들웨어) | 상 | ☐ 대기 |
| 데이터 | DB 백업/스냅샷이 실제로 설정돼 있고 복구 가능한지 1회 검증 — 지금은 [first-launch.md 03](./first-launch.md#03-백엔드-아키텍처)에 "권장"만 돼 있고 실행 확인 안 됨 | 상 | ☐ 대기 |
| 데이터 | `AiArtifact.entryId`가 `onDelete: SetNull`이라 엔트리 삭제 시 고아 아티팩트가 남을 수 있음 — 의도된 동작인지, 함께 정리할지 결정 | 중 | ☐ 대기 |
| 예외처리 | 소프트 삭제된 기록이 실제로 클라이언트 목록 조회·타임라인에서 빠지는지 (`deleted: true` 필터링 누락 방지) | 상 | ☐ 대기 |
| 예외처리 | 오프라인 상태에서 삭제 요청 시, 저장과 마찬가지로 재시도 큐(`SYNC`) 대상이 되는지 | 중 | ☐ 대기 |

### AUTH — 신규 서버 실사용자 인증 (JWT)

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | `POST /v1/auth/signup`, `/login`, `/refresh`, `/logout` 4종 라우트 구현 | 상 | ☐ 대기 |
| 기능 | `resolveDevEmail()` → JWT 검증 미들웨어로 교체, `ALLOW_DEV_AUTH` 플래그 완전 제거 | 상 | ☐ 대기 |
| 기능 | 클라이언트 토큰 저장·자동 갱신 로직 (`remindApi.ts`) | 상 | ☐ 대기 |
| UX | 로그인 실패 메시지는 "이메일 또는 비밀번호가 올바르지 않습니다"로 통일 (계정 존재 여부를 노출하지 않음) | 상 | ☐ 대기 |
| UX | 토큰 만료 시 조용히 로그인 화면으로 유도 (세션 끊김을 오류로 오해하지 않게) | 중 | ☐ 대기 |
| 데이터 | 비밀번호는 Argon2/bcrypt 해시만 저장 — 평문 저장 코드가 어디에도 없는지 재확인 | 상 | ☐ 대기 |
| 데이터 | JWT 시크릿은 `.env`에만 — `NEXT_PUBLIC_` 노출·커밋 여부 확인 (CLAUDE.md §5-1) | 상 | ☐ 대기 |
| 데이터 | 기존 `dev@local.invalid` 등 익명 계정에 쌓인 `JournalEntry`를 실사용자 계정으로 옮기는 마이그레이션 전략 | 중 | ☑ 완료 (2026-07-13) — 전략 초안 작성: [`data-migration.md`](./data-migration.md). 로컬 미동기화 데이터 업로드(A)와 서버 dev-placeholder 재소유(B) 두 갈래로 분리, 실행 여부는 제품 결정 필요(문서 내 "열린 질문" 참고). 실제 마이그레이션 엔드포인트 구현은 JWT 도입 시점에 별도 작업 |
| 예외처리 | **오프라인 재시도 큐(`SYNC`)가 401(토큰 만료)을 받으면 무한 재시도에 빠지지 않는지** — 지금은 실패 원인 구분 없이 그냥 중단하는데, 401은 "토큰 갱신 시도 → 실패 시 재로그인 유도"로 별도 분기 필요 | 상 | ☐ 대기 |
| 예외처리 | 여러 탭에서 동시에 토큰 갱신 시 경합 (refresh rotation 사용 시 한쪽 refresh token이 무효화될 수 있음) | 중 | ☐ 대기 |
| 예외처리 | 로그인 엔드포인트에 rate limiting (브루트포스 방어) | 상 | ☐ 대기 |
| 예외처리 | 토큰은 XSS에 안전한 저장소 사용 (`httpOnly` 쿠키 권장, `localStorage` 노출 위험 검토) | 상 | ☐ 대기 |
| 예외처리 | 배포 시점에 이미 로컬 큐에 쌓여있던 미동기화 기록이 새 인증 체계에서도 정상 전송되는지 하위호환 테스트 | 중 | ☐ 대기 |

### SECURITY-HARDENING — 서버 보안 강화

> 로그인 자체의 브루트포스 방어는 `AUTH` 체크리스트에 있고, 여기는 그 **바깥의 나머지 공개 엔드포인트**를 다룹니다. **2026-07-11부터 두 섹션으로 분리 관리**: 코드베이스에 항상 적용돼야 하는 [상시 보안 방어](#상시-보안-방어)와, 실제 배포 환경에서만 검증 가능한 [배포 전 체크리스트](#배포-전-체크리스트). 진행률은 두 섹션을 합산해 위 [Product Integrity 현황판](#product-integrity-현황판)에 반영됩니다.

#### 상시 보안 방어

코드 리뷰·로컬 실행만으로 확인·구현 가능한 항목. 커밋될 때마다 유효한 상태를 유지해야 합니다.

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | Fastify에 보안 헤더 미들웨어 추가 (`@fastify/helmet` 등 — CSP, X-Frame-Options, X-Content-Type-Options) | 상 | ☑ 완료 (2026-07-11) — `@fastify/helmet` 등록(JSON API라 CSP는 비활성). `/health` 응답에 `X-Frame-Options`·`X-Content-Type-Options`·`Strict-Transport-Security` 등 확인 |
| 기능 | `POST /v1/entries/quick`, `/v1/reminders`, `/v1/push-tokens`에 레이트 리미팅 추가 (`@fastify/rate-limit` 등) — 인증 붙기 전에도 스팸·DoS 방어 필요 | 상 | ☑ 완료 (2026-07-11) — `@fastify/rate-limit` 글로벌 등록(100req/분). 응답 헤더 `x-ratelimit-*` 확인. 로그인 전용 더 낮은 한도는 `AUTH` 구현 시 별도 |
| 기능 | Fastify `bodyLimit` 명시적으로 설정 (기본값 의존하지 않기) | 중 | ☑ 완료 (2026-07-11) — `Fastify({ bodyLimit: 1024*1024 })`로 1MB 명시 |
| 기능 | **[에러 응답 보안]** Global Error Handler(`app.setErrorHandler()`)로 에러 응답 본문에 서버 내부 스택 트레이스·DB 쿼리 문구가 노출되지 않도록 처리 | 상 | ☐ 대기 — 코드 확인 결과 현재 `setErrorHandler`가 등록돼 있지 않고, `/v1/reminders`·`/v1/push-tokens` 라우트는 Prisma 호출에 `try/catch`도 없어 예외 발생 시 Prisma 원본 `error.message`(쿼리·제약조건명 등 포함 가능)가 그대로 클라이언트 응답에 실릴 수 있음 |
| UX | 레이트 리밋 초과 시 사용자에게 명확한 안내(429) — 그냥 저장 실패로만 보이지 않게 | 중 | ☐ 대기 |
| 데이터 | `ReminderSpec.schedule`(현재 `z.unknown()`, 크기 제한 없음) 스키마 검증 강화 또는 최소 크기 제한 | 중 | ☐ 대기 |
| 데이터 | `DevicePushToken.token`에 길이 제한(`.max()`) 추가 | 하 | ☑ 완료 (2026-07-11) — `z.string().min(1).max(512)`로 상한 |
| 데이터 | 환경변수 재감사 — `OPENWEATHERMAP_API_KEY`, `KAKAO_REST_API_KEY`, `DATABASE_URL` 등이 `.env`/`.env.local`에만 있고 커밋된 적 없는지 확인 (CLAUDE.md §5-1) | 상 | ☑ 완료 (2026-07-11) — `git ls-files`로 `.env`류 추적 없음, 소스 내 하드코딩 키 없음, `NEXT_PUBLIC_*`는 URL·dev 이메일뿐(시크릿 아님) 확인 |
| 데이터 | 의존성 취약점 점검 (`npm audit` 등), `package-lock.json` 최신 유지 | 중 | ☑ 완료 (2026-07-11) — `npm audit fix`로 high 6건 해결(defu, effect/@prisma, fast-uri, fastify). 남은 1건(esbuild, low, Windows 전용 dev 서버 이슈)은 위험 낮아 보류 |
| 예외처리 | **[통신 보안]** 모든 통신이 HTTPS로 이루어지도록 강제하는 HSTS 헤더 설정 | 상 | ☑ 완료 (2026-07-11) — `@fastify/helmet` 기본값에 이미 포함되어 있었음. `/health` 응답에서 `Strict-Transport-Security: max-age=31536000; includeSubDomains` 확인됨(추가 작업 불필요, 헤더 자체만 완료 — 실제 프로덕션에서 유효 적용되는지는 [배포 전 체크리스트](#배포-전-체크리스트) 참고) |

#### 배포 전 체크리스트

**실제 배포 환경에서만** 검증 가능한 항목 — 로컬에서는 확인할 수 없으므로 매 배포 직후 반드시 수행. 순서는 아래 [배포 보안 체크 워크플로우](#배포-보안-체크-워크플로우) 참고.

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 예외처리 | 프로덕션 배포 시 `CORS_ORIGIN`이 실제로 설정돼 있는지 — 기본값(모든 오리진 차단)으로 방치되지 않았는지 배포 전 확인 | 상 | ☐ 대기 — 실제 배포 환경 접근이 필요해 지금은 검증 불가 |
| 예외처리 | `ALLOW_DEV_AUTH` 크래시 가드가 실제 배포 환경(Railway 등)에서도 의도대로 작동하는지 배포 후 1회 검증 | 중 | ☐ 대기 — 실제 배포 환경 접근이 필요해 지금은 검증 불가 |
| 예외처리 | 서버 로그 레벨·설정이 프로덕션에 적합한지 점검 (`Fastify({ logger: true })` 기본 설정이 과도하게 verbose하지 않은지) | 중 | ☐ 대기 — 실제 배포 환경 접근이 필요해 지금은 검증 불가 |
| 예외처리 | **[로그 샘플링 테스트]** 배포 직후 프로덕션 로그를 직접 열어 실제 사용자의 민감 정보(이메일, 본문 등)가 마스킹되어 기록되는지 샘플링 테스트 수행 | 상 | ☐ 대기 — 코드 확인 결과 현재 `req.body`나 이메일을 명시적으로 로깅하는 코드는 없음(Fastify 기본 로거는 method/url/statusCode만 기록, body·헤더 미포함). 그래도 실사용자 데이터가 흐르기 시작하면 배포 직후 1회 실제 로그로 재확인 필요 |
| 예외처리 | HSTS 헤더가 실제 프로덕션 HTTPS 응답에도 정상 적용되는지 확인 (Railway 등 TLS 종료 프록시 구조에서 `trustProxy` 설정이 필요한지 포함) | 중 | ☐ 대기 — 실제 배포 환경 접근이 필요해 지금은 검증 불가 |

#### 배포 보안 체크 워크플로우

배포할 때마다 이 순서로 확인합니다. [배포 전 체크리스트](#배포-전-체크리스트) 5개 항목이 이 3단계 안에 다 들어갑니다.

1. **접근 제어 확인** — 서버가 뜬 직후 바로: `ALLOW_DEV_AUTH` 크래시 가드가 실제로 서버를 막았는지/통과시켰는지, `CORS_ORIGIN`이 운영 도메인으로 제대로 설정됐는지 확인.
2. **통신 보안 확인** — 배포된 URL에 `curl -I`로 응답 헤더를 직접 확인: `Strict-Transport-Security`가 찍히는지, 프록시(Railway 등) 뒤에서도 유효한지.
3. **로그 확인** — 실사용자 요청이 몇 건 쌓인 뒤: 로그 레벨이 과도하게 verbose하지 않은지, 실제 로그 샘플에 이메일·본문 같은 민감정보가 그대로 찍히지 않는지 직접 열어서 확인.

### SYNC-LIVE — 서버 동기화 활성화 (실사용자 연결)

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | `remindApi.ts`의 `X-Dev-Email` 헤더 → `Authorization: Bearer` 교체 | 상 | ☐ 대기 |
| 기능 | 비로그인 상태에서도 로컬 전용 모드를 유지할지 정책 결정 | 중 | ☐ 대기 |
| UX | 로그인 유도 시점 설계 (첫 실행 vs 특정 액션 시) | 중 | ☐ 대기 |
| UX | 기존 로컬 전용 기록을 로그인 시 서버로 일괄 업로드하는 온보딩 흐름 | 중 | ☐ 대기 |
| 데이터 | 로컬 `StoredRecord` ↔ 서버 `JournalEntry` 최초 동기화 병합 전략 (다중 기기 사용 시 충돌 가능성) | 상 | ☐ 대기 |
| 데이터 | 대량 초기 업로드에도 기존 `clientMutationId` 멱등 처리(`SYNC`)가 그대로 재사용되는지 확인 | 중 | ☐ 대기 |
| 예외처리 | 대량 업로드 중 일부 실패 시 전체 롤백 대신 실패 건만 재시도 큐에 남기기 | 상 | ☐ 대기 |
| 예외처리 | **로그아웃/재로그인(다른 계정) 시 `memoryCache`·로컬 데이터를 무효화해 이전 계정 기록이 새 계정에 노출되지 않는지** — 개인정보 유출 등급 이슈 | 상 | ☑ 완료 (2026-07-13) — [`src/app/lib/session.ts`](../src/app/lib/session.ts) 신설. `ensureIdentityConsistency()`가 마지막으로 로컬 데이터를 채운 identity와 현재 identity를 비교해 다르면 `clearAllRecords()` + `invalidateRecordsCache()`로 즉시 무효화. `logout()`/`loginAs()`로 명시적 진입점도 제공. `page.tsx`·`feed/page.tsx`의 기록 조회 시점(마운트·포커스)마다 호출되도록 연결. 최초 실행(마커 없음)은 무효화하지 않아 기존 로컬 전용 데이터를 첫 실행에 날리지 않음 |

---

## 부록 D — 완료된 마일스톤 (프로젝트 시작부터 지금까지)

> [부록 C](#부록-c--남은-마일스톤-실행-체크리스트)가 "남은 일"이라면 이건 그 반대 — **처음부터 지금까지 실제로 끝낸 일**입니다. `git log`(스쿼시된 구간 포함)와 각 코드 영역을 다시 훑어서 시간 순으로 정리했습니다. 구분 칸에 기존 `기능`/`UX`/`데이터`/`예외처리`로 안 맞는 것들은 `인프라`/`디자인`/`배포`/`문서화`를 새로 만들어 썼습니다.
>
> **날짜 표기 안내:** 2026-05-16 이전 작업 다수가 `3ced351`(닉네임 "첫 커밋") 한 커밋에 스쿼시돼 있어 그 이전의 세부 날짜는 git으로 복원 불가 — 그런 항목은 실제 작업 시점(대화·세션 기록 기준)을 그대로 표기했습니다.
>
> **이 부록은 100% 완료된 마일스톤만 남습니다.** `DESIGN-SYSTEM`, `CORE-JOURNALING`(→`KEY-FEATURES`로 개명)은 재작업 대상이 생겨 2026-07-11에 [부록 C](#부록-c--남은-마일스톤-실행-체크리스트)로 옮겼습니다 — 완료로 표시했던 세부 항목이 있어도, 마일스톤 전체가 다시 100%가 될 때까지는 여기 두지 않습니다.

### PROJECT-SETUP — 프로젝트 초기 설정 (2026-03-11 ~ 2026-03-19)

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 인프라 | Next.js 16 App Router 프로젝트 스캐폴드 (`create-next-app`) | 상 | ☑ 완료 |
| 인프라 | ESLint, PostCSS, TypeScript strict 설정 | 중 | ☑ 완료 |
| 인프라 | Git 저장소 초기화 + 최초 커밋 | 상 | ☑ 완료 |
| 인프라 | Figma MCP 연동 설정(`.mcp.json`), 이후 HTTP 방식으로 재설정(2026-07-06) | 중 | ☑ 완료 |
| 문서화 | `.env.example` 환경변수 가이드 최초 작성 | 중 | ☑ 완료 |
| 문서화 | `CLAUDE.md` 프로젝트 규칙 문서 최초 작성(2026-04-17) — 디자인 토큰 우선순위, 컴포넌트 컨벤션, 보안 금지사항 | 상 | ☑ 완료 |

### WEATHER-SNAPSHOT — 날씨·위치 스냅샷 (2025-03-24)

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | 기록하기 상단 실시간 날씨·위치 표시(`LiveWeatherBlock`, `GET /api/weather`) | 중 | ☑ 완료 |
| 기능 | OpenWeatherMap 연동 + 카카오 역지오코딩(선택, 시·구·동 단위) | 중 | ☑ 완료 |
| 기능 | 저장 시점 날씨 스냅샷을 기록에 부착, 피드에서 한 줄 표시 | 중 | ☑ 완료 |
| 데이터 | `StoredWeatherSnapshot` 타입 + 서버 `JournalEntry.weather`(`Json?`) 스키마 반영 — 좌표가 아닌 지역명만 저장(프라이버시 고려) | 상 | ☑ 완료 |

### SERVER-SCAFFOLD — Fastify + Prisma API 서버 골격

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 인프라 | Fastify 5 + Prisma 6 + PostgreSQL 서버 스캐폴드 | 상 | ☑ 완료 |
| 데이터 | `User`/`JournalEntry`/`AiArtifact`/`ReminderSpec`/`DevicePushToken` 스키마 설계 | 상 | ☑ 완료 |
| 기능 | `POST /v1/entries/quick`, `/v1/reminders`, `/v1/push-tokens` 라우트 | 상 | ☑ 완료 |
| 기능 | `X-Dev-Email` 개발용 인증 헤더 + `resolveDevEmail()` 헬퍼(3개 라우트 중앙화) | 중 | ☑ 완료 |
| 배포 | Railway 배포 설정(`railway.json`, `prisma migrate deploy` 포함 시작 커맨드) | 중 | ☑ 완료 |
| 배포 | 로컬 개발 환경(`docker-compose.yml`, Postgres) | 하 | ☑ 완료 |

### TIMELINE-UI — 타임라인 피드 (2026-04-01)

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | 모아보기 기본 화면을 타임라인으로 전환, 가로/세로 방향 토글(기본 가로) | 상 | ☑ 완료 |
| 기능 | 가로 스와이프 카드 + 하단 dot-라인 타임라인 동기화(현재 카드 dot 중앙 정렬) | 상 | ☑ 완료 |
| 기능 | 1년(365일) 날짜 기준 dot 재구성, 월/주 경계 강조 표시 | 중 | ☑ 완료 |
| UX | 카드 전용 플리킹(드래그 오프셋 기반 슬라이더), 카드 바깥 스와이프 차단 | 중 | ☑ 완료 |
| UX | `FeedTimelineDots` 컴포넌트 분리로 `feed/page.tsx` 구조 정리 | 하 | ☑ 완료 |

### SECURITY-BASELINE — 최소 보안 가드 (2026-04-17)

> `SECURITY-HARDENING`(부록 C)이 "아직 안 한 것"이라면 이건 "이미 해둔 최소한의 것" — 서로 다른 항목입니다.

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 데이터 | 프로덕션에서 `X-Dev-Email` dev auth 사용 시 크래시 가드 — `ALLOW_DEV_AUTH` 미설정 시 `process.exit(1)` | 상 | ☑ 완료 |
| 데이터 | `CORS_ORIGIN` 환경변수로 프로덕션 오리진 제한(개발은 전체 허용 유지) | 상 | ☑ 완료 |
| 예외처리 | `resolveDevEmail()` 헬퍼로 인증 로직 3개 라우트 중앙화 — `AUTH` 전환 시 이 함수만 수정하면 되도록 | 중 | ☑ 완료 |

### SYNC — 오프라인 동기화 + 저장 안전장치 (2026-05-16 ~ 2026-07-11)

> 코드 레벨 상세는 [부록 A](#부록-a--저장-흐름-병목-auth-근거) 참고. 여기는 완료 이력 요약만.

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| UX | `SAVE-GUARD` — 저장 중 중복 클릭 방지(`isSaving` 가드 + 버튼 비활성화) | 상 | ☑ 완료 |
| UX | `SAVE-ERROR-TOAST` — 네트워크 실패 시 토스트 안내 | 상 | ☑ 완료 |
| 데이터 | `synced` 필드 + `getUnsyncedRecords()`/`markRecordSynced()`로 미전송 기록 추적 | 상 | ☑ 완료 |
| 데이터 | `syncPendingRecords()` 재시도(앱 시작·`online` 이벤트) + 서버 `clientMutationId` 멱등 upsert | 상 | ☑ 완료 |

### DOCS-SYSTEM — 프로젝트 문서 체계 구축 (2026-07-10 ~ 2026-07-11)

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 문서화 | md 파일 22개 → 11개로 통합 — 탐색 비용(파일 전환 횟수) 절감이 목적, 중복 백로그·인덱스 제거 | 상 | ☑ 완료 |
| 문서화 | `first-launch/` 9개 파일을 `first-launch.md` 앵커 섹션 1개로 통합 | 중 | ☑ 완료 |
| 문서화 | 백로그 라벨을 코드(`C-1` 등)에서 기능 이름(`AUTH` 등)으로 전환, 매핑표 신설 | 중 | ☑ 완료 |
| 문서화 | 코드 감사 기반 `SECURITY-HARDENING`·`DATA-INTEGRITY` 백로그 신설(부록 C) | 상 | ☑ 완료 |

---

## 관련 문서

전체 문서 지도는 [README.md](./README.md) 참고.

- [first-launch.md](./first-launch.md) — 첫 론칭 전체 흐름·카테고리별 상태
- [DESIGN_TOKENS_RUNBOOK.md](./DESIGN_TOKENS_RUNBOOK.md) — 디자인 토큰 파이프라인 (이 목록에서 제외된 영역)
