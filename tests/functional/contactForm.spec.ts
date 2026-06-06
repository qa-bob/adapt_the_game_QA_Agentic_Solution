import { test, expect } from '../../fixtures/index';
import { validContactData, invalidEmailContactData } from '../../fixtures/testData';

/**
 * Functional Tests — Contact Form
 *
 * Tests the "Want to learn more?" contact form in the bottom section.
 *
 * NOTE: The form uses Webflow's native form handler (GET method).
 * Full end-to-end submission success is tested separately; these
 * tests focus on form rendering, validation, and field behavior.
 */
test.describe('Contact Form @functional', () => {
  test.beforeEach(async ({ contactPage }) => {
    await contactPage.goto();
  });

  test('should display all contact form fields @functional', async ({ contactPage }) => {
    await contactPage.assertFormVisible();
  });

  test('should display the section heading @functional', async ({ contactPage }) => {
    await expect(contactPage.sectionHeading).toBeVisible();
  });

  test('should allow typing into the First Name field @functional', async ({ contactPage }) => {
    await contactPage.fillFirstName('Jane');
    expect(await contactPage.getFirstNameValue()).toBe('Jane');
  });

  test('should allow typing into the Last Name field @functional', async ({ contactPage }) => {
    await contactPage.fillLastName('Doe');
    expect(await contactPage.getLastNameValue()).toBe('Doe');
  });

  test('should allow typing into the Email field @functional', async ({ contactPage }) => {
    await contactPage.fillEmail('jane@example.com');
    expect(await contactPage.getEmailValue()).toBe('jane@example.com');
  });

  test('should allow typing into the Message textarea @functional', async ({ contactPage }) => {
    const msg = 'I have a question about ADA venue access.';
    await contactPage.fillMessage(msg);
    expect(await contactPage.getMessageValue()).toBe(msg);
  });

  test('should mark First Name input as required @functional', async ({ contactPage }) => {
    const required = await contactPage.firstNameInput.getAttribute('required');
    expect(required).not.toBeNull();
  });

  test('should mark Last Name input as required @functional', async ({ contactPage }) => {
    const required = await contactPage.lastNameInput.getAttribute('required');
    expect(required).not.toBeNull();
  });

  test('should mark Email input as required @functional', async ({ contactPage }) => {
    const required = await contactPage.emailInput.getAttribute('required');
    expect(required).not.toBeNull();
  });

  test('should mark Message textarea as required @functional', async ({ contactPage }) => {
    const required = await contactPage.messageTextarea.getAttribute('required');
    expect(required).not.toBeNull();
  });

  test('should not submit form when all required fields are empty @functional', async ({
    contactPage,
  }) => {
    await contactPage.submitButton.click();
    await expect(contactPage.successMessage).not.toBeVisible();
  });

  test('should accept a valid email format in the Email field @functional', async ({
    contactPage,
  }) => {
    await contactPage.fillEmail(validContactData.email);
    expect(await contactPage.getEmailValue()).toBe(validContactData.email);
  });

  test('should fill all fields with valid data @functional', async ({ contactPage }) => {
    await contactPage.fillFirstName(validContactData.firstName);
    await contactPage.fillLastName(validContactData.lastName);
    await contactPage.fillEmail(validContactData.email);
    await contactPage.fillMessage(validContactData.message);

    expect(await contactPage.getFirstNameValue()).toBe(validContactData.firstName);
    expect(await contactPage.getLastNameValue()).toBe(validContactData.lastName);
    expect(await contactPage.getEmailValue()).toBe(validContactData.email);
    expect(await contactPage.getMessageValue()).toBe(validContactData.message);
  });
});
