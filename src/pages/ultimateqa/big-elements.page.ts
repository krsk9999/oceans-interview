import type { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * BigElementsPage represents the "Big page with many elements" practice page.
 * URL: https://ultimateqa.com/big-page-with-many-elements/
 *
 * Used to practice interacting with a page that contains a large number of
 * elements across multiple sections.
 */
export class BigElementsPage extends BasePage {
  // ============================================
  // LOCATORS
  // ============================================

  /** "Skills Improved:" heading that confirms the page has loaded correctly. */
  readonly $skillsImprovedHeading: Locator;

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor(page: Page) {
    super(page);
    this.$skillsImprovedHeading = this.page.getByRole('heading', { name: 'Skills Improved:' });
  }
}
