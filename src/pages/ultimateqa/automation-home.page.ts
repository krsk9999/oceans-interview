import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * AutomationHomePage represents the Ultimate QA automation practice landing page.
 * URL: https://ultimateqa.com/automation (resolved via baseURL)
 *
 * Contains navigation links to the various practice sub-pages.
 */
export class AutomationHomePage extends BasePage {
  // ============================================
  // LOCATORS
  // ============================================

  /** Link that navigates to the "Big page with many elements" sub-page. */
  readonly $bigPageLink: Locator;

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor(page: Page) {
    super(page);
    this.$bigPageLink = this.page.getByRole('link', { name: 'Big page with many elements' });
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================

  /**
   * Navigate to the automation home page.
   * Relies on the baseURL set in playwright.config.ts — passes an empty
   * string so Playwright resolves it to the root of baseURL.
   */
  async gotoAutomationHome(): Promise<void> {
    await this.goto('');
  }

  // ============================================
  // ACTION METHODS
  // ============================================

  /**
   * Click the "Big page with many elements" navigation link.
   */
  async clickBigPageLink(): Promise<void> {
    await this.$bigPageLink.click();
  }
}
