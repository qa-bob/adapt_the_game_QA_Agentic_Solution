/**
 * Form test data helpers for the Adapt the Game test suite.
 */

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

/** Valid contact form submission data */
export const validContactData: ContactFormData = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  message: 'I would love to learn more about Adapt the Game and ADA venue accessibility.',
};

/** Contact form data with invalid email */
export const invalidEmailContactData: ContactFormData = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'not-a-valid-email',
  message: 'Testing invalid email handling.',
};

/** Contact form data with missing required fields */
export const missingFieldsContactData: Partial<ContactFormData> = {
  firstName: 'Alex',
  // lastName, email, message intentionally omitted
};

/** Valid email addresses for hero sign-up form testing */
export const validEmails = [
  'test.user@example.com',
  'qa+adapt@testmail.io',
  'user123@gmail.com',
];

/** Invalid email addresses for hero sign-up form testing */
export const invalidEmails = [
  'notanemail',
  '@nodomain.com',
  'missing@',
  'spaces in@email.com',
];

/**
 * Generates a unique test email to avoid Mailchimp duplicate errors.
 * Uses a timestamp to ensure uniqueness.
 */
export function generateUniqueEmail(prefix = 'qa.test'): string {
  const timestamp = Date.now();
  return `${prefix}+${timestamp}@example.com`;
}
