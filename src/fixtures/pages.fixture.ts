import { test as base } from '@playwright/test';
import { AutomationHomePage, BigElementsPage } from '@pages';

/**
 * Page Object fixtures.
 *
 * Register every new Page Object here so it is available as an
 * injectable parameter in tests. Tests should never `new` a page
 * object directly — always pull it from the fixture.
 */
export const pages = base.extend<{
  automationHomePage: AutomationHomePage;
  bigElementsPage: BigElementsPage;
}>({
  automationHomePage: async ({ page }, use) => {
    await use(new AutomationHomePage(page));
  },
  bigElementsPage: async ({ page }, use) => {
    await use(new BigElementsPage(page));
  },
});
