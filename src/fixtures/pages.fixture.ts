import { test as base } from '@playwright/test';

/**
 * Page Object fixtures.
 *
 * Register every new Page Object here so it is available as an
 * injectable parameter in tests. Tests should never `new` a page
 * object directly — always pull it from the fixture.
 *
 * Example:
 *   export const pages = base.extend<{ loginPage: LoginPage }>({
 *     loginPage: async ({ page }, use) => {
 *       await use(new LoginPage(page));
 *     },
 *   });
 */
export const pages = base.extend({});
