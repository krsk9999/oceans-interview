/**
 * Shared type definitions used across fixtures, pages, and utilities.
 */

export interface AppConfig {
  baseUrl: string;
  environment: 'dev' | 'qa' | 'prod';
}
