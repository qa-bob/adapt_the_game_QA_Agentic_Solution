# AGENTS.md — AI Agent Behavioral Contract

> This file is read by GitHub Copilot cloud agent and other AI agents (e.g., Claude, Gemini) when they work in this repository. It defines the behavioral contract all agents must follow.

---

## 🎯 Project Context

This repository is the **QA Agentic Solution** for [Adapt the Game](https://www.adaptthegame.io/) — a web platform providing ADA-accessible seating at event venues. The framework automates end-to-end testing of the website using **Playwright + TypeScript** with a strict **Page Object Model (POM)** architecture.

**Target URL under test:** `https://www.adaptthegame.io/`

---

## ⚙️ Environment Setup

Before making any code changes, always bootstrap the environment:

```bash
# Step 1 — Install Node dependencies (always run first)
npm install

# Step 2 — Install Playwright browser binaries
npx playwright install

# Step 3 — Verify TypeScript compiles cleanly
npx tsc --noEmit

# Step 4 — Run the full test suite to establish baseline
npx playwright test
```

**Required Node.js version:** >= 18.x  
**Package manager:** npm (do not use yarn or pnpm)

---

## 🏗️ Architecture Rules (MUST Follow)

### 1. Page Object Model
- **Every web page or major UI component** must have a corresponding class in `pages/`
- All page classes **must extend `BasePage`** (`pages/BasePage.ts`)
- Locators are **private readonly** class properties defined in the constructor
- Page class filenames follow `[PageName]Page.ts` convention
- **Never** write `page.locator(...)` directly inside a `*.spec.ts` test file

### 2. OOP Principles
- **Encapsulation:** Keep locators and implementation details `private` or `protected`
- **Inheritance:** Shared behaviors (navigate, getTitle, waitForLoad) belong in `BasePage`
- **Single Responsibility:** One page class per page/component

### 3. TypeScript
- `strict: true` is enforced — no implicit `any`
- Run `npx tsc --noEmit` after every code change to catch type errors
- Use `async/await` — no `.then()` chains in tests or page objects

### 4. Tests
- Test files live under `tests/smoke/`, `tests/functional/`, or `tests/regression/`
- All test files end with `.spec.ts`
- Tests are tagged: `@smoke`, `@functional`, or `@regression`
- Use Playwright's built-in auto-waiting — **never add `page.waitForTimeout()`**

---

## 🚫 Constraints — What Agents Must NOT Do

- ❌ Do not modify `playwright.config.ts` without explicit user instruction
- ❌ Do not change `tsconfig.json` compiler options without explicit user instruction
- ❌ Do not add or remove npm packages without asking first
- ❌ Do not commit environment-specific values (URLs, credentials) hardcoded in test files — use environment variables or `.env` files
- ❌ Do not create test files that bypass the POM pattern (no inline locators)
- ❌ Do not use `page.waitForTimeout()` as a workaround for flaky tests

---

## ✅ Validation Steps (Run Before Opening a PR)

1. `npx tsc --noEmit` — must produce zero errors
2. `npx playwright test --project=chromium` — must pass all existing tests
3. Verify new page objects extend `BasePage`
4. Verify no inline locators exist in `*.spec.ts` files:
   ```bash
   grep -rn "page\.locator\|page\.fill\|page\.click" tests/ --include="*.spec.ts"
   ```
   *(Any matches are a violation of the POM pattern)*

---

## 📁 Key File Locations

| File/Directory | Purpose |
|----------------|---------|
| `pages/BasePage.ts` | Abstract base class for all page objects |
| `pages/` | All Page Object Model classes |
| `tests/smoke/` | Smoke test suite |
| `tests/functional/` | Functional test suite |
| `tests/regression/` | Regression test suite |
| `fixtures/` | Playwright custom fixtures and shared test data |
| `utils/` | Stateless helper functions |
| `playwright.config.ts` | Playwright configuration (baseURL, timeouts, reporters) |
| `tsconfig.json` | TypeScript compiler config |
| `.github/copilot-instructions.md` | Copilot repo-wide context |
| `.github/instructions/` | Path-specific Copilot rules |

---

## 🔗 Resources

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright POM Guide](https://playwright.dev/docs/pom)
- [GitHub Copilot Cloud Agent Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent)
- [Adapt the Game Website](https://www.adaptthegame.io/)
