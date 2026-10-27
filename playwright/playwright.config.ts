import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  workers: 1,

  forbidOnly: !!process.env.CI,

  retries: 0,

  reporter: [['list']],

  expect: { timeout: 8000 },

  use: {
    baseURL: 'https://www.saucedemo.com',
    actionTimeout: 8000,
    navigationTimeout: 60000,

    video: 'off',
    trace: 'off',
    screenshot: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        channel: 'chrome',
        headless: true,
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
