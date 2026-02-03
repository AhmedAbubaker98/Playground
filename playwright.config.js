import { defineConfig, devices } from '@playwright/test';

const config = {
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

// Only configure webServer if NOT in CI.
// In CI, the pipeline (stress-test.yml) starts the server manually in a previous step.
// Defining it here causes a port conflict error even with reuseExistingServer: true.
if (!process.env.CI) {
  config.webServer = {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  };
}

export default defineConfig(config);