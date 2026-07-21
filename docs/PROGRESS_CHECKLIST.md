# 전체 진행 현황 체크리스트

> 마지막 갱신: 2026-07-21d: **WBS 섹션 상단부 군더더기 제거(아티팩트 반영, md는 태그명만 동기화)** — "'모든 게 여기서 시작합니다' 우산 문구는 우리가 다 아는 사실이라 숨겨도 되지 않을까, 그 아래 안내 문단도 md엔 있어도 되지만 아티팩트엔 안 보여도 될 것 같다. 선정 기준 태그도 부가설명 없이 레이블 자체를 쉬운 말로 바꾸면 된다"는 지적에 따라, 아티팩트의 `#service-policy` 섹션에서만 우산 라벨과 안내 문단을 삭제하고 `.wbs-legend`(태그별 뜻 설명) 블록도 삭제 — 이 두 가지는 마크다운 문서 성격상 계속 필요해 md에서는 유지. 다만 뜻풀이가 필요했던 태그 2개는 더 쉬운 말로 리네임해 아티팩트·md 동일하게 반영: `게이팅` → `선행조건`, `5기준` → `최우선순위`(나머지 6개 태그는 원래도 단어 자체가 뜻을 담고 있어 유지)
> 2026-07-21c (**축 요약을 표에서 한 줄 문장으로 축소** — "지키는 축/만드는 축 구분과 뜻 설명은 부수적이니 없애고, 핵심 진행률만 보이게"라는 지적에 따라, 그룹·뜻 열이 있던 5행 표를 "유실방지 67% · 공격방어 72% · 약속이행 40% · 경험설계 36% · 기반구축 92%" 한 문장으로 축약. 아티팩트도 동일하게 넓은 막대그래프 5개를 한 줄짜리 칩으로 교체)
> 2026-07-21b: **"Product Integrity(PI)" 개념 폐기, 5축 체계로 전면 교체** — "PI가 너무 은유적이다", "축이 더 있지 않나(UX·인프라가 아무 축에도 안 들어가는 게 당황스럽다)"는 지적에 따라 재설계. **지키는 축**(안 지키면 배신): 유실방지·공격방어·약속이행(신설, `DATA-INTEGRITY`+이용약관 정책 흡수). **만드는 축**(디자인씽킹 Desirability·Feasibility 관점): 경험설계(신설, `DESIGN-SYSTEM`·`EMPTY-UI`·`ACCESSIBILITY`가 처음으로 축을 가짐)·기반구축(신설, `PROJECT-SETUP`·`SERVER-SCAFFOLD`·`AUTH`가 처음으로 축을 가짐). `AI-PIPELINE`·`PUSH-NOTIFICATION` 등은 세부 태스크 미분해 상태라 **미배정**으로 표시, 분해 시 재분류. 영어 배지(SYNC/SECURITY)도 전부 한글 축 이름으로 교체. 아티팩트와 동일하게 반영)
> 2026-07-21a: **WBS를 중심 구조로 재편 — 아티팩트와 동일하게 md에도 반영**. ① `Product Integrity 현황판`(별도 섹션) 삭제, SYNC/SECURITY 두 축을 [WBS 표](#wbs--무엇을-왜-그-순서로-진행했나)의 새 **PI축** 열로 흡수 — 롤업 숫자(6/14, 13/18)는 이제 이 표를 합산한 값. `AUTH`·`DATA-INTEGRITY`가 PI축에서 빠지는 이유(게이팅 인프라/데이터 소유권)도 WBS 섹션으로 이동. ② WBS 표에 **관련**(같은 게이팅/정책 관계로 엮인 다른 WBS 항목)·**상세**(부록 C·D 해당 섹션 링크, 항목 개수 병기) 열 신규 추가. ③ `자동화 커버리지 현황`을 독립 최상위 섹션으로 승격(기존엔 Product Integrity 하위였음). 아티팩트의 마일스톤 아코디언 전환·섹션 재배치(히스토리·자동화 우선순위를 하단으로)는 마크다운으로 표현할 인터랙션이 없어 이번 반영 범위에서 제외 — 표 구조·Product Integrity 통합만 동일하게 맞춤)
> 2026-07-18d: **[WBS — 무엇을, 왜 그 순서로 진행했나](#wbs--무엇을-왜-그-순서로-진행했나) 섹션 신설** — 사용자 지적: "그때그때 체크하면서 빠진 것·추가할 것을 추가하다 보니 체크리스트가 혼잡하고 방대해진 것 같다. 어떤 기준으로 진행한 건지." PM 아티팩트에 먼저 만든 WBS 테이블(2026-07-18h)을 md에도 반영. Product Integrity 현황판 바로 아래 배치 — 1단계 그룹은 실제 구현 순서(기획→로컬 프로토타입→서버 인프라→인증·보안→서버 동기화→출시→AI·네이티브 확장) 7단계, `DESIGN-SYSTEM`·`EMPTY-UI`·`ACCESSIBILITY`·`DATA-INTEGRITY`는 병행 트랙으로 분리. 각 항목에 실제로 적용됐던 선정 기준 10종 태그(게이팅/5기준/기능무결성/리스크방어/배포환경필요/정책선행/저비용고임팩트/디자인선행필요/과잉설계방지/후순위)를 병기)
> 2026-07-18c (**부록 C 상세 체크항목 18건에 "→ PM 참고" 문구 추가** — 사용자 지적: "상세 태스크들도 PM이 로직을 알아야 하는 경우가 있는데 반영이 안 됐다." 최상단 요약 표(2026-07-18b)만으로는 부족하다는 지적에 따라, DATA-INTEGRITY 5건·AUTH 5건·SECURITY-HARDENING 3건·SYNC-LIVE 5건 — 실제 제품/UX 결정이나 사용자 경험을 좌우하는 행에만 선별 추가(예: "삭제해도 30일 보관", "로그인 실패 메시지가 계정 존재 여부를 숨김", "리마인더 데이터 형태 미정" 등). `bodyLimit` 설정값, 헤더 종류처럼 순수 구현 디테일뿐인 행은 제외 — 기준: 코드가 아니라 정책/UX 결정을 담고 있는가)
> 2026-07-18b: **[진행 현황 목록](#진행-현황-목록-위험도-우선순위)의 Critical/High/Medium/Low 4개 표에 "왜 PM이 신경 써야 하는가" 열 신규 추가** — 기존엔 "파일·위치"·"완료 기준"만 있어 개발자 시점 서술뿐이었음. 각 항목이 방치되면 실제로 어떤 문제가 생기는지(출시 불가, 첫인상 손상, 데이터 유실 위험, 리텐션 저해 등)를 비개발자도 판단할 수 있는 문장으로 병기
> 2026-07-18a: 사용자 지적으로 체크리스트 과잉 여부 자체 감사 실시. **개발자가 임의로 스코프를 늘린 항목 3건 확인**: ① `ReminderSpec.schedule` — 리마인더 UI가 없는데 `daily`/`weekly`/`cron` discriminated union으로 존재하지 않는 기능의 데이터 모델을 설계했던 것 → 원래 목적(DoS 방지)에 맞게 크기 제한만 있는 `z.unknown()`으로 되돌림(`server/src/app.ts`, `src/types/journal.ts`, 테스트 축소). ② `updatedAt` 증분 동기화(`?since=`)를 `GET /v1/entries`와 묶어 "처음부터 만들자"고 제안했던 것 → 검증 안 된 미래 최적화라 판단, 별도 항목으로 분리해 필요성 확인 전까지 보류. ③ `body` 불변성 가드·Web Locks 탭 경합 수정은 코드 자체는 유지하되(저비용·기존 정책 코드화, 로그인 UI 부재로 당장 긴급하진 않음), 체크리스트 문구의 긴급도 과장을 정정. SECURITY-HARDENING 관련 항목 정정 반영
> 2026-07-17: (사용자가 제안한 "소프트 삭제/`updatedAt` 버전 관리" + "온보딩 데이터 병합 전략"을 코드·문서로 대조. 소프트 삭제는 이미 완료, 온보딩 병합 전략도 이미 2개 항목으로 추적 중(다중 기기 충돌은 `data-migration.md`에 열린 질문으로 명시) — 둘 다 신규 작업 아님. 단 **`updatedAt` 필드를 실제 동기화에 활용하는 항목이 체크리스트에 없었던 걸 발견해 신규 추가** — `GET /v1/entries` 구현 시 `?since=` 증분 조회를 처음부터 포함하도록 명시. `SYNC-LIVE` 병합 전략 항목 설명에 `data-migration.md` 참조 보강. SYNC-LIVE 2/9 → 2/10, Product Integrity 19/31 → 19/32(59%))
> 2026-07-16c: 사용자가 제안한 "`POST /v1/entries` 구현 + JWT userId 연결 + 스키마 강화" 3개를 코드로 대조 — 전부 이미 완료된 작업으로 확인(신규 작업 없음). 대신 체크리스트 정합성 점검 중 실제 gap 2건 발견·정정: ① `SYNC-LIVE`의 "`X-Dev-Email`→`Bearer` 교체" 항목이 2026-07-15에 이미 끝났는데 이 줄만 대기로 남아있던 걸 정정, ② **`GET /v1/entries`(목록 조회) 엔드포인트가 서버에 아예 없다는 게 체크리스트 정식 항목으로 한 번도 등록된 적이 없었음** — `SYNC-LIVE`에 신규 항목으로 추가. SYNC-LIVE 1/8 → 2/9, Product Integrity 18/30 → 19/31(61%)
> 2026-07-16b: `SECURITY-HARDENING` 상시 보안 방어 남은 3건 완료로 **10/10 달성** — ① `app.setErrorHandler()` 전역 에러 핸들러 신규(`server/src/app.ts`): uncaught 예외(Prisma 등)는 항상 `{error:"internal_server_error"}`만 응답, 원본은 서버 로그에만 기록, ② `@fastify/rate-limit`의 `errorResponseBuilder`로 429 응답에 명확한 안내 메시지·`retryAfterMs` 추가, ③ `ReminderSpec.schedule`을 `z.unknown()`에서 `daily`/`weekly`/`cron` discriminated union으로 교체해 무제한 JSON 저장 경로 차단(`src/types/journal.ts` 타입도 동기화). `ALLOW_DEV_AUTH` 참조 stale 항목 2곳을 `JWT_SECRET` 가드로 문구 정정. 테스트 6개 추가(총 24개, 전부 통과). Product Integrity 15/30 → 18/30(60%), SECURITY-HARDENING 7/15 → 10/15)
> 2026-07-16a: `DATA-INTEGRITY`·`AUTH` 위중도 우선순위 재조사 후 4건 완료: ① `server/scripts/backup-db.sh`·`restore-db.sh` 신규 — DB 백업이 문서·코드 어디에도 전혀 없던 공백을 메움, ② `remindApi.ts`의 refresh 요청을 Web Locks API로 탭 간 직렬화해 다탭 동시 갱신 시 전체 로그아웃되던 경합 제거, ③ `server/src/prismaGuards.ts`의 `withAppendOnlyGuard()` — `JournalEntry.body` 수정을 코드 레벨에서 원천 차단, ④ 계정 삭제 시 보유기간 정책을 개인정보처리방침과 동일하게 30일로 확정. `이용약관`·`개인정보처리방침` 아티팩트 2종 신규 작성(일반 조항 + REMIND 특화 조항, 정책 결정 4건 사용자 확인 후 반영). 서버 테스트 18개 전부 통과
> 2026-07-15b: `AUTH` `resolveDevEmail()` → JWT `requireAuth` preHandler 미들웨어로 완전 교체 — 보호 라우트 4개(`/v1/entries/quick`, `DELETE /v1/entries/:id`, `/v1/reminders`, `/v1/push-tokens`) 전부 `Authorization: Bearer` 필수로 전환, `ALLOW_DEV_AUTH` 크래시가드는 `JWT_SECRET` 필수 가드로 교체. 클라이언트(`remindApi.ts`)에 access token 메모리 보관 + refresh 자동 갱신 + 401 시 refresh 1회 재시도 로직(`authedFetch`) 구현, `session.ts` `logout()`에 토큰 초기화 연결. `server/src/app.test.ts` 4개 케이스 추가(총 18개) + 실제 Postgres·브라우저 크로스오리진 fetch로 signup→보호라우트→refresh 전체 플로우 수동 검증 완료. AUTH 7/13 → 10/13
> 2026-07-15a: `AUTH` 스키마 변경(`User.passwordHash`, `RefreshToken`) 로컬 DB 마이그레이션 완료. 과정에서 `prisma/migrations`에 `JournalEntry` 등 기본 테이블을 만드는 init 마이그레이션 자체가 누락돼 있던 걸 발견 — 기존 `20250324120000_journal_entry_weather`(증분 파일만 있고 베이스가 없음)를 백업 후 `npx prisma migrate dev --name init`으로 전체 스키마를 담은 완전한 init 마이그레이션 재생성 + 적용, `migrate status` "up to date" 확인. 새 DB에서 앞으로 누구든 `migrate dev`를 돌려도 안전해짐
> 2026-07-14: `AUTH` 토큰 저장 전략 결정([auth-token-strategy.md](./auth-token-strategy.md)) + `signup/login/refresh/logout` 4종 라우트 구현 — bcryptjs 해시, refresh token 회전/재사용 탐지, 로그인 rate limiting, 로그인 실패 메시지 통일까지 부수 완료. `server/src/app.test.ts` 9개 케이스 추가. AUTH 3/13 → 7/13
> 2026-07-13: 디자인 제외 백엔드·데이터 안정화 3건: `SYNC-LIVE` 로그아웃/재로그인 로컬 데이터 무효화, `DATA-INTEGRITY` 소프트 삭제 엔드포인트 + 테스트, `AUTH` 데이터 마이그레이션 전략 초안 + PM 아티팩트 QA 시나리오 맵·자동화 우선순위 도입, 자동화 커버리지 현황 신설 + `AUTH` 비밀번호·JWT 시크릿 저장 가드레일 2건 완료
> 디자인 시스템 검토 및 인터페이스 디자인 작업은 이 목록에서 제외합니다.

---

## 자동화 커버리지 현황 (아티팩트 연동)

수동 테스트가 번거로운 항목을 자동화(Playwright/vitest) 우선순위로 뽑아 관리합니다. **상세(순위·심각도 근거·추천 도구)는 [PM 마스터 체크리스트 아티팩트](https://claude.ai/code/artifact/90835380-3597-45fb-9e97-36e796a9699d) § 자동화 우선순위가 원본**이고, 여기는 그 상태를 두 축으로 요약만 합니다 — 아티팩트 쪽 표가 바뀔 때마다 아래 숫자도 함께 갱신합니다.

| 자동화 단계 | 개수 | 항목 |
|---|---|---|
| 기획 (Planning) | 8 | 스키마 마이그레이션, 로그아웃 무효화, 오프라인 재시도, `clientMutationId` 경합, 레이트 리미팅, 401 재시도 분기(`AUTH` 선행 필요), bodyLimit/token 경계값, 포커스 트랩·ESC |
| 구현 완료 (Implemented) | 1 | 소프트 삭제 소유권·멱등(`server/src/app.test.ts`, 5케이스) |
| 배포 후 검증됨 (Verified) | 0 | — (아직 실 배포 환경 없음) |

| 심각도 | 개수 | 기준 |
|---|---|---|
| 치명적 (Blocker) | 3 | 실패 시 데이터 유실·개인정보 유출급 (스키마 마이그레이션, 로그아웃 무효화, 오프라인 재시도) |
| 중요 (Major) | 4 | 실패 시 데이터 오염·보안 통제 실패급 (`clientMutationId` 경합, 레이트 리미팅, 소프트 삭제, 401 재시도 분기) |
| 보통 (Minor) | 2 | 실패해도 UX 저하 수준 (bodyLimit/token 경계값, 포커스 트랩·ESC) |

> **유지보수 루틴(아티팩트에 동일 내용 있음)**: 매 배포 주기마다 아티팩트의 자동화 우선순위 표를 훑고, 그 사이 부록 C/D에서 새로 `☑ 완료`된 엣지 케이스 중 표에 없는 게 있으면 새 행으로 제안한 뒤 위 숫자를 함께 갱신합니다.

---

## WBS — 무엇을, 왜 그 순서로 진행했나

> 태스크를 그때그때 확인·추가하다 보니 체크리스트가 방대해졌다는 지적에 따라 작업분류체계(WBS)로 정리했습니다(2026-07-18 신설, [PM 아티팩트](https://claude.ai/code/artifact/90835380-3597-45fb-9e97-36e796a9699d)에 동일 내용 있음 — 아티팩트가 시각적 원본, 여기는 표 요약). **2026-07-21 갱신**: "Product Integrity(PI)"라는 이름이 은유적이라 무슨 뜻인지 안 읽힌다는 지적 + 축이 2개뿐이라 UX·인프라 작업이 아무 축에도 못 들어간다는 지적에 따라, "이 작업이 지키는 약속이 무엇인가"를 5개 축으로 답하는 체계로 전면 교체했습니다. 마크다운은 아코디언·탭 인터랙션은 표현 못 해 그 부분만 제외하고, 표 구조는 그대로 반영했습니다.
> 1단계 그룹은 제품 구현의 실제 순서(기획 → 로컬 프로토타입 → 서버 인프라 → 인증·보안 → 서버 동기화 → 출시 → AI·네이티브 확장)입니다. `DESIGN-SYSTEM`·`EMPTY-UI`·`ACCESSIBILITY`·`DATA-INTEGRITY` 4개는 이 순서 어디에도 순차적으로 속하지 않는 **병행 트랙**(UX·데이터 품질)이라 별도로 뒀습니다.

**축 요약** — 아래 WBS 표의 축 열을 합산한 값이라 따로 관리하지 않습니다: 유실방지 67% · 공격방어 72% · 약속이행 40% · 경험설계 36% · 기반구축 92%.

`AI-PIPELINE`·`PUSH-NOTIFICATION` 등(7.1·7.2)은 세부 태스크로 아직 안 쪼개져 있어 아래 표에서 축이 **미배정**입니다 — 분해되면 그때 위 5축 중 하나로 재분류합니다.

**선정 기준 범례** — "선정 기준" 열에 쓰인 태그의 뜻:

| 태그 | 뜻 |
|---|---|
| `선행조건` | 다른 작업 전부가 이걸 전제로 함 |
| `최우선순위` | 치명적·시급·최상중요도·빠른해결·비-디자인 5가지로 판단 |
| `배포환경필요` | 로컬 검증 불가, 배포 후에만 확인 가능 |
| `정책선행` | 코드보다 정책·법률 결정이 먼저 필요 |
| `저비용고임팩트` | 위중도 재조사에서 발견된 값싼 방어선 |
| `디자인선행필요` | Figma 화면설계 확정이 먼저 필요 |
| `과잉설계방지` | 자체 감사로 스코프를 되돌린 항목 |
| `후순위` | 의도적으로 미루고 있는 항목 |

| WBS | 작업 항목 | 축 | 완성도 | 선정 기준 | 관련 | 상세 |
|---|---|---|---|---|---|---|
| **1** | **기획 · 설계** | | | | | |
| 1.1 | `PROJECT-SETUP` | 기반구축 | 100% | `선행조건` | — | [부록 D](#project-setup--프로젝트-초기-설정-2026-03-11--2026-03-19)(6개) |
| **2** | **로컬 프로토타입 (오프라인 우선)** | | | | | |
| 2.1 | `KEY-FEATURES` | 유실방지 | 71% | — | P.1 | [부록 C](#key-features--마이크로-저널링-핵심-플로우)(7개) |
| 2.2 | `WEATHER-SNAPSHOT` | 유실방지 | 100% | — | — | [부록 D](#weather-snapshot--날씨위치-스냅샷-2025-03-24)(4개) |
| 2.3 | `TIMELINE-UI` | 유실방지 | 100% | — | P.2 | [부록 D](#timeline-ui--타임라인-피드-2026-04-01)(5개) |
| 2.4 | `SYNC`(오프라인 동기화 큐) | 유실방지 | 100% | — | 5.1 | [부록 D](#sync--오프라인-동기화--저장-안전장치-2026-05-16--2026-07-11)(4개) |
| **3** | **서버 인프라 구축** | | | | | |
| 3.1 | `SERVER-SCAFFOLD` | 기반구축 | 100% | `선행조건` | 4.1 | [부록 D](#server-scaffold--fastify--prisma-api-서버-골격)(6개) |
| 3.2 | `SECURITY-BASELINE` | 공격방어 | 100% | — | 4.2 | [부록 D](#security-baseline--최소-보안-가드-2026-04-17)(3개) |
| **4** | **📍 인증 · 보안 구축 — 현재 위치** | | | | | |
| 4.1 | `AUTH` | 기반구축 | 85% | `최우선순위` `선행조건` | 3.1, 4.2, 5.1, P.4 | [부록 C](#auth--신규-서버-실사용자-인증-jwt)(13개) |
| 4.2 | `SECURITY-HARDENING` | 공격방어 | 67% | `배포환경필요` | 4.1, 6.1 | [부록 C](#security-hardening--서버-보안-강화)(15개) |
| **5** | **서버 동기화 연결** | | | | | |
| 5.1 | `SYNC-LIVE` | 유실방지 | 20% | `선행조건` `과잉설계방지` | 4.1, 2.4 | [부록 C](#sync-live--서버-동기화-활성화-실사용자-연결)(10개) |
| **6** | **정식 출시** | | | | | |
| 6.1 | 배포 전 체크리스트 | 공격방어 | 0% | `배포환경필요` | 4.2(하위) | [부록 C § 배포 전 체크리스트](#배포-전-체크리스트)(5개) |
| 6.2 | 이용약관 · 개인정보처리방침 정식화 | 약속이행 | 0% | `정책선행` | P.4 | [이용약관](https://claude.ai/code/artifact/f73a98db-af7d-485f-a0ba-6dc0461e62d0) · [개인정보처리방침](https://claude.ai/code/artifact/fc87268b-7ee7-4e85-9c86-30a4c7e09c20) |
| **7** | **AI · 네이티브 확장** | | | | | |
| 7.1 | `AI-PIPELINE` | 미배정 | 0% | `후순위` | — | 체크리스트 미착수 |
| 7.2 | `PUSH-NOTIFICATION` · `NATIVE-APP` · `WIDGET` | 미배정 | 0% | `후순위` | — | 체크리스트 미착수 |
| **P** | **병행 트랙 — 순차 단계에 속하지 않는 UX·데이터 품질** | | | | | |
| P.1 | `DESIGN-SYSTEM` | 경험설계 | 67% | `디자인선행필요` | 2.1 | [부록 C](#design-system--디자인-토큰아이콘storybook-파이프라인)(9개) |
| P.2 | `EMPTY-UI` | 경험설계 | 0% | `후순위` | 2.3 | [부록 C](#empty-ui--피드-빈-상태-ux)(8개) |
| P.3 | `ACCESSIBILITY` | 경험설계 | 38% | `저비용고임팩트` | — | [부록 C](#accessibility--접근성a11y-최소-세트)(8개) |
| P.4 | `DATA-INTEGRITY` | 약속이행 | 40% | `저비용고임팩트` `과잉설계방지` | 4.1, 6.2 | [부록 C](#data-integrity--데이터-삭제무결성-보장)(10개) |

> `SECURITY-HARDENING`의 완성도(67%)는 **상시 보안 방어 + 배포 전 체크리스트를 합산**한 숫자입니다 — 상시 보안 방어는 10/10 완료, 남은 건 전부 배포 환경에서만 검증 가능한 항목입니다(위 6.1 행).

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
| **`AUTH` — 인증 (JWT)** | 🔴 미완 (11/13) | 프로덕션 배포 차단. `signup/login/refresh/logout` 4종 라우트 + `resolveDevEmail()` → JWT 미들웨어 교체 + 클라이언트 토큰 저장·401 재시도 + 탭 경합 수정까지 완료(2026-07-16, 이 줄만 갱신이 안 돼 있던 걸 2026-07-18에 발견해 정정) — 남은 건 UX 1건(엣지 케이스)과 배포 후 하위호환 테스트뿐. **단, 로그인 UI가 아직 없어 실제로 서버에 로그인해서 쓸 방법은 없음** — 그 전까지는 `postQuickEntry` 등 서버 동기화가 전부 조용히 실패(로컬 저장은 정상 동작) |
| **`SECURITY-HARDENING`** | 🟡 진행중 (10/15) | 상시 보안 방어 **10/10 완료**(헤더·레이트 리미팅·bodyLimit·HSTS·토큰 길이·환경변수·`npm audit`·전역 에러 핸들러·429 안내·schedule 스키마), 배포 전 체크리스트 5개는 전부 배포 환경 접근이 필요해 대기 |
| **`DATA-INTEGRITY`** | 🟡 진행중 (1/10) | `DELETE /v1/entries/:id` 소프트 삭제 구현(`deleted` 필드 사용, `body` 불변 유지, 2026-07-13). 삭제 UI·회원 탈퇴 정책 등 나머지 9개는 대기 |
| **`SYNC-LIVE` — 서버 동기화 (실 사용자 연결)** | 🟡 진행중 (2/10) | 로그아웃/재로그인 시 로컬 데이터 무효화(`session.ts`, 2026-07-13) + `X-Dev-Email` → `Authorization: Bearer` 교체(`remindApi.ts`, 2026-07-15에 완료됐으나 이 줄만 뒤늦게 반영). **`GET /v1/entries`(목록 조회)가 체크리스트에 없던 걸 2026-07-16에 신규 항목으로 추가** — 이게 없으면 모아보기는 서버 데이터를 영영 못 봄. `updatedAt` 증분 동기화는 별도 항목으로 분리해 필요성이 확인될 때까지 보류(2026-07-18). 나머지 8개 대기 |
| **`AI-PIPELINE`** | 🔴 스텁만 | BullMQ + LLM 연동 없음 |
| **`PUSH-NOTIFICATION`** | 🔴 미완 | DB 테이블만 존재 |
| **`NATIVE-APP`** | 🔴 미착수 | README 플레이스홀더만 |
| `TESTING` | 🟡 시작 | 서버 `vitest` 도입, 소프트 삭제 라우트 5개 케이스만 커버(2026-07-13). 자동화 우선순위·재검토 근거는 [자동화 커버리지 현황](#자동화-커버리지-현황-아티팩트-연동) 참고. 프론트엔드·나머지 라우트는 아직 없음 |

---

## 진행 현황 목록 (위험도 우선순위)

### 🔴 Critical — 미완 시 프로덕션 배포 불가

| 태그 | 항목 | 파일·위치 | 완료 기준 | 왜 PM이 신경 써야 하는가 |
|---|------|-----------|-----------|-----------|
| `AUTH-SERVER` | **JWT 인증 구현** (서버) | `server/src/app.ts` → `resolveDevEmail()` 교체 | 실 유저 토큰 발급·검증, `ALLOW_DEV_AUTH` 플래그 제거 | 지금은 서버가 "가짜 개발용 이메일"로만 동작합니다 — 이 상태로는 실사용자를 단 한 명도 받을 수 없어 **출시 자체가 불가능**합니다 |
| `AUTH-API` | **회원가입 / 로그인 API** | `server/src/` 신규 라우트 | `POST /v1/auth/signup`, `POST /v1/auth/login`, 리프레시 토큰 | 사용자가 "내 계정"을 만들 방법이 없으면 여러 기기에서 기록을 이어볼 수 없습니다 — 지금 앱은 사실상 기기 하나에 갇힌 메모장입니다 |
| `AUTH-CLIENT` | **클라이언트 인증 플로우** | `src/app/lib/remindApi.ts` | Bearer 토큰 저장·갱신·만료 처리 | API만 있고 이게 없으면 로그인이 수시로 풀리거나 앱을 쓰다 갑자기 로그아웃되는 경험을 하게 됩니다 — 첫인상에서 신뢰를 잃는 지점 |
| `SECURITY-HARDENING` | **서버 보안 강화** | `server/src/app.ts`, `server/package.json` | 상시 보안 방어(코드) + 배포 전 체크리스트(배포 환경) 둘 다 완료 | 이게 없으면 악의적 트래픽에 서버가 다운되거나, 에러 메시지를 통해 내부 정보(DB 구조 등)가 새어나갈 수 있습니다 — 장애·평판 리스크 |

근거: [부록 A](#부록-a--저장-흐름-병목-auth-근거) — `server/src/index.ts:106-141` DB 왕복 2회 문제. 실행용 상세 체크리스트: [부록 C](#부록-c--남은-마일스톤-실행-체크리스트).

---

### 🟠 High — 사용자 경험을 직접 깨는 문제

| 태그 | 항목 | 파일·위치 | 완료 기준 | 왜 PM이 신경 써야 하는가 |
|---|------|-----------|-----------|-----------|
| `EMPTY-UI` | **피드 빈 상태 UX** | `src/app/feed/page.tsx` | 기록 0건일 때 샘플 데이터 대신 빈 상태 화면 + 안내 문구 | 신규 가입자가 첫 화면에서 "가짜 샘플"을 보고 자기 기록으로 착각하거나, 왜 데이터가 있는지 혼란스러워할 수 있습니다 — 첫 경험(온보딩)에 직접 영향 |
| `PROFILE-UI` | **Red UI 교체 — 마이페이지** | `src/app/my/page.tsx` | `MyProfileCard`, `SettingsSection` 구현 (Figma 설계 후) | 지금은 빨간 placeholder 박스가 그대로 보입니다 — 사용자에게 "미완성 제품"이라는 인상을 직접적으로 줍니다 |
| `EDITOR-UI` | **Red UI 교체 — 편집 오버레이** | `src/app/page.tsx` 편집 오버레이 | `RecordEditStatusBar`, `RecordEditToolbar` 구현; `IosKeyboardMock` 제거(네이티브 이전 시) | 기록 작성은 앱의 핵심 행동입니다 — 그 화면에 미완성 placeholder가 보이면 가장 자주, 가장 중요한 순간에 신뢰를 잃습니다 |
| `DATA-INTEGRITY` | **데이터 삭제·무결성 보장** | `server/src/app.ts`, `server/prisma/schema.prisma` | 삭제 엔드포인트 구현(✓ 2026-07-13), `body` 불변성 코드로 강제, 백업 복구 1회 검증 | 사용자가 쓴 기록이 실수로 사라지거나 바뀌면 "내 기록을 믿고 맡길 수 있는 앱"이라는 이 제품의 존재 이유 자체가 무너집니다. 백업 미검증 상태에서 장애가 나면 전체 사용자 데이터를 통째로 잃을 수 있습니다 |

> ~~`SAVE-GUARD`~~, ~~`SAVE-ERROR-TOAST`~~ — **이미 완료돼 있었음.** 위 [현재 위치](#현재-위치-전체-프로세스-기준) 표로 이동.

컴포넌트 후보 상세: [부록 B](#부록-b--red-ui-컴포넌트-후보-표-profile-ui-editor-ui-근거). `EMPTY-UI`, `DATA-INTEGRITY` 실행용 상세 체크리스트: [부록 C](#부록-c--남은-마일스톤-실행-체크리스트).

---

### 🟡 Medium — 핵심 기능이나 단기 차단 없음

| 태그 | 항목 | 파일·위치 | 완료 기준 | 왜 PM이 신경 써야 하는가 |
|---|------|-----------|-----------|-----------|
| `ACCESSIBILITY` | **접근성(a11y) 최소 세트** | 홈·피드·마이 전반 | 편집 오버레이 포커스 트랩, Lighthouse Accessibility 통과 | 시각·운동 장애가 있는 잠재 사용자를 처음부터 배제하게 됩니다. 일부 시장·B2B 채널에서는 접근성이 법적/계약 요건이기도 합니다 |
| `SYNC-LIVE` | **서버 동기화 활성화** | `src/app/lib/remindApi.ts` | `AUTH` 완료 후 Bearer 토큰으로 실 서버 동기화 | 로그인 기능을 다 만들어도, 로그인 후 기기 간 기록이 안 보이면 "왜 로그인했지?"라는 의문만 남습니다 — `AUTH` 투자의 실제 효용이 여기서 결정됩니다 |
| `AI-PIPELINE` | **AI 파이프라인 구현** | `server/src/jobs/ai-queue.ts` | BullMQ + Redis 워커, LLM 연동 (Claude/GPT), `AiArtifact` 저장 | 이 제품을 "그냥 메모 앱"과 구분 짓는 핵심 차별화 요소입니다 — 없으면 회고/요약이라는 제품의 약속을 지킬 수 없습니다 |
| `REFLECTION-UI` | **회고 카드 UI** | `src/app/feed/` 또는 신규 화면 | `AiArtifact` 데이터 피드에 노출 ([first-launch.md](./first-launch.md) 08 참고) | AI 파이프라인을 완성해도 사용자가 결과를 볼 화면이 없으면 그 투자 효과를 사용자가 전혀 체감하지 못합니다 |

`ACCESSIBILITY`, `SYNC-LIVE` 실행용 상세 체크리스트: [부록 C](#부록-c--남은-마일스톤-실행-체크리스트).

> ~~`SYNC`(오프라인 동기화 큐)~~ — **2026-07-11 완료.** `recordsStore.ts`의 `synced` 필드 + `getUnsyncedRecords()`/`markRecordSynced()`, `remindApi.ts`의 `syncPendingRecords()`(앱 시작·`online` 이벤트 시 재시도), 서버 `clientMutationId` 멱등 upsert까지 구현됨. 위 [현재 위치](#현재-위치-전체-프로세스-기준) 표로 이동, 코드 레벨 상세는 [부록 A](#부록-a--저장-흐름-병목-auth-근거) 참고.

---

### 🟢 Low — 품질·확장성 개선 (필수 경로 아님)

| 태그 | 항목 | 파일·위치 | 완료 기준 | 왜 PM이 신경 써야 하는가 |
|---|------|-----------|-----------|-----------|
| `TESTING` | **유닛·통합 테스트** | `src/`, `server/src/` | `recordsStore`, API 라우트 핵심 함수 커버리지 | 지금은 기능이 늘어날 때마다 사람이 수동으로 전부 재확인해야 합니다 — 팀·기능이 커질수록 회귀 버그가 사용자에게 먼저 발견될 위험이 커집니다 |
| `ERROR-TRACKING` | **에러 추적 (Sentry)** | Next + Fastify 공통 | 프로덕션 에러 자동 수집 | 실사용자에게 장애가 나도 우리가 먼저 알 방법이 없습니다 — 사용자 항의가 들어오고 나서야 문제를 알게 됩니다 |
| `PUSH-NOTIFICATION` | **푸시 알림 연동** | `server/src/` 신규 잡 | APNs/FCM 실 발송, `DevicePushToken` 활용 | "매일 기록하는 습관"이 이 앱의 핵심 가치인데, 리마인더가 실제로 도달하지 않으면 그 습관 형성 목표를 달성할 방법이 없습니다 |
| `NATIVE-APP` | **네이티브 앱 착수 (Expo)** | `native/` | Expo 프로젝트 초기화, 웹 API 재활용 | 웹만으로는 홈 화면 위젯·안정적인 푸시 등 네이티브 고유 경험을 제공할 수 없습니다 — 아래 `WIDGET`을 포함한 리텐션 전략 전체의 전제 조건 |
| `WIDGET` | **홈 화면 위젯 (1.1)** | `native/` | iOS WidgetKit / Android App Widget | 앱을 열지 않고도 기록을 유도하는 가장 강력한 습관 트리거입니다 — `NATIVE-APP` 없이는 시작할 수 없는 후속 작업 |
| `STORYBOOK-DEPLOY` | **Storybook 배포** | CI/CD | 컴포넌트 문서 외부 공유 가능 상태 | 지금은 디자이너·PM이 화면 상태를 확인하려면 매번 개발자에게 캡처를 요청해야 합니다 — 협업 속도에 작은 마찰이 계속 쌓입니다 |

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

> **2026-07-16 갱신**: 실제 코드 조사 결과를 바탕으로 우선순위를 다시 매겨 4건 완료 — `body` 불변성 코드 가드(Prisma Extension), DB 백업 스크립트, 계정 삭제 보유기간 정책 결정(개인정보처리방침과 동일하게 30일). 조사 중 확인된 사실: 서버에 `GET /v1/entries`(목록 조회) 자체가 없고 클라이언트에도 삭제 UI/`deleted` 필드가 없어 "소프트 삭제 필터링 검증" 항목은 지금은 검증 대상이 존재하지 않음(버그 아니라 미구현) — 그래서 이번 라운드에서 제외.
> 2026-07-13: `JournalEntry.deleted`를 실제로 세팅하는 소프트 삭제 엔드포인트(`DELETE /v1/entries/:id`)를 구현했습니다(아래 표 1번째 행).

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | `JournalEntry` 삭제 엔드포인트 구현 — 기존 `deleted` 필드를 실제로 사용하는 soft delete부터. **→ PM 참고:** "삭제"는 즉시 파기가 아니라 플래그만 바꾸는 소프트 삭제이고, 일기 본문(`body`)은 삭제 처리 중에도 절대 건드리지 않습니다 | 상 | ☑ 완료 (2026-07-13) — `DELETE /v1/entries/:id`(`server/src/app.ts`). 소유권 검증(다른 사용자 소유면 404), 이미 삭제된 건 재호출해도 멱등하게 200. `body`는 절대 건드리지 않음. `server/src/app.test.ts` 5개 케이스(401/404/삭제 성공+body 불변/소유권/멱등)로 검증 완료(`npm --prefix server test`) |
| 기능 | 클라이언트(피드·마이)에 기록 삭제 UI 추가, 삭제 요청이 로컬(`recordsStore`)과 서버 양쪽에 반영되는지 확인 | 상 | ☐ 대기 |
| 기능 | 계정 삭제(회원 탈퇴) 시 관련 데이터(엔트리·AI 산출물·푸시 토큰) 처리 정책 결정 — 즉시 삭제 vs 유예 기간. **→ PM 참고:** 탈퇴해도 데이터가 30일간 남아있다는 뜻입니다 — "탈퇴하면 즉시 완전 삭제"라고 고객 응대·약관에 안내하면 안 됩니다 | 중 | ☑ 완료 (2026-07-16) — 유예 기간 방식으로 결정: 탈퇴 시점에 소프트 삭제 처리 후 **30일간 부정이용 방지 목적 보관, 이후 완전 파기**. [개인정보처리방침](../docs/README.md) 제3조에 동일하게 반영됨. 실제 회원 탈퇴 엔드포인트·파기 배치 작업은 아직 미구현(회원 탈퇴 기능 자체가 없음) — 이번 항목은 정책 결정만, 구현은 별도 작업으로 분리 |
| 기능 | 데이터 내보내기(export) — 사용자가 자기 기록을 JSON/텍스트로 받아가는 최소 기능 | 중 | ☐ 대기 |
| UX | 삭제는 되돌릴 수 없다는 걸 명확히 안내 (확인 다이얼로그) — 실수 삭제 방지. **→ PM 참고:** 카피·문구 결정이 필요한 항목입니다 — 위 "30일 유예" 정책과 문구가 어긋나지 않게(사용자에게 "즉시 삭제"로 오해시키지 않게) 같이 검토해야 합니다 | 상 | ☐ 대기 |
| 데이터 | `JournalEntry.body`가 생성 후 절대 수정되지 않도록 코드로 강제 (update 라우트가 생길 때 `body` 필드만 막는 가드 또는 Prisma 미들웨어). **→ PM 참고:** "일기 수정" 기능은 이 제품에 앞으로도 없다는 제품 제약을 코드가 강제합니다 — 나중에 "글 수정 기능 추가해달라"는 요청이 오면 정책 자체를 먼저 재검토해야 합니다 | 상 | ☑ 완료 (2026-07-16) — `server/src/prismaGuards.ts`의 `withAppendOnlyGuard()`. Prisma Client Extension으로 `journalEntry.update`/`updateMany`/`upsert`의 `data`에 `body`가 섞이면 즉시 throw. 조사 결과 지금은 위반하는 코드가 없었지만(실제 update는 `DELETE` 라우트의 `{deleted:true}` 하나뿐), 향후 실수 방지용 방어선으로 추가. 테스트 대역(fake Prisma)에는 `$extends`가 없어 프로덕션 클라이언트에만 적용. **정정(2026-07-18)**: 지금 당장 막아야 할 실제 결함이 아니라 선제적 방어선이었음 — 단, `body` 불변은 [CLAUDE.md §3-3](../CLAUDE.md)에 이미 확정된 정책이고 코드 15줄 남짓의 저비용 구현이라(가상 기능을 위한 설계가 아니라 기존 정책의 코드화) 되돌리지 않고 유지 |
| 데이터 | DB 백업/스냅샷이 실제로 설정돼 있고 복구 가능한지 1회 검증 — 지금은 [first-launch.md 03](./first-launch.md#03-백엔드-아키텍처)에 "권장"만 돼 있고 실행 확인 안 됨 | 상 | ☑ 완료 (2026-07-16) — 조사 결과 백업 관련 언급이 `server/README.md`·`docs/`·`railway.json` 어디에도 전혀 없었음(TODO로도 미기재). `server/scripts/backup-db.sh`·`restore-db.sh`(`npm run db:backup`/`db:restore`) 신규 작성, `backups/`는 `.gitignore` 처리. **Railway 매니지드 백업은 플랜에 따라 다르므로 대시보드에서 별도 확인 필요** — 이 스크립트는 그와 무관하게 항상 동작하는 독립적 방어선. 자동화(cron/GH Actions)는 아직 미연결, 수동 실행 단계 |
| 데이터 | `AiArtifact.entryId`가 `onDelete: SetNull`이라 엔트리 삭제 시 고아 아티팩트가 남을 수 있음 — 의도된 동작인지, 함께 정리할지 결정. **→ PM 참고:** 이건 코드 작업이 아니라 제품 결정이 먼저입니다 — 일기를 지워도 그 일기의 AI 요약은 남겨둘지(예: "이번 주 회고"에 흔적으로) 정해야 구현할 수 있습니다 | 중 | ☐ 대기 |
| 예외처리 | 소프트 삭제된 기록이 실제로 클라이언트 목록 조회·타임라인에서 빠지는지 (`deleted: true` 필터링 누락 방지) | 상 | ☐ 대기 |
| 예외처리 | 오프라인 상태에서 삭제 요청 시, 저장과 마찬가지로 재시도 큐(`SYNC`) 대상이 되는지 | 중 | ☐ 대기 |

### AUTH — 신규 서버 실사용자 인증 (JWT)

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | `POST /v1/auth/signup`, `/login`, `/refresh`, `/logout` 4종 라우트 구현. **→ PM 참고:** 탈취된 토큰이 재사용되면 그 계정의 모든 기기에서 한 번에 로그아웃됩니다(보안 조치) — "갑자기 로그아웃됐어요" 문의가 오면 원인 후보 중 하나입니다 | 상 | ☑ 완료 (2026-07-14) — `server/src/app.ts` + `server/src/auth.ts`. bcryptjs 해시, refresh token 회전(rotation) + 재사용 탐지(reuse detection). 전략은 [`auth-token-strategy.md`](./auth-token-strategy.md). `server/src/app.test.ts` 9개 케이스로 검증(signup claim/409/유효성, login 통합 실패 메시지, refresh 회전/재사용 차단, logout) |
| 기능 | `resolveDevEmail()` → JWT 검증 미들웨어로 교체, `ALLOW_DEV_AUTH` 플래그 완전 제거 | 상 | ☑ 완료 (2026-07-15) — `server/src/app.ts`의 `requireAuth` preHandler로 보호 라우트 4개 전부 교체. `index.ts`는 `ALLOW_DEV_AUTH` 대신 `JWT_SECRET` 필수 가드로 교체. `resolveDevEmail()` 함수 자체 삭제 |
| 기능 | 클라이언트 토큰 저장·자동 갱신 로직 (`remindApi.ts`) | 상 | ☑ 완료 (2026-07-15) — access token은 모듈 스코프 변수(메모리)에만 보관, `authedFetch()`가 토큰 없을 때 조용히 refresh 시도 + 401 시 refresh 1회 재시도 후 원요청 재시도. 동시 요청 시 refresh 중복 실행 방지(`refreshInFlight` 공유). `session.ts`의 `logout()`에 토큰 초기화 연결 |
| UX | 로그인 실패 메시지는 "이메일 또는 비밀번호가 올바르지 않습니다"로 통일 (계정 존재 여부를 노출하지 않음). **→ PM 참고:** 의도된 보안 설계입니다 — 고객지원·성장팀이 "이 이메일은 가입 안 되어있어요, 회원가입 하시겠어요?" 같은 안내를 하고 싶어도 로그인 화면에서는 계정 존재 여부를 알려줄 수 없습니다 | 상 | ☑ 완료 (2026-07-14) — `/v1/auth/login`에서 미가입 계정·오답 비밀번호 모두 동일 401 메시지. 타이밍 사이드채널 방지를 위해 미가입 계정도 더미 해시로 verify 수행(`dummyPasswordHash()`) |
| UX | 토큰 만료 시 조용히 로그인 화면으로 유도 (세션 끊김을 오류로 오해하지 않게). **→ PM 참고:** 이 흐름을 어떻게 설계하느냐가 사용자가 세션 끊김을 "에러 났다"로 느낄지 "그냥 다시 로그인하면 되네"로 느낄지를 가릅니다 — UX 카피·화면 결정이 필요합니다 | 중 | ☐ 대기 |
| 데이터 | 비밀번호는 Argon2/bcrypt 해시만 저장 — 평문 저장 코드가 어디에도 없는지 재확인 | 상 | ☑ 완료 (2026-07-13) — `password`/`비밀번호` 등으로 스키마·서버·클라이언트 전수 grep, 저장 코드 자체가 없음 확인(아직 signup 미구현이라 당연한 결과). 향후 구현 시 평문 저장을 막기 위해 [CLAUDE.md §5-1](../CLAUDE.md)에 "Argon2/bcrypt 해시로만 저장" 가드레일 규칙 신설 |
| 데이터 | JWT 시크릿은 `.env`에만 — `NEXT_PUBLIC_` 노출·커밋 여부 확인 (CLAUDE.md §5-1) | 상 | ☑ 완료 (2026-07-13) — `JWT_SECRET`/`jsonwebtoken` grep 결과 코드에 아직 없음(JWT 미구현) 확인, `NEXT_PUBLIC_*`는 API URL·dev 이메일뿐 확인, `.env`류 git 추적 없음 재확인. 향후 구현을 대비해 `server/.env.example`에 `JWT_SECRET` 플레이스홀더 + 경고 주석 추가, [CLAUDE.md §5-1](../CLAUDE.md)에 "`NEXT_PUBLIC_` 접두사 금지" 가드레일 규칙 신설 |
| 데이터 | 기존 `dev@local.invalid` 등 익명 계정에 쌓인 `JournalEntry`를 실사용자 계정으로 옮기는 마이그레이션 전략. **→ PM 참고:** 전략 문서만 있고 실행 여부는 아직 PM 결정 대기 상태입니다 — 개발 중 쌓인 테스트 데이터를 실사용자 계정으로 옮길지, 그냥 버릴지 정해야 다음 단계로 넘어갑니다 | 중 | ☑ 완료 (2026-07-13) — 전략 초안 작성: [`data-migration.md`](./data-migration.md). 로컬 미동기화 데이터 업로드(A)와 서버 dev-placeholder 재소유(B) 두 갈래로 분리, 실행 여부는 제품 결정 필요(문서 내 "열린 질문" 참고). 실제 마이그레이션 엔드포인트 구현은 JWT 도입 시점에 별도 작업 |
| 예외처리 | **오프라인 재시도 큐(`SYNC`)가 401(토큰 만료)을 받으면 무한 재시도에 빠지지 않는지** — 지금은 실패 원인 구분 없이 그냥 중단하는데, 401은 "토큰 갱신 시도 → 실패 시 재로그인 유도"로 별도 분기 필요. **→ PM 참고:** 토큰이 만료돼도 저장하려던 기록이 사라지지 않고 다음 재로그인 때 다시 시도됩니다 — 사용자는 "왜 세션 끊겼지?"만 겪을 뿐 데이터를 잃지는 않습니다 | 상 | ☑ 완료 (2026-07-15) — `remindApi.ts`의 `authedFetch()`가 401을 받으면 refresh를 정확히 1회만 시도(반복문 아님, 구조적으로 무한루프 불가). 그래도 실패하면 그대로 에러를 던지고 `syncPendingRecords()`가 이를 잡아 중단(다음 기회로 미룸) — 기존 "첫 실패 시 중단" 정책 재사용 |
| 예외처리 | 여러 탭에서 동시에 토큰 갱신 시 경합 (refresh rotation 사용 시 한쪽 refresh token이 무효화될 수 있음) | 중 | ☑ 완료 (2026-07-16) — `remindApi.ts`의 `refreshAccessToken()`을 Web Locks API(`navigator.locks.request`)로 감싸 탭 간 refresh 요청을 직렬화. 먼저 락을 잡은 탭의 요청·쿠키 회전이 끝난 뒤에야 다음 탭의 요청이 나가므로, 두 번째 탭은 이미 회전된 최신 쿠키로 자연스럽게 요청 — 재사용 탐지가 정상 동시 갱신을 공격으로 오인하는 경로 자체가 사라짐. `navigator.locks` 미지원 환경은 기존 동작(직렬화 없음)으로 폴백. **정정(2026-07-18)**: "이미 배포된 코드의 실제 결함"처럼 서술했지만, 실제로는 로그인 UI 자체가 아직 없어 지금 이 경합을 실제로 겪을 사용자가 없음 — 코드는 작고 정확해 유지하되, 긴급도는 실제보다 부풀려져 있었음(로그인 UI가 붙기 전에 미리 막아둔 방어선) |
| 예외처리 | 로그인 엔드포인트에 rate limiting (브루트포스 방어) | 상 | ☑ 완료 (2026-07-14) — `/v1/auth/login`에 `@fastify/rate-limit` 라우트별 오버라이드로 5req/분 적용(전역 100req/분보다 낮음) |
| 예외처리 | 토큰은 XSS에 안전한 저장소 사용 (`httpOnly` 쿠키 권장, `localStorage` 노출 위험 검토) | 상 | ☑ 완료 (2026-07-14) — 결정 및 서버 구현: access token은 응답 바디로만(클라이언트는 메모리 보관 예정), refresh token은 `httpOnly; Secure(prod); SameSite=Lax` 쿠키(웹) + 바디(네이티브 대비) 병행. 상세: [`auth-token-strategy.md`](./auth-token-strategy.md). 클라이언트(`remindApi.ts`)의 메모리 보관·자동 갱신 로직은 아직 대기(§AUTH-CLIENT) |
| 예외처리 | 배포 시점에 이미 로컬 큐에 쌓여있던 미동기화 기록이 새 인증 체계에서도 정상 전송되는지 하위호환 테스트 | 중 | ☐ 대기 |

### SECURITY-HARDENING — 서버 보안 강화

> 로그인 자체의 브루트포스 방어는 `AUTH` 체크리스트에 있고, 여기는 그 **바깥의 나머지 공개 엔드포인트**를 다룹니다. **2026-07-11부터 두 섹션으로 분리 관리**: 코드베이스에 항상 적용돼야 하는 [상시 보안 방어](#상시-보안-방어)와, 실제 배포 환경에서만 검증 가능한 [배포 전 체크리스트](#배포-전-체크리스트). 진행률은 두 섹션을 합산해 위 [WBS 표의 공격방어 축](#wbs--무엇을-왜-그-순서로-진행했나)에 반영됩니다.

#### 상시 보안 방어

코드 리뷰·로컬 실행만으로 확인·구현 가능한 항목. 커밋될 때마다 유효한 상태를 유지해야 합니다.

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | Fastify에 보안 헤더 미들웨어 추가 (`@fastify/helmet` 등 — CSP, X-Frame-Options, X-Content-Type-Options) | 상 | ☑ 완료 (2026-07-11) — `@fastify/helmet` 등록(JSON API라 CSP는 비활성). `/health` 응답에 `X-Frame-Options`·`X-Content-Type-Options`·`Strict-Transport-Security` 등 확인 |
| 기능 | `POST /v1/entries/quick`, `/v1/reminders`, `/v1/push-tokens`에 레이트 리미팅 추가 (`@fastify/rate-limit` 등) — 인증 붙기 전에도 스팸·DoS 방어 필요 | 상 | ☑ 완료 (2026-07-11) — `@fastify/rate-limit` 글로벌 등록(100req/분). 응답 헤더 `x-ratelimit-*` 확인. 로그인 전용 더 낮은 한도는 `AUTH` 구현 시 별도 |
| 기능 | Fastify `bodyLimit` 명시적으로 설정 (기본값 의존하지 않기) | 중 | ☑ 완료 (2026-07-11) — `Fastify({ bodyLimit: 1024*1024 })`로 1MB 명시 |
| 기능 | **[에러 응답 보안]** Global Error Handler(`app.setErrorHandler()`)로 에러 응답 본문에 서버 내부 스택 트레이스·DB 쿼리 문구가 노출되지 않도록 처리. **→ PM 참고:** 서버에 예상 못한 에러가 나도 사용자에게는 "다시 시도해 주세요" 같은 일반 메시지만 보입니다 — DB 구조 같은 내부 정보가 화면에 노출될 걱정은 없습니다 | 상 | ☑ 완료 (2026-07-16) — `server/src/app.ts`의 `app.setErrorHandler()`. `statusCode >= 500`(Prisma 예외 등 uncaught)은 항상 `{error:"internal_server_error"}`만 반환하고 원본은 서버 로그에만 기록. `@fastify/rate-limit` 같은 4xx 플러그인 에러는 사용자용 메시지를 그대로 통과. `server/src/app.test.ts` 2개 케이스로 검증(원본 메시지 응답에 없음 확인 + 429 메시지 통과 확인) |
| UX | 레이트 리밋 초과 시 사용자에게 명확한 안내(429) — 그냥 저장 실패로만 보이지 않게. **→ PM 참고:** 짧은 시간에 요청을 너무 많이 보내면 "몇 초 후 다시 시도해 주세요"라고 구체적으로 안내됩니다 — 이전엔 이유 없이 그냥 실패한 것처럼 보였습니다 | 중 | ☑ 완료 (2026-07-16) — `@fastify/rate-limit`의 `errorResponseBuilder`로 `{error:"rate_limited", message, retryAfterMs}` 형태 응답. 위 에러 핸들러 작업과 함께 구현(같은 커밋) |
| 데이터 | `ReminderSpec.schedule`(현재 `z.unknown()`, 크기 제한 없음) 스키마 검증 강화 또는 최소 크기 제한. **→ PM 참고:** 리마인더 기능의 실제 데이터 형태(매일 몇 시, 요일 반복 등)는 아직 정의돼 있지 않습니다 — 리마인더 설정 UI/제품 스펙이 나오기 전까지는 착수할 수 없는 항목입니다 | 중 | ☑ 완료 (2026-07-16, 2026-07-18 재수정) — 최초엔 `daily`/`weekly`/`cron` 3종 discriminated union으로 교체했으나, **리마인더 UI가 없는 상태에서 존재하지 않는 기능의 필드 구조를 임의로 설계한 과잉 작업**이었음(2026-07-18 자체 감사에서 발견, [PM 관점] 참고). `z.unknown().refine(직렬화 2000자 이하)`로 되돌려 원래 목적인 DoS 방지(무제한 blob 저장 차단)만 남김. `src/types/journal.ts`도 원래 타입이던 `Record<string, unknown>`으로 원복. 테스트 2건(거대 blob 거부/2000자 이내 임의 형태 허용)으로 축소 |
| 데이터 | `DevicePushToken.token`에 길이 제한(`.max()`) 추가 | 하 | ☑ 완료 (2026-07-11) — `z.string().min(1).max(512)`로 상한 |
| 데이터 | 환경변수 재감사 — `OPENWEATHERMAP_API_KEY`, `KAKAO_REST_API_KEY`, `DATABASE_URL` 등이 `.env`/`.env.local`에만 있고 커밋된 적 없는지 확인 (CLAUDE.md §5-1) | 상 | ☑ 완료 (2026-07-11) — `git ls-files`로 `.env`류 추적 없음, 소스 내 하드코딩 키 없음, `NEXT_PUBLIC_*`는 URL·dev 이메일뿐(시크릿 아님) 확인 |
| 데이터 | 의존성 취약점 점검 (`npm audit` 등), `package-lock.json` 최신 유지 | 중 | ☑ 완료 (2026-07-11) — `npm audit fix`로 high 6건 해결(defu, effect/@prisma, fast-uri, fastify). 남은 1건(esbuild, low, Windows 전용 dev 서버 이슈)은 위험 낮아 보류 |
| 예외처리 | **[통신 보안]** 모든 통신이 HTTPS로 이루어지도록 강제하는 HSTS 헤더 설정 | 상 | ☑ 완료 (2026-07-11) — `@fastify/helmet` 기본값에 이미 포함되어 있었음. `/health` 응답에서 `Strict-Transport-Security: max-age=31536000; includeSubDomains` 확인됨(추가 작업 불필요, 헤더 자체만 완료 — 실제 프로덕션에서 유효 적용되는지는 [배포 전 체크리스트](#배포-전-체크리스트) 참고) |

#### 배포 전 체크리스트

**실제 배포 환경에서만** 검증 가능한 항목 — 로컬에서는 확인할 수 없으므로 매 배포 직후 반드시 수행. 순서는 아래 [배포 보안 체크 워크플로우](#배포-보안-체크-워크플로우) 참고.

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 예외처리 | 프로덕션 배포 시 `CORS_ORIGIN`이 실제로 설정돼 있는지 — 기본값(모든 오리진 차단)으로 방치되지 않았는지 배포 전 확인 | 상 | ☐ 대기 — 실제 배포 환경 접근이 필요해 지금은 검증 불가 |
| 예외처리 | `JWT_SECRET` 필수 가드(구 `ALLOW_DEV_AUTH`)가 실제 배포 환경(Railway 등)에서도 의도대로 작동하는지 배포 후 1회 검증 | 중 | ☐ 대기 — 실제 배포 환경 접근이 필요해 지금은 검증 불가. 2026-07-16: `ALLOW_DEV_AUTH`/`resolveDevEmail()` 자체가 코드에서 완전히 삭제되고 `JWT_SECRET` 미설정 시 `process.exit(1)`하는 가드로 교체됨(`server/src/index.ts`) — 항목 문구만 갱신, 배포 후 검증은 여전히 필요 |
| 예외처리 | 서버 로그 레벨·설정이 프로덕션에 적합한지 점검 (`Fastify({ logger: true })` 기본 설정이 과도하게 verbose하지 않은지) | 중 | ☐ 대기 — 실제 배포 환경 접근이 필요해 지금은 검증 불가 |
| 예외처리 | **[로그 샘플링 테스트]** 배포 직후 프로덕션 로그를 직접 열어 실제 사용자의 민감 정보(이메일, 본문 등)가 마스킹되어 기록되는지 샘플링 테스트 수행 | 상 | ☐ 대기 — 코드 확인 결과 현재 `req.body`나 이메일을 명시적으로 로깅하는 코드는 없음(Fastify 기본 로거는 method/url/statusCode만 기록, body·헤더 미포함). 그래도 실사용자 데이터가 흐르기 시작하면 배포 직후 1회 실제 로그로 재확인 필요 |
| 예외처리 | HSTS 헤더가 실제 프로덕션 HTTPS 응답에도 정상 적용되는지 확인 (Railway 등 TLS 종료 프록시 구조에서 `trustProxy` 설정이 필요한지 포함) | 중 | ☐ 대기 — 실제 배포 환경 접근이 필요해 지금은 검증 불가 |

#### 배포 보안 체크 워크플로우

배포할 때마다 이 순서로 확인합니다. [배포 전 체크리스트](#배포-전-체크리스트) 5개 항목이 이 3단계 안에 다 들어갑니다.

1. **접근 제어 확인** — 서버가 뜬 직후 바로: `JWT_SECRET` 미설정 가드(구 `ALLOW_DEV_AUTH`)가 실제로 서버를 막았는지/통과시켰는지, `CORS_ORIGIN`이 운영 도메인으로 제대로 설정됐는지 확인.
2. **통신 보안 확인** — 배포된 URL에 `curl -I`로 응답 헤더를 직접 확인: `Strict-Transport-Security`가 찍히는지, 프록시(Railway 등) 뒤에서도 유효한지.
3. **로그 확인** — 실사용자 요청이 몇 건 쌓인 뒤: 로그 레벨이 과도하게 verbose하지 않은지, 실제 로그 샘플에 이메일·본문 같은 민감정보가 그대로 찍히지 않는지 직접 열어서 확인.

### SYNC-LIVE — 서버 동기화 활성화 (실사용자 연결)

| 구분 | 체크 항목 | 중요도 | 완료 여부 |
|---|---|---|---|
| 기능 | `remindApi.ts`의 `X-Dev-Email` 헤더 → `Authorization: Bearer` 교체 | 상 | ☑ 완료 (2026-07-15) — `AUTH` 마일스톤 "클라이언트 토큰 저장·자동 갱신" 작업의 일부로 이미 완료. `remindApi.ts`에서 `X-Dev-Email`·`getCurrentIdentity()` 참조 완전 삭제, `authedFetch()`가 `Authorization: Bearer`만 사용. 같은 변경이 `AUTH` 섹션에는 반영됐지만 이 줄은 갱신이 안 돼 있던 걸 2026-07-16에 발견해 정정 |
| 기능 | **`GET /v1/entries` 목록 조회 엔드포인트 구현** (신규 항목, 2026-07-16 추가) — 인증된 사용자의 `JournalEntry` 목록을 `deleted:false`만 필터링해 반환. 지금까지 서버엔 생성(`POST .../quick`)·삭제(`DELETE .../:id`)만 있고 **조회 자체가 아예 없어서** 모아보기가 로컬 데이터만 볼 수 있는 근본 원인. 나머지 SYNC-LIVE 항목(온보딩 업로드, 병합 전략 등) 대부분이 이 라우트를 전제로 함 | 상 | ☐ 대기 |
| 데이터 | `updatedAt` 기반 증분 동기화(`?since=`) 지원 (2026-07-17 추가, 2026-07-18 재분류) — `JournalEntry.updatedAt`은 스키마에 이미 있고 Prisma가 자동 관리하지만, 실제로 이 값을 읽어 쓰는 코드가 어디에도 없음. **정정**: 애초 "처음부터 만들어야 재작업이 없다"는 논리 자체가 검증되지 않은 미래 최적화였음 — 사용자 1명당 엔트리 수가 적은 지금은 `GET /v1/entries`가 전체를 반환해도 성능 문제가 없고, 실제로 몇백~몇천 건이 쌓여 필요성이 확인된 뒤에 착수해도 늦지 않음. 아래 `GET /v1/entries`(전체 목록)와 분리해 우선순위를 낮춤 | 중 (필요성 확인 전 착수 보류) | ☐ 대기 |
| 기능 | 비로그인 상태에서도 로컬 전용 모드를 유지할지 정책 결정. **→ PM 참고:** 로그인을 강제할지, 로그인 없이도 계속 쓸 수 있게 둘지는 순수 제품 결정입니다 — 이게 정해져야 온보딩·가입 유도 전략을 짤 수 있습니다 | 중 | ☐ 대기 |
| UX | 로그인 유도 시점 설계 (첫 실행 vs 특정 액션 시). **→ PM 참고:** "처음 앱을 열자마자 로그인 요구" vs "몇 번 써보고 나서 유도"는 가입 전환율에 직접 영향을 주는 제품 설계 결정입니다 | 중 | ☐ 대기 |
| UX | 기존 로컬 전용 기록을 로그인 시 서버로 일괄 업로드하는 온보딩 흐름. **→ PM 참고:** 로그인 전에 이미 로컬에 쓴 기록이 로그인하는 순간 사라지는지, 자동으로 서버에 올라가는지가 여기서 결정됩니다 — 사용자가 가장 불안해할 수 있는 지점(내 기록이 없어지는 건 아닌지)입니다 | 중 | ☐ 대기 |
| 데이터 | 로컬 `StoredRecord` ↔ 서버 `JournalEntry` 최초 동기화 병합 전략 (다중 기기 사용 시 충돌 가능성) | 상 | ☐ 대기 — 단일 기기(로컬 전용 데이터 업로드) 케이스는 [`data-migration.md` §2](./data-migration.md)에 API 레벨로 이미 구체화돼 있음. **다중 기기 충돌은 같은 문서 §5의 "열린 질문"으로 명시된 미해결 제품 결정 사항** — 코드 작업이 아니라 먼저 정책 결정이 필요. **→ PM 참고:** 폰과 웹에서 각각 기록을 쓰고 나중에 로그인해서 합칠 때 어느 쪽을 우선할지(둘 다 보존? 최신 것만?) 결정해야 개발이 가능합니다 |
| 데이터 | 대량 초기 업로드에도 기존 `clientMutationId` 멱등 처리(`SYNC`)가 그대로 재사용되는지 확인 | 중 | ☐ 대기 |
| 예외처리 | 대량 업로드 중 일부 실패 시 전체 롤백 대신 실패 건만 재시도 큐에 남기기. **→ PM 참고:** 온보딩 업로드 중 일부가 실패해도 나머지 기록은 안전하게 저장된다는 뜻입니다 — "업로드 중 하나라도 실패하면 전부 날아간다"는 최악의 시나리오를 막는 항목입니다 | 상 | ☐ 대기 |
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
