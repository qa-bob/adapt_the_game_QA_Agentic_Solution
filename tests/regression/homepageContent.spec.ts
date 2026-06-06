import { test, expect } from '../../fixtures/index';

/**
 * Regression Tests — Homepage Content Integrity
 *
 * Guards against content regressions. These tests verify that key
 * copy, sections, and UI elements remain present across releases.
 */
test.describe('Homepage Content Regression @regression', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  // ── Page Meta ──────────────────────────────────────────────────────────────
  test('page title should be "Adapt The Game" @regression', async ({ page }) => {
    await expect(page).toHaveTitle('Adapt The Game');
  });

  // ── Hero Section ──────────────────────────────────────────────────────────
  test('hero heading should read "The inclusive way to book ahead" @regression', async ({
    homePage,
  }) => {
    await expect(homePage.heroHeading).toContainText('The inclusive way to book ahead');
  });

  test('hero subtext should mention "mobile app and platform" @regression', async ({
    homePage,
  }) => {
    await expect(homePage.heroSubtext).toContainText('mobile app and platform');
  });

  test('hero sign-up button should have value "Sign Up" @regression', async ({ homePage }) => {
    await expect(homePage.heroSignUpButton).toHaveValue('Sign Up');
  });

  // ── Navigation ─────────────────────────────────────────────────────────────
  test('navbar should have "Our Story" link @regression', async ({ nav }) => {
    await expect(nav.ourStoryLink).toHaveText('Our Story');
  });

  test('navbar should have "Our Why" link @regression', async ({ nav }) => {
    await expect(nav.ourWhyLink).toHaveText('Our Why');
  });

  test('navbar should have "Our Solution" link @regression', async ({ nav }) => {
    await expect(nav.ourSolutionLink).toHaveText('Our Solution');
  });

  test('navbar should have "Contact Us" button @regression', async ({ nav }) => {
    await expect(nav.contactUsButton).toContainText('Contact Us');
  });

  // ── Our Story Section ─────────────────────────────────────────────────────
  test('"Our Story" heading should be present @regression', async ({ homePage }) => {
    await homePage.scrollToOurStory();
    await expect(homePage.ourStoryHeading).toContainText('Know my story');
  });

  test('founder name "Victor Ocando" should appear @regression', async ({ homePage }) => {
    await homePage.scrollToOurStory();
    await expect(homePage.founderName).toContainText('Victor Ocando');
  });

  test('founder title "Founder & CEO" should appear @regression', async ({ homePage }) => {
    await homePage.scrollToOurStory();
    await expect(homePage.founderTitle).toContainText('Founder');
  });

  test('LinkedIn link should be visible and have correct href @regression', async ({
    homePage,
  }) => {
    await homePage.scrollToOurStory();
    await expect(homePage.linkedInLink).toBeVisible();
    const href = await homePage.linkedInLink.getAttribute('href');
    expect(href).toContain('linkedin.com');
  });

  // ── Our Why Section ───────────────────────────────────────────────────────
  test('"Our Why" quote should mention "normalize access to events" @regression', async ({
    homePage,
  }) => {
    await homePage.scrollToOurWhy();
    await expect(homePage.ourWhyQuote).toContainText('normalize access to events');
  });

  // ── How It Works Section ──────────────────────────────────────────────────
  test('"How It Works" heading should be present @regression', async ({ homePage }) => {
    await homePage.scrollToHowItWorks();
    await expect(homePage.howItWorksHeading).toContainText('How does the app work?');
  });

  test('Step 1 should be about personalizing experience @regression', async ({ homePage }) => {
    await homePage.scrollToHowItWorks();
    await expect(homePage.step1).toContainText('STEP 1');
    await expect(homePage.step1).toContainText('Personalize');
  });

  test('Step 2 should be about finding nearby venues @regression', async ({ homePage }) => {
    await homePage.scrollToHowItWorks();
    await expect(homePage.step2).toContainText('STEP 2');
    await expect(homePage.step2).toContainText('Find nearby venues');
  });

  test('Step 3 should be about getting tickets @regression', async ({ homePage }) => {
    await homePage.scrollToHowItWorks();
    await expect(homePage.step3).toContainText('STEP 3');
    await expect(homePage.step3).toContainText('Get your tickets');
  });
});
