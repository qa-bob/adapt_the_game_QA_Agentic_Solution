import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ContactPage — Page Object for the Contact Us section.
 *
 * The contact form lives at the bottom of the single-page site at '#contact-form-section'.
 */
export class ContactPage extends BasePage {
  readonly contactSection: Locator;
  readonly sectionHeading: Locator;
  readonly sectionSubtext: Locator;

  // Form fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;

  // Form feedback
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.contactSection = page.locator('#contact-form-section');
    this.sectionHeading = page.getByText(/want to.*learn more/i).first();
    this.sectionSubtext = page.getByText(/send us any questions/i);

    this.firstNameInput = page.locator('#First-Name');
    this.lastNameInput = page.locator('#Last-Name');
    this.emailInput = page.locator('#Email');
    this.messageTextarea = page.locator('#contact-message');
    this.submitButton = page.locator('#contact-us-form input[type="submit"]');
    this.successMessage = page.locator('#contact-us-form').locator('..').locator('.w-form-done');
    this.errorMessage = page.locator('#contact-us-form').locator('..').locator('.w-form-fail');
  }

  /** Navigate directly to the home page and scroll to the contact section */
  async goto(): Promise<void> {
    await this.navigate('/');
    await this.contactSection.scrollIntoViewIfNeeded();
  }

  /**
   * Fills and submits the contact form with the provided data.
   */
  async fillAndSubmit(data: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.messageTextarea.fill(data.message);
    await this.submitButton.click();
  }

  /** Fill only the first name field */
  async fillFirstName(value: string): Promise<void> {
    await this.firstNameInput.fill(value);
  }

  /** Fill only the last name field */
  async fillLastName(value: string): Promise<void> {
    await this.lastNameInput.fill(value);
  }

  /** Fill only the email field */
  async fillEmail(value: string): Promise<void> {
    await this.emailInput.fill(value);
  }

  /** Fill only the message textarea */
  async fillMessage(value: string): Promise<void> {
    await this.messageTextarea.fill(value);
  }

  /** Assert the contact section is visible with form elements */
  async assertFormVisible(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.messageTextarea).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /** Assert success message is displayed after form submission */
  async assertSubmitSuccess(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  /** Assert error message is displayed on form failure */
  async assertSubmitError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  /** Get first name input value */
  async getFirstNameValue(): Promise<string> {
    return this.firstNameInput.inputValue();
  }

  /** Get last name input value */
  async getLastNameValue(): Promise<string> {
    return this.lastNameInput.inputValue();
  }

  /** Get email input value */
  async getEmailValue(): Promise<string> {
    return this.emailInput.inputValue();
  }

  /** Get message textarea value */
  async getMessageValue(): Promise<string> {
    return this.messageTextarea.inputValue();
  }
}
