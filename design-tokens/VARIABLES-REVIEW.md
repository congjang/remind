# 변수 시스템 검토 (MCP + 등록 변수 비교)

## 1. Figma MCP 변수 조회 제한

- **get_variable_defs**: Figma에서 **선택된 노드**가 있을 때만 동작합니다. 선택이 없으면 "Nothing is selected"가 반환됩니다.
- **전체 변수 한 번에**: Figma REST API `GET /v1/files/:file_key/variables/local`로 가능하나, 권한(Enterprise / file_variables:read) 이슈로 현재는 플러그인 수동 export + `design-tokens/` JSON으로 관리 중입니다.
- 따라서 **전체 변수 시스템**은 프로젝트의 `design-tokens/*.json`과 `src/app/globals.css`에 정의된 CSS 변수를 기준으로 검토합니다.

---

## 2. 프로젝트에 등록된 변수

### 2.1 design-tokens (JSON)

| 파일 | 내용 |
|------|------|
| `colors.json` | primitives (hex) + semantic.light ($ref → primitives) |
| `typography.json` | fontFamily, fontSize, fontWeight, lineHeight, letterSpacing (headline, title, body, label, caption) |
| `grid.json` | spacing, radius (primitives) + semantic (padding, gap, height, radius) |
| `elevation.json` | shadow level0~5, semantic surface |
| `icons.json` | 아이콘 도메인 메타 |

### 2.2 globals.css (CSS 변수)

- **Grid**: `--Grid-Height-XL/L/M/S`, `--Grid-Padding-S/L/XL`, `--Grid-Gap-M`, `--Grid-Radius-M/L`
- **Placeholder**: `--color-placeholder` (#52525b)
- **색/타이포 시맨틱**: 이전에는 **미정의** → 컴포넌트는 `var(--token, fallback)` fallback 값만 사용 중.  
  → **적용**: `src/app/design-tokens.css`에 시맨틱 색·타이포 변수를 정의하고 `globals.css`에서 `@import "./design-tokens.css"`로 불러오도록 했음. Button, FAB, CalendarDay 등에서 사용하는 토큰이 이 파일을 통해 적용됨.

---

## 3. MCP로 받아온 컴포넌트에서 사용한 토큰

### 3.1 Figma MCP 코드에서 나온 토큰 이름 (Figma 쪽)

- `--color/button-container/primary/default` (#046253)
- `--color/element-on-container/highlight/default` (#fafafa)
- `--grid/gap/m`, `--grid/padding/s`, `--grid/radius/l`, `--grid/height/l`, `--grid/height/m`
- `--typography/font-family`, `--typography/font-size/label-l`, `--typography/font-size/label-m`

### 3.2 우리 컴포넌트에서 사용 중인 CSS 변수 (캐멀케이스, fallback 포함)

- **Button / FAB**:  
  `--colorButtonContainerPrimaryDefault`, `--colorButtonContainerPrimaryHover`, `--colorButtonContainerPrimaryPressed`,  
  `--colorElementOnContainerHighlightDefault`, `--colorOutlinePrimaryDefault`,  
  `--Grid-Gap-M`, `--Grid-Padding-S`, `--Grid-Radius-L`,  
  `--Typography-font-size-Label-L/M/S`, `--typography-font-family`
- **CalendarDay**:  
  `--colorElementPrimaryDefault`, `--colorElementTertiaryDefault`, `--colorElementSecondaryDefault`,  
  `--colorElementBase1Default`, `--colorElementBase2Default`, `--colorElementBase3Default`,  
  `--colorBackgroundBase3Default`, `--colorElementHighlightDefault`, `--Typography-font-family`, `--Typography-font-size-Label-M`
- **공통**:  
  `--colorOutlineBase1`, `--colorOutlineBase2`, `--colorBackgroundBase1Default`, `--colorBackgroundBase2Default`, `--colorBackgroundBase3Default`,  
  `--colorElementBase1Disabled`, `--colorButtonContainerHighlightDefault`, `--colorElementPrimaryDisabled` 등

---

## 4. 비교 및 반영 상태

| 구분 | design-tokens (JSON) | globals.css (기존) | 컴포넌트 반영 |
|------|----------------------|--------------------|----------------|
| **Grid** | grid.json (height, padding, gap, radius) | 일부만 정의 (Height, Padding-S/L/XL, Gap-M, Radius-M/L) | Button, ButtonSet, FAB에서 사용. **grid height**는 Button이 MCP 스펙대로 56/48/40/32 고정값 사용 중. |
| **Color 시맨틱** | colors.json semantic.light 전부 $ref | **미정의** (fallback만 사용) | Button, FAB, CalendarDay 등 **fallback으로 동작**. 시맨틱 CSS 변수 주입 시 design-tokens 값 적용 가능. |
| **Typography** | typography.json (label L/M/S, font-family 등) | **미정의** | `--Typography-font-size-Label-*`, `--typography-font-family` fallback 사용. 주입 시 일원화 가능. |

- **Button / FAB**: MCP 스펙(색, 높이, gap, radius)은 코드에 반영됨. **색/타이포**는 CSS 변수로 연결돼 있으나, 변수 정의가 없어서 **fallback 값**이 적용 중. `tokens.css`(또는 globals 확장)로 시맨틱을 주입하면 design-tokens와 일치시킬 수 있음.
- **Figma 토큰 이름 차이**: Figma는 `--color/button-container/...`(슬래시), 우리는 `--colorButtonContainer...`(캐멀). 컴포넌트는 우리 네이밍 + fallback 사용 → **등록 변수만 맞추면 됨**.

---

## 5. 권장 조치

1. **Figma에서 전체 변수 가져오기**  
   - Figma에서 **변수 컬렉션이 포함된 프레임/페이지를 선택**한 뒤 MCP `get_variable_defs` 호출하면, 해당 선택 기준 변수 목록을 받을 수 있음.  
   - 그 결과를 이 문서나 `design-tokens/` 스키마와 비교해 누락/이름 불일치를 정리.

2. **CSS 변수 주입**  
   - `design-tokens/`의 semantic(색, 타이포, 그리드)을 해석해 `:root`에 `--tokenName: value` 형태로 넣기.  
   - `scripts/`에 JSON → CSS 생성 스크립트를 두거나, `design-tokens/tokens.css`를 생성해 `globals.css`에서 import.

3. **Button/FAB 재검토**  
   - **반영 상태**: Button·FAB는 `--colorButtonContainerPrimaryDefault`, `--colorElementOnContainerHighlightDefault`, `--Grid-Gap-M`, `--Typography-font-size-Label-*` 등을 사용. `design-tokens.css` 주입으로 design-tokens 값이 적용됨.  
   - Figma MCP 코드에서는 `#046253`(primary) 등 픽셀 값이 나왔고, 우리 tokens는 `#036252`(colorGreen150)를 쓰므로 디자인과 1:1로 맞추려면 Figma 변수 컬렉션을 선택한 뒤 `get_variable_defs`로 실제 변수값을 받아와 비교·통일할 것.
