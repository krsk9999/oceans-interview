import { test as base } from '@playwright/test';

/**
 * Utility fixtures (auth helpers, data builders, API clients, etc.).
 *
 * Keep these focused on cross-cutting concerns that tests should not
 * implement directly. Register new utility fixtures here.
 */
export const utils = base.extend({});
