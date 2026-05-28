import type { Page, Locator, Response } from '@playwright/test';

/**
 * BasePage
 *
 * Foundation class for every Page Object in the framework.
 * Exposes the shared `page` instance and a small set of stable,
 * generic helpers that every page-derived class can reuse.
 *
 * Rules:
 *  - NEVER add assertions here. Assertions belong in test specs.
 *  - Keep helpers generic. Page-specific logic belongs in the child page.
 *  - Prefer Playwright auto-waiting over arbitrary timeouts.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to the configured baseURL.
   */
  async goto(path: string = '/'): Promise<Response | null> {
    return this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Reload the current page.
   */
  async reload(): Promise<Response | null> {
    return this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait until the network is idle. Use sparingly — prefer waiting on a
   * specific locator's visibility for stability.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Return the current URL.
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Return the current page title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Generic locator helper for child classes that need ad-hoc lookups.
   * Children should still prefer defining named `readonly $locator` props.
   */
  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Scroll a locator into view (no-op if already visible).
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Capture a full-page screenshot. Useful for ad-hoc debugging in
   * page-level helpers; tests should rely on Playwright's built-in
   * `screenshot: 'only-on-failure'` config.
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
  }

  /**
   * Press a single key on the keyboard (e.g. 'Enter', 'Escape').
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }
}
