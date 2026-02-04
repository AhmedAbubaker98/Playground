// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for the Kintsugi Gauntlet
 * 
 * CRITICAL: Video recording is enabled on first retry.
 * This is essential for Level 1 (Temporal) tests where
 * Kintsugi needs to SEE the race condition happen.
 */
export default defineConfig({
  testDir: './tests/e2e',
  
  // Run tests sequentially - order matters for the gauntlet
  fullyParallel: false,
  
  // Fail fast - stop on first failure for clearer debugging
  forbidOnly: !!process.env.CI,
  
  // Retry once to capture video evidence
  retries: process.env.CI ? 1 : 0,
  
  // Single worker to ensure sequential execution
  workers: 1,
  
  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  
  use: {
    // Base URL for the test server
    baseURL: 'http://localhost:3000',
    
    // Capture trace on first retry 
    trace: 'on-first-retry',
     
    // CRITICAL: Capture video on first retry
    // This is how Kintsugi sees temporal issues
    video: 'on-first-retry',
     
    // Capture screenshot on failure
    screenshot: 'only-on-failure', 
  },

  projects: [
    {
      name: 'gauntlet',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Web server configuration
  // CI workflow starts the server separately, so always reuse existing server
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000', 
    reuseExistingServer: true,
    timeout: 30000,
  },
});
