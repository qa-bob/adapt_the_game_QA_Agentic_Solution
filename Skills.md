# Skills.md — GitHub Copilot Skills Catalog

> This file documents all available Copilot prompt skills (`.github/prompts/*.prompt.md`) for this repository. Use these to automate repetitive tasks with consistent, high-quality output.

---

## What Are Skills?

Skills are reusable Copilot prompt files stored in `.github/prompts/`. Each skill encodes the steps and rules for a common task so you don't have to re-explain them every time. In VS Code, you can invoke them via **Copilot Chat → Attach → Prompt**.

---

## Available Skills

### 🏗️ `new-page-object`
**File:** `.github/prompts/new-page-object.prompt.md`  
**Purpose:** Generate a complete Playwright Page Object class for a given URL and page name.

**When to use:** You're adding test coverage for a new page on the Adapt the Game website and need to scaffold the Page Object first.

**Inputs required:**
- `pageUrl` — the full URL of the page (e.g., `https://www.adaptthegame.io/venues`)
- `pageName` — PascalCase name (e.g., `VenuesList`)

**Output:** A fully typed `pages/[pageName]Page.ts` extending `BasePage` with locators and action methods.

---

### 🧪 `new-test-suite`
**File:** `.github/prompts/new-test-suite.prompt.md`  
**Purpose:** Scaffold a complete Playwright test spec file for a feature area.

**When to use:** You have a Page Object ready and need to create the corresponding test suite with happy-path, edge-case, and error-state tests.

**Inputs required:**
- `featureName` — kebab-case feature name (e.g., `venue-search`)
- `testType` — one of `smoke`, `functional`, `regression`
- `pageObjectName` — the Page Object class to use (e.g., `VenuesListPage`)

**Output:** A `tests/[testType]/[featureName].spec.ts` file with tagged, structured tests.

---

### 🐛 `debug-failing-test`
**File:** `.github/prompts/debug-failing-test.prompt.md`  
**Purpose:** Investigate and fix a failing Playwright test without introducing `waitForTimeout` hacks.

**When to use:** A test is failing in CI or locally and you need systematic root-cause analysis.

**Inputs required:**
- `testFilePath` — path to the failing spec (e.g., `tests/smoke/homepage.spec.ts`)
- `errorMessage` — the exact error from the Playwright output

**Output:** Root cause analysis, recommended fix, and verification steps.

---

## How to Add a New Skill

1. Create a new file in `.github/prompts/` named `[action]-[noun].prompt.md`
2. Add YAML frontmatter:
   ```yaml
   ---
   mode: "agent"
   ---
   ```
3. Write the prompt with clear, step-by-step instructions
4. Use `${input:variableName}` for user-provided inputs
5. Reference any relevant instruction files (`.github/instructions/`)
6. Document the new skill in this `Skills.md` file

---

## Skill Design Principles

| Principle | Description |
|-----------|-------------|
| **Reusable** | Skills should work for any page/feature, not be hardcoded to one case |
| **Opinionated** | Skills enforce this repo's POM + OOP conventions automatically |
| **Input-driven** | Use `${input:}` variables for anything that changes between uses |
| **Validating** | Skills should instruct Copilot to run `tsc --noEmit` and verify output |
| **Documented** | Every skill must have an entry in this file |

---

## Resources

- [GitHub Copilot Prompt Files Docs](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide)
- [Playwright Page Object Model](https://playwright.dev/docs/pom)
