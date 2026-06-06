import { test, expect } from '../../fixtures/index';
import { generateUniqueEmail, invalidEmails } from '../../fixtures/testData';

/**
 * Functional Tests — Hero Email Sign-Up Form
 *
 * Tests the Mailchimp-backed email sign-up form in the hero section.
 *
 * NOTE: The form submits to Mailchimp. Actual email deliverability is
 * not validated here — only the UI state and input validation behavior.
 */
test.describe('Hero Sign-Up Form @functional', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.assertHeroVisible();
  });

  test('should display the email input with correct placeholder @functional', async ({
    homePage,
  }) => {
    const placeholder = await homePage.getHeroEmailPlaceholder();
    expect(placeholder).toContain('email');
  });

  test('should display the "Sign Up" submit button @functional', async ({ homePage }) => {
    await expect(homePage.heroSignUpButton).toBeVisible();
    await expect(homePage.heroSignUpButton).toBeEnabled();
  });

  test('should allow typing into the email input @functional', async ({ homePage }) => {
    const email = 'test@example.com';
    await homePage.heroEmailInput.fill(email);
    expect(await homePage.getHeroEmailValue()).toBe(email);
  });

  test('should clear the email input field @functional', async ({ homePage }) => {
    await homePage.heroEmailInput.fill('something@example.com');
    await homePage.clearHeroEmailInput();
    expect(await homePage.getHeroEmailValue()).toBe('');
  });

  test('should require an email before allowing form submission @functional', async ({
    homePage,
    page,
  }) => {
    // Attempt submit with empty field — browser native validation should block it
    await homePage.heroSignUpButton.click();
    // The form should NOT show the success message
    await expect(homePage.heroSuccessMessage).not.toBeVisible();
  });

  for (const invalidEmail of invalidEmails) {
    test(`should reject invalid email "${invalidEmail}" @functional`, async ({
      homePage,
      page,
    }) => {
      await homePage.heroEmailInput.fill(invalidEmail);
      await homePage.heroSignUpButton.click();
      // Browser HTML5 validation should prevent submission of invalid emails
      // Success message must NOT appear
      await expect(homePage.heroSuccessMessage).not.toBeVisible();
    });
  }

  test('should show the email input as required @functional', async ({ homePage }) => {
    const required = await homePage.heroEmailInput.getAttribute('required');
    // Attribute exists (even if value is empty string)
    expect(required).not.toBeNull();
  });
});
