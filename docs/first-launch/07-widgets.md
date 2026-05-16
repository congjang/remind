# 위젯·빠른 기록 (1.1 권장)

## iOS

- **WidgetKit** Extension (앱 본체와 별도 타깃).
- **App Group**에 최소 메타데이터 캐시 + 필요 시 API 동기화.
- **Share Extension**: 다른 앱에서 공유 → 동일 API.

## Android

- **AppWidget** + `RemoteViews`.
- 백그라운드 제약 고려 → **짧은 입력은 API로 즉시 전송**, 실패 시 큐.

## API

- `POST /v1/entries/quick` — 짧은 본문, `source: widget|share|notification`.
- **선택 필드 `weather`:** 앱 기록하기와 동일 스키마 (`location`, `temp`, `extra`, `icon`, 선택 `weatherId`) — 위젯에서 날씨를 알고 있으면 함께 보내 서버·로컬과 정합.

네이티브 앱 폴더는 [native/README.md](../../native/README.md).

---

## 구현 이력 (레포 동기화)

퀵 엔트리 계약. (최신이 위.)

### 2025-03-24

- **본문 스키마 확장:** `POST /v1/entries/quick`에 **`weather` 선택** 추가 (웹 `postQuickEntry`와 동일). 위젯/공유 진입점에서 향후 동일 필드 사용 가능.
