# 첫 론칭 기능 로드맵 (구현 참고 문서)

네이티브 앱 + AI + 데이터 보존을 전제로 한 **결정 기록**과 **실행 스캐폴드**입니다. (Figma/Next 쪽 [src/app/](../../src/app/) UI는 레퍼런스로 유지.)

| 문서 | 내용 |
|------|------|
| [01-scope-mvp.md](./01-scope-mvp.md) | 1.0 / 1.1 범위 권장안 |
| [02-mobile-stack.md](./02-mobile-stack.md) | 모바일 스택·위젯 전략 |
| [03-backend-architecture.md](./03-backend-architecture.md) | Auth·API·DB·동기화·백업 |
| [04-data-model.md](./04-data-model.md) | 저널 엔트리·감정 태그·AI 산출물 |
| [05-ai-pipeline.md](./05-ai-pipeline.md) | LLM 잡 큐·원문 보존·옵트인 |
| [06-push-reminders.md](./06-push-reminders.md) | APNs/FCM·리마인더 스펙 |
| [07-widgets.md](./07-widgets.md) | 위젯·Share·퀵캡처 |
| [08-timeline-reflection.md](./08-timeline-reflection.md) | 타임라인·회고 UI 계약 |
| [../PROGRESS_CHECKLIST.md](../PROGRESS_CHECKLIST.md) | **전체 진행 현황** + 위험도 우선 작업 목록 (최신) |
| [../NEXT_TASKS_AND_COMPONENTS.md](../NEXT_TASKS_AND_COMPONENTS.md) | 다음 과업 + red 영역 컴포넌트 후보 + 완료 이력 |
| [../DESIGN_TOKENS_RUNBOOK.md](../DESIGN_TOKENS_RUNBOOK.md) | Figma plugin JSON 기반 토큰 운영 가이드 |
| [../GIT_SETUP_HISTORY.md](../GIT_SETUP_HISTORY.md) | 로컬 Git/remote 세팅 히스토리 정리 |

## 코드

- **공유 타입**: [src/types/journal.ts](../../src/types/journal.ts)
- **API 서버 (Phase 1 스캐폴드)**: [server/README.md](../../server/README.md)

---

## 문서·구현 동기화 (히스토리)

각 카테고리 문서 **하단**에 `구현 이력 (레포 동기화)` 블록을 두고, **완료·진행된 기능**을 날짜별로 누적합니다. (실제 제품 문서로 재사용할 때는 해당 섹션만 모아도 됩니다.)

**운영 규칙:** 기능이 머지될 때마다 (1) 아래 요약 표에 **한 줄** 또는 **새 날짜 블록**을 추가하고, (2) 관련된 카테고리 md의 `### YYYY-MM-DD`에 **핵심만** bullet로 남깁니다. 과거 항목은 지우지 않고 위에 새 날짜를 쌓습니다.

| 시점 | 요약 |
|------|------|
| **2026-04-17** | **프로젝트 규칙 확립** (`CLAUDE.md`). **보안 4건** 수정 (서버 프로덕션 가드, CORS 환경변수 제한, localStorage 스키마 버전 관리, 토큰 CSS 경고 주석). **내비게이션 구조 개편** — BottomNavBar 제거, 1depth 전 화면에 FAB 추가(새 기록), 피드 CTA 버튼 FAB로 통합. **Segment Control 아이콘화** — 가로/세로 전환 버튼을 SVG 아이콘으로 교체. |
| **2026-04-01** | 모아보기를 **타임라인 기본 화면**으로 전환. 방향 토글(가로/세로), 가로 스와이프 카드와 하단 dot-라인 동기화(활성 dot 중앙 정렬) 추가. |
| **2025-03-24** | 기록하기 **실시간 날씨·역지오코딩** (`/api/weather`), **저장 시 날씨 스냅샷** (로컬 + `POST /v1/entries/quick` + `JournalEntry.weather`), 피드 한 줄 표시. 상세는 아래 문서 이력 참고. |

| 문서 | 이력 위치 |
|------|-----------|
| [01-scope-mvp.md](./01-scope-mvp.md) | 범위 대비 웹 프로토타입 진척 |
| [02-mobile-stack.md](./02-mobile-stack.md) | 웹 위치 API → 네이티브 시 유의점 |
| [03-backend-architecture.md](./03-backend-architecture.md) | Route Handler·퀵 엔트리·환경 변수 |
| [04-data-model.md](./04-data-model.md) | `StoredRecord` / `JournalEntry.weather` |
| [05-ai-pipeline.md](./05-ai-pipeline.md) | (날씨는 원문 외 메타, AI 원칙 불변) |
| [06-push-reminders.md](./06-push-reminders.md) | (해당 일자 변경 없음) |
| [07-widgets.md](./07-widgets.md) | 퀵 엔트리 `weather` 선택 필드 |
| [08-timeline-reflection.md](./08-timeline-reflection.md) | 향후 타임라인 메타로 활용 가능 |
| [../NEXT_TASKS_AND_COMPONENTS.md](../NEXT_TASKS_AND_COMPONENTS.md) | 백로그 대비 완료 반영 |
