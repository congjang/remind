# Design Tokens Runbook (Figma plugin JSON)

## Source of truth

- Export source: Figma plugin JSON
- Input file: `variable_plugin_JSON/tokens.json`

플러그인에서 최신 JSON을 export한 뒤, 위 파일을 덮어씁니다.

## Build commands

```bash
# Global(css package)만 갱신
npm run tokens:plugin:build:global-css

# Remind semantic만 갱신
npm run tokens:plugin:build:semantic-css

# 둘 다 갱신
npm run tokens:plugin:build:css
```

## Generated outputs

- Global outputs:
  - `../adailyrecord-design-tokens/css/design-tokens.css`
  - `../adailyrecord-design-tokens/css/grid.css`
- Remind semantic output:
  - `src/app/design-tokens/semantic.css`

## Recommended workflow

1. Figma plugin에서 전체 변수 JSON export
2. `variable_plugin_JSON/tokens.json` 덮어쓰기
3. 변경 범위에 맞는 빌드 명령 실행
4. 결과 CSS diff 확인 후 커밋

## Commit guideline

토큰 변경 커밋에는 아래를 함께 포함하는 것을 권장합니다.

- Input JSON: `variable_plugin_JSON/tokens.json`
- Generated CSS:
  - `src/app/design-tokens/semantic.css`
  - `../adailyrecord-design-tokens/css/design-tokens.css`
  - `../adailyrecord-design-tokens/css/grid.css`

