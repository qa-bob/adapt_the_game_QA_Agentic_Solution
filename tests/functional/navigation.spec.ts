import { test, expect } from '../../fixtures/index';

/**
 * Functional Tests — Site Navigation
 *
 * Verifies that all navigation links scroll to the correct sections
 * and that the navbar renders correctly across interaction states.
 */
test.describe('Navigation Functional Tests @functional', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
  });

  test('should have a visible navbar at page load @functional', async ({ nav }) => {
    await nav.assertNavVisible();
  });

  test('should scroll to "Our Story" section when nav link is clicked @functional', async ({
    nav,
    homePage,
  }) => {
    await nav.clickOurStory();
    await expect(homePage.ourStorySection).toBeInViewport();
  });

  test('should scroll to "Our Why" section when nav link is clicked @functional', async ({
    nav,
    homePage,
  }) => {
    await nav.clickOurWhy();
    await expect(homePage.ourWhySection).toBeInViewport();
  });

  test('should scroll to "Our Solution" section when nav link is clicked @functional', async ({
    nav,
    homePage,
  }) => {
    await nav.clickOurSolution();
    await expect(homePage.howItWorksSection).toBeInViewport();
  });

  test('should scroll to contact form when "Contact Us" is clicked @functional', async ({
    nav,
    contactPage,
  }) => {
    await nav.clickContactUs();
    await expect(contactPage.contactSection).toBeInViewport();
  });

  test('should display the desktop nav logo @functional', async ({ nav }) => {
    await expect(nav.logoDesktop).toBeVisible();
  });

  test('nav logo should link back to the hero section @functional', async ({ nav, page }) => {
    // Navigate away from top then come back via logo
    await nav.clickContactUs();
    await nav.logoDesktop.click();
    await expect(page).toHaveURL(/adaptthegame\.io/);
  });
});
