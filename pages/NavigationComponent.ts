import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * NavigationComponent — encapsulates the site-wide navbar.
 *
 * The Adapt the Game site uses a single fixed navbar with anchor links.
 * Navigation scrolls within the same SPA page.
 */
export class NavigationComponent extends BasePage {
  // Logo
  readonly logoDesktop: Locator;

  // Nav links
  readonly ourStoryLink: Locator;
  readonly ourWhyLink: Locator;
  readonly ourSolutionLink: Locator;
  readonly contactUsButton: Locator;

  // Mobile hamburger
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    super(page);
    this.logoDesktop = page.locator('#adapt-the-game-logo-nav');
    this.ourStoryLink = page.locator('#nav').getByRole('link', { name: 'Our Story' });
    this.ourWhyLink = page.locator('#nav').getByRole('link', { name: 'Our Why' });
    this.ourSolutionLink = page.locator('#nav').getByRole('link', { name: 'Our Solution' });
    this.contactUsButton = page.locator('#nav').getByRole('link', { name: 'Contact Us' });
    this.mobileMenuButton = page.locator('.w-nav-button');
  }

  /** Click the "Our Story" nav link */
  async clickOurStory(): Promise<void> {
    await this.ourStoryLink.click();
  }

  /** Click the "Our Why" nav link */
  async clickOurWhy(): Promise<void> {
    await this.ourWhyLink.click();
  }

  /** Click the "Our Solution" nav link */
  async clickOurSolution(): Promise<void> {
    await this.ourSolutionLink.click();
  }

  /** Click the "Contact Us" CTA button in the navbar */
  async clickContactUs(): Promise<void> {
    await this.contactUsButton.click();
  }

  /** Assert the navbar is visible */
  async assertNavVisible(): Promise<void> {
    await expect(this.ourStoryLink).toBeVisible();
    await expect(this.ourWhyLink).toBeVisible();
    await expect(this.ourSolutionLink).toBeVisible();
    await expect(this.contactUsButton).toBeVisible();
  }
}
