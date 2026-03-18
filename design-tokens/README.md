# Design tokens

This folder contains design tokens exported from Figma Variables.

## Setup

1. Put your Figma file keys into `design-tokens/figma.config.json`.
   - Add **your design system library file key(s)** here too (so unused library variables are included).
2. Provide a Figma personal access token via env var:

```bash
export FIGMA_TOKEN="..."
```

Notes:
- Variables endpoints require the `file_variables:read` scope and may be restricted by your Figma plan/account.
- Tokens are exported per file key and merged.

## Commands

Export all variables (local + subscribed used vars) and also fetch published metadata:

```bash
npm run tokens:figma:export
```

Build token JSON files:

```bash
npm run tokens:figma:build
```

Build domain token files (derived artifacts):

```bash
npm run tokens:figma:domains
```

Do both:

```bash
npm run tokens:figma:sync
```

## Outputs

- `design-tokens/primitives.json`
  - Variables with concrete values (`valueByMode`)
  - If a mode value is an alias, it will be stored as a `$ref`
- `design-tokens/semantics.json`
  - Variables whose values are **pure aliases** in all modes (`aliasByMode`)
- `design-tokens/tokens.json`
  - A merged view of primitives + semantics under a single `tokens` tree

## Domain outputs

- `design-tokens/typography.json`
  - Derived, project-specific schema (`tokens.typography...`)
  - Keeps alias relationships via `$ref`
- `design-tokens/colors.json`
  - Derived, project-specific schema (`tokens.color.primitives` + `tokens.color.semantic`)
  - Keeps alias relationships via `$ref`

## Alias / refs

Refs are JSON Pointers into `#/tokens/...`:

- Example: `"$ref": "#/tokens/Typography/fontSize/headline/L"`

