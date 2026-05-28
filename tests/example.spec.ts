import { test, expect } from '@fixtures';
import type { AutomationHomePage, BigElementsPage } from '@pages';

test.describe('Example tests', { tag: '@smoke' }, () => {
  test('has title', async ({
    page,
    automationHomePage,
  }: {
    page: import('@playwright/test').Page;
    automationHomePage: AutomationHomePage;
  }) => {
    await test.step('Navigate to the automation home page', async () => {
      await automationHomePage.gotoAutomationHome();
    });

    await test.step('Validate page title contains "Automation Practice - Ultimate QA"', async () => {
      await expect(page).toHaveTitle(/Automation Practice - Ultimate QA/);
    });
  });

  test('get started link', async ({
    automationHomePage,
    bigElementsPage,
  }: {
    automationHomePage: AutomationHomePage;
    bigElementsPage: BigElementsPage;
  }) => {
    await test.step('Navigate to the automation home page', async () => {
      await automationHomePage.gotoAutomationHome();
    });

    await test.step('Click the "Big page with many elements" link', async () => {
      await expect(automationHomePage.$bigPageLink).toBeVisible();
      await automationHomePage.clickBigPageLink();
    });

    await test.step('Validate "Skills Improved:" heading is visible', async () => {
      await expect(bigElementsPage.$skillsImprovedHeading).toBeVisible();
    });
  });
});
