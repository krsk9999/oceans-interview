import { test, expect } from '@playwright/test';

test.describe('Example tests', () => {

  test('has title', async ({ page }) => {
  await page.goto('');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Practice - Ultimate QA/);
});

test('get started link', async ({ page }) => {
  await page.goto('');

  // Click the get started link.
  await page.getByRole('link', { name: 'Big page with many elements' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Skills Improved:' })).toBeVisible();

  await page.waitForTimeout(5000);
});

});
