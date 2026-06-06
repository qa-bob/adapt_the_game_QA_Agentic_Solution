---
applyTo: "tests/**/*.spec.ts"
---

# Playwright Test File Instructions

When writing or modifying files in `tests/**/*.spec.ts`, follow these rules:

## Structure
- Wrap related tests in `test.describe('Feature Name', () => { ... })`
- Use `test.beforeEach()` to instantiate page objects and navigate
- Import page objects from `../../pages/` (or adjust path depth accordingly)
- Use `test.use({ storageState: '...' })` for authenticated test groups

## Assertions
- Always use `expect` from `@playwright/test`
- Prefer built-in Playwright assertions (e.g., `toBeVisible()`, `toHaveText()`, `toHaveURL()`) over generic `toBe()` where possible
- Use `await` on all assertions — they are async

## Test Tagging
Annotate tests with tags for selective runs:
```typescript
test('should display hero banner @smoke', async ({ page }) => { ... });
test('should filter venues by category @functional', async ({ page }) => { ... });
```

## No Inline Locators
```typescript
// ❌ BAD — inline locator in test file
await page.locator('#submit-btn').click();

// ✅ GOOD — delegate to page object
const homePage = new HomePage(page);
await homePage.clickSubmit();
```

## Fixtures
Use custom fixtures from `fixtures/` for shared setup (authenticated sessions, test data, etc.).
