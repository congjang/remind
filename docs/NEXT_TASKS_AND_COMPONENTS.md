# 다음 과업 (레포 기준) + 컴포넌트 교체용 백로그

플로우 연결·데이터 저장 **이후**에 진행하면 좋은 일을 **지금 코드베이스 기준으로만** 세 가지로 압축했습니다.  
그 아래는 빨간 배경(`bg-red-200`)으로 표시한 **비컴포넌트 UI**를 교체 요청할 때 쓸 **후보 이름**입니다.

---

## 권장 다음 과업 3가지 (우선순위 순)

### 1. 컴포넌트화 범위 확정 + Figma 매핑

**목적:** 교체 요청 시 “이름 + 파일 + 노드”로 말할 수 있게 정리.

**할 일**

- 아래 [컴포넌트 후보 표](#컴포넌트-후보-표-red-영역)를 기준으로, Figma에서 대응 컴포넌트 노드를 붙입니다.
- 우선순위는 보통 **기록하기 → 모아보기 → 마이** 순입니다. (`playground`는 제품 화면이 아니면 후순위)

**완료 기준:** 표에 Figma `node-id` 또는 컴포넌트 이름이 채워짐.

---

### 2. 접근성(a11y) 최소 세트

**목적:** 기록·저장·모아보기가 **키보드·스크린리더**에서도 최소한 동작.

**할 일 (이 레포에서 특히)**

- 기록하기: 텍스트 영역에 **접근 가능한 레이블**(placeholder만으로는 부족할 수 있음), 편집 모드 **포커스 트랩** 여부 결정.
- 모아보기: “오늘의 새 기록” 등 **역할**(`button` vs `link`)과 `aria-label`.
- 하단 `BottomNavBar` / `Button`: 포커스 링이 디자인 토큰과 맞는지 확인.

**완료 기준:** Lighthouse Accessibility 또는 수동으로 Tab 순서·VoiceOver 한 사이클 통과.

---

### 3. 예외·빈 상태 UX (네트워크·데이터)

**목적:** 플로우가 끊기지 않게 **실패와 빈 화면**을 정책으로 고정.

**할 일 (이 레포와 연결)**

- `remindApi` 동기화 실패: 지금은 `console.warn`만 → **사용자에게 보일지**(토스트/배지) 정책 결정.
- 모아보기: 선택한 날짜에 기록이 **없을 때** 빈 상태 카피·일러스트.
- 저장 중: `기록 저장하기` **로딩/중복 클릭 방지** 여부 결정.

**완료 기준:** 위 세 가지 중 최소 1~2개가 화면에 반영.

---

## 컴포넌트 후보 표 (red 영역)

| 화면 | 파일·위치 (대략) | 제안 컴포넌트명 | 비고 |
|------|------------------|-----------------|------|
| 기록하기 | [src/app/page.tsx](../src/app/page.tsx) 편집 오버레이 상단 | `RecordEditStatusBar` 또는 `IosStatusBarMock` | 시계·시그널 등 목업 |
| 기록하기 | 동일, 상단 도구 버튼 3개 | `RecordEditToolbar` | 이모지/첨부 등 플레이스홀더 |
| 기록하기 | 동일, 하단 키보드 영역 | `IosKeyboardMock` | 전체 키보드 UI는 앱 이전 시 제거 가능 |
| 모아보기 | [src/app/feed/page.tsx](../src/app/feed/page.tsx) “오늘의 새 기록” 블록 | `FeedNewRecordCta` | FAB/CTA 디자인에 맞게 |
| 모아보기 | 동일, 기록 리스트 카드 | `FeedRecordCard` (2줄 타입) | 현재 `Card` + 수동 레이아웃 |
| 모아보기 | 동일, 로딩 스켈레톤 | `FeedRecordSkeleton` | 선택 |
| 마이 | [src/app/my/page.tsx](../src/app/my/page.tsx) 프로필 영역 | `MyProfileCard` | 아바타·이메일·버튼 |
| 마이 | 동일, 설정 묶음 | `SettingsSection` + [List](../src/app/components/List.tsx) | 행은 `List` 아이템으로 통일 가능 |
| Playground | [src/app/playground/page.tsx](../src/app/playground/page.tsx) 섹션 래퍼 | (제품 컴포넌트 아님) | 데모 구획용; 필요 시 `PlaygroundSection`만 |

---

## 관련 문서

- 첫 론칭 로드맵: [first-launch/README.md](./first-launch/README.md)

---

## 최근 완료·반영 (레포, 누적)

다음 과업 목록과 별도로, **이미 처리된 것**을 문서 히스토리와 맞추기 위한 기록입니다.

### 2026-04-17

- **CLAUDE.md 작성:** 코드 규칙(디자인 토큰 우선순위, 컴포넌트 컨벤션, 보안 금지사항), 위험 요소, 작업 우선순위, 커밋 컨벤션 확립.
- **보안 — 서버 프로덕션 가드:** `NODE_ENV=production`에서 `X-Dev-Email` dev auth 사용 시 `process.exit(1)` crash-out. 우회 시 `ALLOW_DEV_AUTH=true` 명시 필요. `server/.env.example`에 경고 추가.
- **보안 — CORS 제한:** 프로덕션에서 `CORS_ORIGIN` 환경변수로 허용 도메인 제한. 개발 환경은 전체 허용 유지.
- **보안 — `resolveDevEmail()` 헬퍼:** 3개 라우트의 인증 코드 중앙화. JWT 교체 시 함수 하나만 수정.
- **localStorage 스키마 버전 관리:** `CURRENT_SCHEMA_VERSION` 상수, `StoreMeta` 타입, `migrateRecords()` 함수, `META_KEY` 도입. 필드 변경 시 버전 올리고 switch-case 추가.
- **토큰 CSS 경고 주석:** `design-tokens/primitives.css`, `semantic.css` 상단에 "자동 생성 파일 — 직접 수정 금지" 경고 추가.
- **BottomNavBar 제거:** `my/page.tsx`에서 완전 제거. `BOTTOM_NAV_BAR_HEIGHT_PX` 패딩 → `pb-24` 대체.
- **FAB 통합 (1depth 전 화면):** 홈(`setIsEditing(true)`), 피드(`router.push("/")`), 마이(`router.push("/")`). z-index 계층 정리(홈 z-10, 피드 z-40, 마이 z-20).
- **피드 "오늘의 새 기록" CTA 제거:** FAB으로 통합. `CardOneLineNewRecordButton` import 제거.
- **Segment Control 아이콘화:** 가로/세로 전환 텍스트 버튼 → `HorizontalViewIcon`(캐러셀 3열), `VerticalViewIcon`(스택 2행) SVG 아이콘. `aria-label` 유지.

### 2025-03-24

- **날씨·위치:** 기록하기 `TopNavBar` — `LiveWeatherBlock`, `GET /api/weather`, OWM + 선택 카카오 역지오코딩.
- **저장 시 날씨:** `saveRecord` + `postQuickEntry(weather?)`, Prisma `JournalEntry.weather`.
- **피드:** 저장된 날씨 한 줄 (`FeedRecord.weatherLine`).
- **여전히 열림:** 아래 [권장 다음 과업 3가지](#권장-다음-과업-3가지-우선순위-순) (컴포넌트화·a11y·예외 UX) — 날씨 작업과 무관하게 유지.

교체 요청 예시:

> `FeedNewRecordCta` — Figma 노드 `xxx:yyy` — [feed/page.tsx] 빨간 CTA 블록 교체
