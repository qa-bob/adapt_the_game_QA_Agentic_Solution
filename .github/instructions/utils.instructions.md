---
applyTo: "utils/**/*.ts"
---

# Utility Helper Instructions

When writing or modifying files in `utils/**/*.ts`:

## Purpose
Utilities are **pure helper functions** — no Playwright `Page` object dependencies unless explicitly needed. Keep them stateless and reusable.

## Naming
- Files: `camelCase.ts` (e.g., `dateHelpers.ts`, `apiHelpers.ts`)
- Functions: exported named functions (no default exports for utils)

## Categories
- `dateHelpers.ts` — date formatting, parsing, comparison
- `stringHelpers.ts` — text manipulation, sanitization
- `apiHelpers.ts` — direct API calls for test setup/teardown
- `testDataHelpers.ts` — generating dynamic test data

## Example
```typescript
// utils/dateHelpers.ts
export function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}
```

## Rules
- Every exported function must have a JSDoc comment
- Pure functions only — no side effects unless it's an API helper
- All utility functions must have corresponding unit tests in `tests/utils/`
