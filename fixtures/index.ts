import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';
import { NavigationComponent } from '../pages/NavigationComponent';

/**
 * Custom Playwright fixtures for the Adapt the Game test suite.
 *
 * Usage in tests:
 *   import { test } from '../fixtures';
 *   test('example', async ({ homePage, contactPage, nav }) => { ... });
 */
type AdaptTheGameFixtures = {
  homePage: HomePage;
  contactPage: ContactPage;
  nav: NavigationComponent;
};

export const test = base.extend<AdaptTheGameFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await use(contactPage);
  },
  nav: async ({ page }, use) => {
    const nav = new NavigationComponent(page);
    await use(nav);
  },
});

export { expect } from '@playwright/test';
