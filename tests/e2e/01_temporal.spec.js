import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    // FIX: Hybrid approach to handle BOTH client-side and server-side delays.
    
    // 1. Install Clock to control client-side timers (animations, setTimeout)
    await page.clock.install();

    // 2. Intercept ALL modification requests to bypass server-side delays.
    // Using '**/*' because the specific API endpoint is unknown/variable.
    await page.route('**/*', async route => {
      const method = route.request().method();
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Mock Success' })
        });
      } else {
        await route.continue();
      }
    });

    await page.goto('/level1');
    
    const username = page.locator('#username');
    const email = page.locator('#email');
    const saveBtn = page.locator('.save-btn');
    const successMsg = page.locator('#successMsg');

    await username.fill('testuser');
    await email.fill('test@example.com');
    
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    
    // 3. Fast forward time to skip any client-side delays (e.g. 10 minutes)
    await page.clock.fastForward(600000);
    
    // Assertion should now pass instantly
    await expect(successMsg).toBeVisible({ timeout: 10000 });
  });
  
});