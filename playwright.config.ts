import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  globalSetup: './tests/global-setup.ts',
  testDir: './tests',
  fullyParallel: false, // Serial execution to respect rate limits
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker to avoid overwhelming API
  reporter: [
    ['./src/reporters/api-progress-reporter.js', { outputFile: 'api-progress.json' }], // Focused API progress
    ['./src/reporters/dashboard-reporter.js', { outputFile: 'test-dashboard.html' }], // Full dashboard
    ['html'] // Default HTML reporter
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://api-staging.testsys.io',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },
  projects: [
    {
      name: 'phase1-tests',
      testMatch: 'tests/phase1/**/*.test.ts',
      use: {
        // Phase 1 tests will handle their own auth
      },
    },
    {
      name: 'contract-tests',
      testMatch: 'tests/contract/**/*.spec.ts',
      use: {
        // Contract tests will handle their own auth
      },
    },
    {
      name: 'unit-tests',
      testMatch: 'tests/unit/**/*.spec.ts',
    },
  ],
  timeout: 30000, // 30s timeout for API calls
  expect: {
    timeout: 10000,
  },
});
