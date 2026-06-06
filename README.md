# Adapt the Game — QA Agentic Solution

> Automated end-to-end QA framework for [Adapt the Game](https://www.adaptthegame.io/) built with **Playwright + TypeScript**, following the **Page Object Model (POM)** design pattern and **OOP principles**.

---

## 🏢 About Adapt the Game

| Field | Details |
|-------|---------|
| **Company** | Adapt the Game |
| **Description** | Platform providing ADA-accessible seating at event venues |
| **Website** | [adaptthegame.io](https://www.adaptthegame.io/) |
| **Founded** | 2020 |
| **HQ** | Tempe, AZ |
| **Industry** | IT Services & Accessibility Tech |
| **Leader** | Victor OCando (CEO/Founder) |

---

## 🧪 Purpose of This Repository

This repository provides a **production-grade, AI-augmented test automation framework** for the Adapt the Game website. It is designed to:

- Catch regressions before they reach users
- Serve as a template for AI-assisted QA using **GitHub Copilot**
- Enforce consistent, maintainable test code through strict POM + OOP conventions
- Run automatically in CI/CD via **GitHub Actions**

### Test Coverage Targets

| Suite | Status | Description |
|-------|--------|-------------|
| Smoke | 🔲 Planned | Critical path — home, navigation, key flows |
| Functional | 🔲 Planned | Feature-level coverage per user story |
| Regression | 🔲 Planned | Full breadth coverage before releases |
| Accessibility | 🔲 Planned | WCAG / ADA compliance checks |

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev/) | Latest | Browser automation & test runner |
| TypeScript | ^5.x | Strongly typed test code (`strict: true`) |
| Node.js | >= 18.x | Runtime |
| GitHub Actions | — | CI/CD pipeline |
| GitHub Copilot | — | AI-assisted test generation & code review |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x installed ([download](https://nodejs.org/))
- A GitHub account with Copilot access (recommended)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/qa-bob/adapt_the_game_QA_Agentic_Solution.git
cd adapt_the_game_QA_Agentic_Solution

# 2. Install Node dependencies
npm install

# 3. Install Playwright browser binaries
npx playwright install

# 4. Verify TypeScript compiles cleanly
npx tsc --noEmit
```

### Running Tests

```bash
# Run the full test suite (headless)
npx playwright test

# Run only smoke tests
npx playwright test --grep @smoke

# Run with interactive UI mode
npx playwright test --ui

# Run in headed mode (see the browser)
npx playwright test --headed

# View the HTML test report
npx playwright show-report
```

---

## 📁 Project Structure

```
adapt_the_game_QA_Agentic_Solution/
├── .github/
│   ├── copilot-instructions.md       # Repo-wide Copilot context & rules
│   ├── instructions/                 # Path-specific Copilot instruction files
│   │   ├── playwright-tests.instructions.md
│   │   ├── page-objects.instructions.md
│   │   └── utils.instructions.md
│   ├── prompts/                      # Reusable Copilot skill prompt files
│   │   ├── new-page-object.prompt.md
│   │   ├── new-test-suite.prompt.md
│   │   └── debug-failing-test.prompt.md
│   ├── workflows/                    # GitHub Actions CI/CD pipelines
│   └── README.md                     # .github folder guide
├── pages/                            # Page Object Model classes
│   └── BasePage.ts                   # Abstract base — all pages extend this
├── tests/
│   ├── smoke/                        # Critical path tests
│   ├── functional/                   # Feature tests
│   └── regression/                   # Full regression suite
├── fixtures/                         # Custom Playwright fixtures & test data
├── utils/                            # Stateless helper functions
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript compiler options
├── AGENTS.md                         # AI agent behavioral contract
├── Skills.md                         # Copilot skills catalog
└── README.md                         # This file
```

---

## 🏛️ Architecture: Page Object Model

All tests follow the **Page Object Model (POM)** pattern with **OOP principles**:

```
Test File (.spec.ts)
      │
      │  uses
      ▼
Page Object (pages/[Name]Page.ts)  ──extends──▶  BasePage
      │
      │  wraps
      ▼
Playwright Page API
```

**Key rules:**
- Each page/component has its own class in `pages/`
- All page classes extend `BasePage`
- Locators are `private readonly` — never exposed to tests
- Tests call high-level methods (e.g., `homePage.clickLogin()`) not raw Playwright APIs

---

## 👥 Contributor Rules

> **Read before writing any code.**

### Code Standards

1. **Extend `BasePage`** — every new page class must inherit from `BasePage`
2. **No inline locators in tests** — all locators live in the Page Object class
3. **TypeScript strict mode** — no `any`, no unchecked nulls; run `npx tsc --noEmit` before committing
4. **No `waitForTimeout()`** — use Playwright's built-in auto-waiting mechanisms
5. **Tag all tests** — use `@smoke`, `@functional`, or `@regression` in test names
6. **One class per file** — each Page Object in its own `[Name]Page.ts` file

### Git Workflow

1. Create a feature branch from `main`: `git checkout -b feat/[your-feature]`
2. Write your tests and page objects following the POM pattern
3. Run the validation checklist (see below) before pushing
4. Open a pull request — Copilot will automatically code-review it

### Pre-PR Validation Checklist

```bash
# ✅ 1. TypeScript compiles with no errors
npx tsc --noEmit

# ✅ 2. All existing tests still pass
npx playwright test

# ✅ 3. No inline locators in test files (should return nothing)
grep -rn "page\.locator\|page\.fill\|page\.click" tests/ --include="*.spec.ts"
```

### Using GitHub Copilot in This Repo

This repo is configured with Copilot custom instructions and skills. See:
- **[`.github/README.md`](.github/README.md)** — full guide to Copilot config
- **[`Skills.md`](Skills.md)** — catalog of available Copilot prompt skills
- **[`AGENTS.md`](AGENTS.md)** — behavioral rules for AI agents

### Common Copilot Skills

| Task | How to invoke |
|------|--------------|
| Create a new Page Object | Use `.github/prompts/new-page-object.prompt.md` |
| Generate a test suite | Use `.github/prompts/new-test-suite.prompt.md` |
| Debug a failing test | Use `.github/prompts/debug-failing-test.prompt.md` |

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright POM Guide](https://playwright.dev/docs/pom)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Adapt the Game Website](https://www.adaptthegame.io/)

---

*Part of the Phoenix Startup QA Agentic Solutions initiative.*
