import { test, expect } from '../../fixtures/index';

/**
 * Smoke Tests — Adapt the Game Homepage
 *
 * Critical path checks. These run on every push and must pass before
 * any functional or regression tests are executed.
 */
test.describe('Homepage Smoke Tests @smoke', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should load the homepage and display correct title @smoke', async ({ page }) => {
    await expect(page).toHaveTitle(/Adapt The Game/i);
  });

  test('should display the hero section with heading and sign-up form @smoke', async ({
    homePage,
  }) => {
    await homePage.assertHeroVisible();
  });

  test('should display the site logo in the hero @smoke', async ({ homePage }) => {
    await expect(homePage.heroLogo).toBeVisible();
  });

  test('should display the hero heading text @smoke', async ({ homePage }) => {
    await expect(homePage.heroHeading).toHaveText(/the inclusive way to book ahead/i);
  });

  test('should display all navigation links @smoke', async ({ nav }) => {
    await nav.assertNavVisible();
  });

  test('should display the "Our Story" section @smoke', async ({ homePage }) => {
    await homePage.scrollToOurStory();
    await homePage.assertOurStorySectionVisible();
  });

  test('should display the "Our Why" section @smoke', async ({ homePage }) => {
    await homePage.scrollToOurWhy();
    await homePage.assertOurWhySectionVisible();
  });

  test('should display the "How It Works" section with 3 steps @smoke', async ({ homePage }) => {
    await homePage.scrollToHowItWorks();
    await homePage.assertHowItWorksSectionVisible();
  });

  test('should display the contact form @smoke', async ({ contactPage }) => {
    await contactPage.goto();
    await contactPage.assertFormVisible();
  });

  test('should return HTTP 200 and not redirect to an error page @smoke', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
  });
});
