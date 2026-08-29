import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: 0,

  reporter: [['html', { open: 'never' }]],

  expect: { timeout: 8000 },

  use: {
    baseURL: 'https://www.saucedemo.com',
    actionTimeout: 8000,
    navigationTimeout: 60000,

    video: 'off',
    // video: 'on', // rodada de evidencias
    trace: 'off',
    screenshot: 'only-on-failure',
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
