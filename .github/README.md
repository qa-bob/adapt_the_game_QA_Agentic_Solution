# .github Folder — GitHub Copilot Configuration Guide

This directory configures GitHub Copilot's behavior for this repository. Below is a reference guide for every contributor on what belongs here and why.

---

## 📁 Directory Structure

```
.github/
├── copilot-instructions.md     # Repo-wide Copilot context (required)
├── instructions/               # Path-specific instruction files
│   ├── playwright-tests.instructions.md
│   ├── page-objects.instructions.md
│   └── utils.instructions.md
├── prompts/                    # Reusable agent prompt files
│   ├── new-page-object.prompt.md
│   ├── new-test-suite.prompt.md
│   └── debug-failing-test.prompt.md
└── workflows/                  # GitHub Actions CI/CD pipelines
```

---

## 🤖 Agents

**What:** AI agents are automated Copilot sessions that can research code, plan changes, write code, and open pull requests.

**Where configured:**
- `AGENTS.md` (repo root) — behavioral rules and constraints for any AI agent working in this repo
- `.github/copilot-instructions.md` — gives agents context about the project structure, build steps, and coding conventions

**What to include in `AGENTS.md`:**
- High-level project description for first-time agent orientation
- Step-by-step build, test, and validation commands
- Rules an agent must follow (e.g., "always extend BasePage", "never use inline locators")
- Constraints on what the agent should NOT do (e.g., "don't modify `playwright.config.ts` without permission")
- Preferred patterns and anti-patterns

**Official docs:** https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent

---

## 🛠️ Skills

**What:** Skills are reusable Copilot prompt templates that automate common, repeatable tasks in this repo (e.g., generating a new Page Object, writing a test suite).

**Where configured:**
- `Skills.md` (repo root) — catalog and documentation of all available skills
- `.github/prompts/*.prompt.md` — individual skill prompt files that Copilot can invoke

**What to include:**
- A prompt file for each common task (new page object, new test, debug test, etc.)
- `mode: "agent"` in frontmatter for multi-step agentic tasks
- `${input:variableName}` placeholders for dynamic values
- Clear step-by-step instructions within each prompt

**Naming convention:** `[action]-[noun].prompt.md` (e.g., `new-page-object.prompt.md`)

**Official docs:** https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide

---

## 🪝 Hooks (GitHub Actions Automations)

**What:** GitHub Actions workflows that trigger Copilot cloud agent automatically on events (PR creation, issue labeling, scheduled runs).

**Where configured:** `.github/workflows/*.yml`

**Recommended hooks for this repo:**

| Hook | Trigger | Purpose |
|------|---------|---------|
| `playwright-ci.yml` | Push / PR to `main` | Run full Playwright test suite |
| `copilot-review.yml` | PR opened/updated | Trigger Copilot code review |
| `copilot-autofix.yml` | Issue labeled `copilot` | Trigger Copilot cloud agent to fix the issue |
| `type-check.yml` | Push | Run `tsc --noEmit` to catch TS errors |

**What to include in each workflow:**
- `on:` triggers (push, pull_request, issues, schedule)
- `permissions:` scoped to least privilege
- Steps: checkout → install → build/test → report

**Official docs:** https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations

---

## 📏 Rules (Custom Instructions)

**What:** Persistent rules that Copilot always follows when working in this repo, regardless of what a user asks.

**Where configured:**

| File | Scope | Purpose |
|------|-------|---------|
| `.github/copilot-instructions.md` | **Repo-wide** | Applied to ALL Copilot interactions in this repo |
| `.github/instructions/*.instructions.md` | **Path-specific** | Applied only when Copilot works on matching file paths |

**Frontmatter for path-specific rules:**
```yaml
---
applyTo: "tests/**/*.spec.ts"
---
```

**What repo-wide rules should cover:**
- Project summary and tech stack
- Build and test commands (with exact CLI syntax)
- Coding standards (naming, patterns, anti-patterns)
- Architecture constraints (e.g., POM structure, OOP rules)
- TypeScript configuration notes

**What path-specific rules should cover:**
- File-type-specific conventions (test files vs page objects vs utils)
- Import patterns for that file type
- Forbidden patterns for that file type

**Official docs:** https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions

---

## 📚 Docs (Reference Documentation)

**What:** Supporting documentation that gives Copilot and contributors deeper context about the project.

**What to add to `.github/` docs:**
- Architecture decision records (ADRs) if design choices need explanation
- Environment setup guides for non-obvious dependencies
- Links to external QA documentation (test plans, accessibility standards)

**Key docs already in this repo:**
- `README.md` — contributor onboarding and project overview
- `AGENTS.md` — AI agent behavioral contract
- `Skills.md` — Copilot skills catalog

---

## ✅ Contribution Checklist

When adding new Copilot configuration to `.github/`:

- [ ] New path-specific instruction file? → Add `applyTo:` frontmatter
- [ ] New prompt file? → Use `mode: "agent"` for multi-step tasks
- [ ] New workflow? → Scope `permissions:` to minimum required
- [ ] Updated coding rules? → Update both `copilot-instructions.md` AND `AGENTS.md`
- [ ] New page or feature added? → Update project structure in `copilot-instructions.md`
