import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — abstract base class for all Page Object Models.
 *
 * Provides common navigation, accessibility, and utility methods
 * shared across every page in the Adapt the Game test suite.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the given URL path (relative to baseURL in playwright.config.ts).
   * Defaults to the site root '/'.
   */
  async navigate(path = '/'): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  /** Returns the document title of the current page. */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /** Returns the current page URL. */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Waits for the page to reach 'load' network state.
   * Use this after navigation or form submissions.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  /**
   * Waits for the page to reach 'networkidle' state.
   * Use for pages with deferred content loading.
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Scrolls an element into the viewport.
   * Useful for lazy-loaded content or anchor sections.
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Scrolls to a specific anchor section by ID (e.g., '#contact-form-section').
   */
  async scrollToSection(sectionId: string): Promise<void> {
    await this.page.locator(sectionId).scrollIntoViewIfNeeded();
  }

  /** Asserts the page title contains the expected string. */
  async assertTitleContains(expected: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(expected, 'i'));
  }

  /** Asserts the current URL contains the expected string. */
  async assertUrlContains(expected: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expected, 'i'));
  }

  /** Checks if an element is visible without throwing on failure. */
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
}
