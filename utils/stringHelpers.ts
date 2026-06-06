/**
 * String utility helpers for the Adapt the Game test suite.
 */

/**
 * Validates whether a string looks like a valid email address.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Truncates a string to a maximum length and appends an ellipsis if needed.
 */
export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}

/**
 * Normalizes whitespace in a string (collapses multiple spaces, trims).
 */
export function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Converts a string to title case.
 * e.g., "our story" → "Our Story"
 */
export function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
