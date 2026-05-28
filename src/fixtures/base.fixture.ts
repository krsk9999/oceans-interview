import { mergeTests } from '@playwright/test';
import { pages } from './pages.fixture';
import { utils } from './utils.fixtures';

/**
 * Merges page and utility fixtures into the project-wide `test` object.
 * Import `test` and `expect` from `@fixtures` in every spec.
 */
export const test = mergeTests(pages, utils);
export { expect } from '@playwright/test';
