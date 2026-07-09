# 모바일 스택·위젯 전략 (결정)

## 권장 스택

**React Native + Expo (prebuild / development builds)**  

- JS/TS 생태계와 기존 디자인 토큰(JSON) 공유가 쉬움.  
- **위젯·Share Extension·푸시**는 네이티브 타깃이 필요 → Expo **Config Plugin** 또는 **bare** 브리지로 확장.

## 위젯 전략

| 플랫폼 | 접근 | 비고 |
|--------|------|------|
| iOS | WidgetKit **별도 Extension** 타깃 | App Group + 동일 API로 동기화 |
| Android | `AppWidgetProvider` + RemoteViews | 데이터는 API + 로컬 캐시 |

Expo만으로 위젯을 “완전 관리형”으로 쓰기 어렵기 때문에, **초기부터 prebuild**로 네이티브 폴더를 열어두고, 위젯 모듈을 **단계적으로 추가**하는 것을 권장.

## Flutter 대안

팀이 Dart에 강하면 Flutter도 가능. 위젯/푸시 패턴은 동일하게 **네이티브 모듈**이 필요.

## 상태

- **권장안: Expo prebuild + 네이티브 확장** (세부 버전은 `native/` 앱 생성 시 `package.json`에 고정).

---

## 구현 이력 (레포 동기화)

웹 레퍼런스 앱과 네이티브 이전 시 맞출 포인트. (최신이 위.)

### 2025-03-24

- **위치·날씨 (웹):** `navigator.geolocation` + 서버 프록시 `GET /api/weather` (키는 서버 env만). 크롬은 HTTPS/localhost에서 권한 필요.
- **네이티브 이전 시:** iOS/Android 각각 위치 권한·백그라운드 정책, 위젯에서는 좌표 캐시 또는 짧은 API 호출으로 동일 스냅샷(`StoredWeatherSnapshot` 형태)을 맞추면 `POST /v1/entries/quick`과 호환 가능.
