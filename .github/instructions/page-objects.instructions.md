---
applyTo: "pages/**/*.ts"
---

# Page Object Model Instructions

When writing or modifying files in `pages/**/*.ts`, follow these rules:

## Class Structure Template
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExamplePage extends BasePage {
  // Locators — always readonly, always defined at top of class
  private readonly submitButton: Locator;
  private readonly emailInput: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator('[data-testid="submit-btn"]');
    this.emailInput = page.locator('[data-testid="email-input"]');
  }

  // Navigation
  async navigate(): Promise<void> {
    await this.page.goto('/example-path');
  }

  // Actions — public, composed of locator interactions
  async submitForm(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

  // Getters — for assertions in tests
  async getSubmitButtonText(): Promise<string> {
    return await this.submitButton.innerText();
  }
}
```

## Locator Strategy (in priority order)
1. `data-testid` attributes (most resilient)
2. ARIA roles: `page.getByRole('button', { name: 'Submit' })`
3. Labels: `page.getByLabel('Email')`
4. Text: `page.getByText('...')`
5. CSS selectors (last resort — fragile)

## Rules
- All locators are `private readonly` and defined in the constructor
- Never use `page.waitForTimeout()` — rely on Playwright's auto-waiting
- Methods should represent user actions, not low-level DOM operations
- All async methods must be `async` and `await` all Playwright calls
- `BasePage` provides: `page`, `navigate()`, `getPageTitle()`, `waitForLoad()`
