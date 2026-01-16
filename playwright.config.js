const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    // CRITICAL: Take screenshot when a test fails
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});