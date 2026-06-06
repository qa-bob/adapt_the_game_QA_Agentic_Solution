---
mode: "agent"
---

# Debug Failing Playwright Test

A Playwright test is failing. Investigate and fix the issue.

Failing test file: ${input:testFilePath}
Error message: ${input:errorMessage}

Steps to follow:
1. Read the failing test file and identify the assertion or action that is failing
2. Check the corresponding Page Object in `pages/` for the locator being used
3. Consider: locator stale/wrong? Timing issue? Test data issue? Environment issue?
4. Suggest a fix and explain why the test was failing
5. Verify the fix does not break the Page Object contract (other tests using the same POM)
6. Run `npx tsc --noEmit` to confirm no TypeScript errors after the fix

Do NOT add `page.waitForTimeout()` as a fix — identify the root cause.
