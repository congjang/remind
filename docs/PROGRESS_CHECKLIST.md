# 전체 진행 현황 체크리스트

> 마지막 갱신: 2026-04-17  
> 디자인 시스템 검토 및 인터페이스 디자인 작업은 이 목록에서 제외합니다.

---

## 현재 위치 (전체 프로세스 기준)

```
[웹 프로토타입]──────────────────────────────[V1.0 출시]
   ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
       ~35%
```

| 단계 | 상태 | 비고 |
|------|------|------|
| 핵심 UI 플로우 (기록·피드·마이) | ✅ 웹 작동 | Red UI 일부 잔존 |
| 디자인 토큰 시스템 (Figma 연동) | ✅ 운영 중 | primitives + semantic CSS |
| 로컬 데이터 저장 (localStorage) | ✅ 완료 | 스키마 버전 관리 포함 |
| 서버 스캐폴딩 (Fastify + Prisma) | ✅ 로컬 실행 가능 | 프로덕션 배포 불가 (auth 미완) |
| 날씨 스냅샷 (OWM + Kakao) | ✅ 완료 | |
| FAB 기반 내비게이션 | ✅ 완료 | BottomNavBar 제거 |
| 프로젝트 규칙 (CLAUDE.md) | ✅ 완료 | |
| **인증 (JWT)** | 🔴 미완 | 프로덕션 배포 차단 |
| **서버 동기화 (실 사용자 연결)** | 🔴 미완 | 개발 이메일 헤더만 동작 |
| **AI 파이프라인** | 🔴 스텁만 | BullMQ + LLM 연동 없음 |
| **푸시 알림 (APNs/FCM)** | 🔴 미완 | DB 테이블만 존재 |
| **네이티브 앱 (Expo)** | 🔴 미착수 | README 플레이스홀더만 |
| 테스트 코드 | 🔴 없음 | |

---

## 진행 현황 목록 (위험도 우선순위)

### 🔴 Critical — 미완 시 프로덕션 배포 불가

| # | 항목 | 파일·위치 | 완료 기준 |
|---|------|-----------|-----------|
| C-1 | **JWT 인증 구현** (서버) | `server/src/index.ts` → `resolveDevEmail()` 교체 | 실 유저 토큰 발급·검증, `ALLOW_DEV_AUTH` 플래그 제거 |
| C-2 | **회원가입 / 로그인 API** | `server/src/` 신규 라우트 | `POST /v1/auth/signup`, `POST /v1/auth/login`, 리프레시 토큰 |
| C-3 | **클라이언트 인증 플로우** | `src/app/lib/remindApi.ts` | Bearer 토큰 저장·갱신·만료 처리 |

---

### 🟠 High — 사용자 경험을 직접 깨는 문제

| # | 항목 | 파일·위치 | 완료 기준 |
|---|------|-----------|-----------|
| H-1 | **저장 중 중복 클릭 방지** | `src/app/page.tsx` `handleSave` | 저장 중 버튼 비활성화 + 로딩 인디케이터 |
| H-2 | **네트워크 실패 토스트** | `src/app/lib/remindApi.ts` + 홈 | `postQuickEntry` 실패 시 `console.warn` → 사용자 토스트 |
| H-3 | **피드 빈 상태 UX** | `src/app/feed/page.tsx` | 기록 0건일 때 샘플 데이터 대신 빈 상태 화면 + 안내 문구 |
| H-4 | **Red UI 교체 — 마이페이지** | `src/app/my/page.tsx` | `MyProfileCard`, `SettingsSection` 구현 (Figma 설계 후) |
| H-5 | **Red UI 교체 — 편집 오버레이** | `src/app/page.tsx` 편집 오버레이 | `RecordEditStatusBar`, `RecordEditToolbar` 구현; `IosKeyboardMock` 제거(네이티브 이전 시) |

---

### 🟡 Medium — 핵심 기능이나 단기 차단 없음

| # | 항목 | 파일·위치 | 완료 기준 |
|---|------|-----------|-----------|
| M-1 | **접근성(a11y) 최소 세트** | 홈·피드·마이 전반 | 편집 오버레이 포커스 트랩, Lighthouse Accessibility 통과 |
| M-2 | **서버 동기화 활성화** | `src/app/lib/remindApi.ts` | C-1~C-3 완료 후 Bearer 토큰으로 실 서버 동기화 |
| M-3 | **AI 파이프라인 구현** | `server/src/jobs/ai-queue.ts` | BullMQ + Redis 워커, LLM 연동 (Claude/GPT), `AiArtifact` 저장 |
| M-4 | **회고 카드 UI** | `src/app/feed/` 또는 신규 화면 | `AiArtifact` 데이터 피드에 노출 (first-launch/08 참고) |
| M-5 | **오프라인 동기화 큐** | `src/app/lib/` 신규 | 아웃박스 패턴, 실패 재시도, `clientMutationId` 멱등 처리 |

---

### 🟢 Low — 품질·확장성 개선 (필수 경로 아님)

| # | 항목 | 파일·위치 | 완료 기준 |
|---|------|-----------|-----------|
| L-1 | **유닛·통합 테스트** | `src/`, `server/src/` | `recordsStore`, API 라우트 핵심 함수 커버리지 |
| L-2 | **에러 추적 (Sentry)** | Next + Fastify 공통 | 프로덕션 에러 자동 수집 |
| L-3 | **푸시 알림 연동** | `server/src/` 신규 잡 | APNs/FCM 실 발송, `DevicePushToken` 활용 |
| L-4 | **네이티브 앱 착수 (Expo)** | `native/` | Expo 프로젝트 초기화, 웹 API 재활용 |
| L-5 | **홈 화면 위젯 (1.1)** | `native/` | iOS WidgetKit / Android App Widget |
| L-6 | **Storybook 배포** | CI/CD | 컴포넌트 문서 외부 공유 가능 상태 |

---

## 다음 스프린트 제안 (우선순위 기준)

설계 완료 대기 중인 항목(H-4, H-5)을 제외하고, **지금 바로 착수 가능한 순서:**

1. `H-1` 저장 중 중복 클릭 방지 → 가장 짧고 임팩트 명확
2. `H-2` 네트워크 실패 토스트 → 사용자 신뢰 직결
3. `H-3` 피드 빈 상태 UX → 온보딩 경험
4. `M-1` 접근성 최소 세트 → 포커스 트랩 + ARIA
5. `C-1 ~ C-3` JWT 인증 → 프로덕션 배포 언블럭

---

## 관련 문서

- [first-launch/01-scope-mvp.md](./first-launch/01-scope-mvp.md)
- [first-launch/03-backend-architecture.md](./first-launch/03-backend-architecture.md)
- [first-launch/05-ai-pipeline.md](./first-launch/05-ai-pipeline.md)
- [first-launch/06-push-reminders.md](./first-launch/06-push-reminders.md)
- [NEXT_TASKS_AND_COMPONENTS.md](./NEXT_TASKS_AND_COMPONENTS.md)
