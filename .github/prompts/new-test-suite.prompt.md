---
mode: "agent"
---

# Generate a New Test Suite

Create a Playwright test file for: ${input:featureName}
Test type: ${input:testType} (smoke | functional | regression)
Page Object to use: ${input:pageObjectName}

Requirements:
- Place file at `tests/${input:testType}/${input:featureName}.spec.ts`
- Import and use the specified Page Object — no inline locators
- Include `test.describe()` block with a meaningful description
- Write test cases covering: happy path, edge cases, and error states
- Tag each test with `@${input:testType}`
- Use `test.beforeEach()` for page object setup and navigation
- All assertions use `expect` from `@playwright/test`
- Follow rules in `.github/instructions/playwright-tests.instructions.md`
