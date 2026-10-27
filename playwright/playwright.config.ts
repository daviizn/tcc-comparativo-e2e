import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: '100%',
  forbidOnly: !!process.env.CI,
  retries: 2,

  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'resultados/relatorio.json' }],
    ['junit', { outputFile: 'resultados/junit.xml' }],
  ],

  expect: { timeout: 8000 },

  use: {
    baseURL: 'https://www.saucedemo.com',
    actionTimeout: 8000,
    navigationTimeout: 60000,
    video: 'on',
    screenshot: 'on',
    trace: 'on',
  },

  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: true,
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'msedge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        headless: true,
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: true,
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        headless: true,
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
