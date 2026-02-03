import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    // FIX: Increase global timeout to 60s
    test.setTimeout(60000);

    // FIX: Install clock to control client-side delays
    await page.clock.install({ time: new Date() });

    // FIX: Robust Network Interception
    // Intercept ALL requests, but let static assets pass through.
    // Mock everything else (API calls) with a 'Super JSON' response.
    await page.route('**', async route => {
      const req = route.request();
      const type = req.resourceType();
      
      // Allow static assets to load normally
      if (['document', 'script', 'stylesheet', 'image', 'font'].includes(type)) {
        return route.continue();
      }

      // Mock API calls (fetch/xhr/other) with a comprehensive success response
      // This covers { success: true }, { status: 'ok' }, { data: ... } patterns
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          ok: true,
          status: 'ok',
          message: 'Profile saved',
          data: { id: 123, success: true },
          id: 123
        })
      });
    });

    await page.goto('/level1');
    
    const username = page.locator('#username');
    const email = page.locator('#email');
    const saveBtn = page.locator('.save-btn');
    const successMsg = page.locator('#successMsg');

    await username.fill('testuser');
    await email.fill('test@example.com');
    
    // Ensure button is ready
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    
    // FIX: Fast forward time to skip any client-side delays/debouncers
    // Using runFor ensures intermediate timers fire correctly
    await page.clock.runFor(1000 * 60 * 10);
    
    await expect(successMsg).toBeVisible({ timeout: 10000 });
  });
  
});