# GitHub Copilot Repository Instructions

## Project Overview

This repository is the **QA Agentic Solution** for [Adapt the Game](https://www.adaptthegame.io/) — a web application that provides ADA seating access at event venues. The test automation framework uses **Playwright + TypeScript** following a **Page Object Model (POM)** design pattern with **OOP principles**.

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Test Framework:** Playwright (`@playwright/test`)
- **Design Pattern:** Page Object Model (POM)
- **Paradigm:** Object-Oriented Programming (OOP)
- **Node.js:** >= 18.x
- **Package Manager:** npm

## Repository Structure

```
adapt_the_game_QA_Agentic_Solution/
├── .github/
│   ├── copilot-instructions.md   # This file — repo-wide Copilot context
│   ├── instructions/             # Path-specific Copilot instruction files
│   ├── prompts/                  # Reusable Copilot prompt files
│   └── workflows/                # GitHub Actions CI/CD pipelines
├── pages/                        # Page Object Model classes
│   ├── BasePage.ts               # Abstract base class all pages extend
│   └── [PageName]Page.ts         # One file per page/component
├── tests/
│   ├── smoke/                    # Critical path smoke tests
│   ├── functional/               # Feature-level functional tests
│   └── regression/               # Full regression suite
├── fixtures/                     # Custom Playwright fixtures and test data
├── utils/                        # Shared helper utilities
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript compiler options
├── package.json
├── AGENTS.md                     # AI agent behavioral instructions
└── Skills.md                     # Copilot skills catalog for this repo
```

## Build & Validation Steps

Always run in this order:
```bash
npm install                  # Install dependencies (always run first)
npx playwright install       # Install browser binaries
npx tsc --noEmit             # TypeScript type-check (no output files)
npx playwright test          # Run full test suite
npx playwright test --ui     # Run with interactive UI
npx playwright show-report   # View HTML report after test run
```

## Coding Standards & Conventions

### Page Object Model Rules
- Every page/component **must** have its own class in `pages/`
- All page classes **must** extend `BasePage`
- Locators are defined as `readonly` class properties using Playwright `Locator` type
- Page actions are public methods; locator access is private/protected
- **Never** write `page.locator(...)` inline inside test files — always use a Page Object

### TypeScript Conventions
- Use `strict: true` — no implicit `any`, no unchecked nulls
- Prefer `async/await` over `.then()` chains
- Use `expect` from `@playwright/test` (not from jest or chai)
- All test files end with `.spec.ts`
- All page class files end with `Page.ts`

### Test File Conventions
- Import page objects from `../../pages/`
- Use descriptive `test.describe()` blocks and `test()` names in plain English
- Tag tests with `@smoke`, `@functional`, `@regression` annotations
- Avoid hard-coded `page.waitForTimeout()` — use Playwright's built-in auto-waiting

### OOP Principles to Follow
- **Encapsulation:** Locators and implementation details are private/protected
- **Inheritance:** Common page actions (navigate, getTitle, etc.) live in `BasePage`
- **Single Responsibility:** Each page class represents one page or major component

## Playwright Configuration Notes
- Base URL is configured in `playwright.config.ts` as `https://www.adaptthegame.io/`
- Retries are enabled in CI (`process.env.CI ? 2 : 0`)
- Screenshots and videos are captured on failure
- Default timeout: 30 seconds

## When Generating or Modifying Tests

1. **Check `pages/` first** — use existing Page Objects before creating new ones
2. **Follow POM** — no inline locators in test files
3. **Extend `BasePage`** — all new page classes must extend it
4. **Type everything** — no `any` unless unavoidable and commented
5. **Run `npx tsc --noEmit`** after changes to catch type errors before committing
