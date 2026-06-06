/**
 * URL and navigation utility helpers.
 */

/** Expected anchor section IDs on the Adapt the Game homepage */
export const SECTION_IDS = {
  HOME: '#home',
  OUR_STORY: '#my-story',
  OUR_WHY: '#our_why',
  HOW_IT_WORKS: '#how-will-work-section',
  CONTACT: '#contact-form-section',
} as const;

/**
 * Returns the full URL for a given anchor section.
 * @param baseUrl - The site base URL (without trailing slash)
 * @param sectionId - The anchor ID (with or without leading '#')
 */
export function buildAnchorUrl(baseUrl: string, sectionId: string): string {
  const anchor = sectionId.startsWith('#') ? sectionId : `#${sectionId}`;
  return `${baseUrl}/${anchor}`;
}
