# AI 파이프라인 (보존형)

## 원칙

1. **원문(`JournalEntry.body`)은 항상 DB에 유지** — AI는 삭제/대체 권한 없음.
2. **산출물은 `AiArtifact`** (`kind`: `summary` | `weekly_stats` | `reflection_card` 등).
3. **옵트인**: 설정에서 “AI 분석 허용” 후에만 LLM 호출.
4. **재시도**: 큐 실패 시 exponential backoff; 사용자에게 “처리 중/실패” 상태.

## 흐름

1. `JournalEntry` 생성/수정 → `enqueueAiJob({ entryId, kind })`.
2. Worker가 LLM 호출 → 결과를 `AiArtifact`에 저장 (`model`, `promptVersion` 기록).
3. 클라이언트는 API로 아티팩트만 조회.

## 구현 참고

- 스텁: [server/src/jobs/ai-queue.ts](../../server/src/jobs/ai-queue.ts)
- 환경 변수: `OPENAI_API_KEY` 등 (서버 전용, 클라이언트에 넣지 않음)

---

## 구현 이력 (레포 동기화)

AI 원칙과의 관계만 기록. (최신이 위.)

### 2025-03-24

- **날씨 메타데이터** (`JournalEntry.weather`, 로컬 `StoredRecord.weather`)는 **원문 `body`와 분리**된 스냅샷이며, AI가 원문을 대체하지 않는다는 원칙과 충돌 없음. 향후 프롬프트에 “당시 날씨”를 넣을지는 옵트인 정책에서 별도 결정.
