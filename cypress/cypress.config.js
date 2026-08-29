const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Cypress TCC - SauceDemo',
    reportFilename: 'index',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: true,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    testIsolation: true,
    video: false,
    // video: true, // rodada de evidencias
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    retries: 0,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
