import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage — Page Object for the Adapt the Game landing page.
 *
 * Covers: hero section, "Our Story", "Our Why", and "How It Works" sections.
 * The site is a single-page Webflow app; all sections live at '/'.
 */
export class HomePage extends BasePage {
  // ── Hero Section ──────────────────────────────────────────────────────────
  readonly heroSection: Locator;
  readonly heroLogo: Locator;
  readonly heroHeading: Locator;
  readonly heroSubtext: Locator;
  readonly heroEmailInput: Locator;
  readonly heroSignUpButton: Locator;
  readonly heroSuccessMessage: Locator;
  readonly heroErrorMessage: Locator;

  // ── Our Story Section ─────────────────────────────────────────────────────
  readonly ourStorySection: Locator;
  readonly ourStoryHeading: Locator;
  readonly founderName: Locator;
  readonly founderTitle: Locator;
  readonly linkedInLink: Locator;

  // ── Our Why Section ───────────────────────────────────────────────────────
  readonly ourWhySection: Locator;
  readonly ourWhyQuote: Locator;

  // ── How It Works Section ──────────────────────────────────────────────────
  readonly howItWorksSection: Locator;
  readonly howItWorksHeading: Locator;
  readonly step1: Locator;
  readonly step2: Locator;
  readonly step3: Locator;

  constructor(page: Page) {
    super(page);

    // Hero
    this.heroSection = page.locator('#home');
    this.heroLogo = page.locator('#adapt-the-game-logo');
    this.heroHeading = page.getByRole('heading', { name: /the inclusive way to book ahead/i });
    this.heroSubtext = page.locator('.hero').getByText(/mobile app and platform/i);
    this.heroEmailInput = page.locator('#demo-email');
    this.heroSignUpButton = page.locator('#submit-request-for-demo-form');
    this.heroSuccessMessage = page.locator('.success-message');
    this.heroErrorMessage = page.locator('.w-form-fail');

    // Our Story
    this.ourStorySection = page.locator('#my-story');
    this.ourStoryHeading = page.getByRole('heading', { name: /know my story/i });
    // The site has two "Victor Ocando" elements; the hide-tablet one is visible on desktop
    this.founderName = page.locator('.hide-tablet').filter({ hasText: 'Victor Ocando' }).first();
    this.founderTitle = page.getByText('Founder & CEO').first();
    this.linkedInLink = page.getByRole('link', { name: /connect with me on linkedin/i });

    // Our Why
    this.ourWhySection = page.locator('#our_why');
    this.ourWhyQuote = page.locator('#our_why').getByText(/normalize access to events/i);

    // How It Works
    this.howItWorksSection = page.locator('#how-will-work-section');
    this.howItWorksHeading = page.getByRole('heading', { name: /how does the app work/i });
    this.step1 = page.locator('#w-node-ee756e06-bff7-c83b-9e4c-c7ca48271710-ec4a079a');
    this.step2 = page.locator('#w-node-_63ea6f8f-ad11-f46e-8577-1fae308b1a2c-ec4a079a');
    this.step3 = page.locator('#w-node-_7deff48c-b69f-044a-a39a-3e4a709afc31-ec4a079a');
  }

  /** Navigate to the home page root */
  async goto(): Promise<void> {
    await this.navigate('/');
  }

  // ── Hero Actions ──────────────────────────────────────────────────────────

  /**
   * Fills the hero email sign-up form and submits it.
   * @param email - The email address to submit
   */
  async submitHeroSignUpForm(email: string): Promise<void> {
    await this.heroEmailInput.fill(email);
    await this.heroSignUpButton.click();
  }

  /** Clears the hero email input field */
  async clearHeroEmailInput(): Promise<void> {
    await this.heroEmailInput.clear();
  }

  // ── Scroll Helpers ────────────────────────────────────────────────────────

  /** Scroll to the "Our Story" section */
  async scrollToOurStory(): Promise<void> {
    await this.ourStorySection.scrollIntoViewIfNeeded();
  }

  /** Scroll to the "Our Why" section */
  async scrollToOurWhy(): Promise<void> {
    await this.ourWhySection.scrollIntoViewIfNeeded();
  }

  /** Scroll to the "How It Works" section */
  async scrollToHowItWorks(): Promise<void> {
    await this.howItWorksSection.scrollIntoViewIfNeeded();
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  /** Assert the hero section is fully visible with key elements */
  async assertHeroVisible(): Promise<void> {
    await expect(this.heroHeading).toBeVisible();
    await expect(this.heroEmailInput).toBeVisible();
    await expect(this.heroSignUpButton).toBeVisible();
  }

  /** Assert hero sign-up success message is displayed */
  async assertSignUpSuccess(): Promise<void> {
    await expect(this.heroSuccessMessage).toBeVisible();
  }

  /** Assert hero sign-up error message is displayed */
  async assertSignUpError(): Promise<void> {
    await expect(this.heroErrorMessage).toBeVisible();
  }

  /** Assert the "Our Story" section is visible */
  async assertOurStorySectionVisible(): Promise<void> {
    await expect(this.ourStoryHeading).toBeVisible();
    await expect(this.founderName).toBeVisible();
  }

  /** Assert the "Our Why" section is visible */
  async assertOurWhySectionVisible(): Promise<void> {
    await expect(this.ourWhyQuote).toBeVisible();
  }

  /** Assert all three "How It Works" steps are visible */
  async assertHowItWorksSectionVisible(): Promise<void> {
    await expect(this.howItWorksHeading).toBeVisible();
    await expect(this.step1).toBeVisible();
    await expect(this.step2).toBeVisible();
    await expect(this.step3).toBeVisible();
  }

  /** Returns the placeholder text of the hero email input */
  async getHeroEmailPlaceholder(): Promise<string | null> {
    return this.heroEmailInput.getAttribute('placeholder');
  }

  /** Returns the current value of the hero email input */
  async getHeroEmailValue(): Promise<string> {
    return this.heroEmailInput.inputValue();
  }
}
