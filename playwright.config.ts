import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Serial execution to respect rate limits
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker to avoid overwhelming API
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://api-staging.testsys.io',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },
  projects: [
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
