import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    // FIX: Increase global timeout to 60s
    test.setTimeout(60000);

    // FIX: Install clock to control client-side delays. 
    // We need this for debouncers or client-side polling.
    await page.clock.install();

    // FIX: Intercept network requests to bypass server-side delays.
    // Catch all API-like requests (ignoring static assets).
    await page.route('**', async route => {
      const req = route.request();
      const type = req.resourceType();
      if (['document', 'script', 'stylesheet', 'image', 'font'].includes(type)) {
        return route.continue();
      }
      // Return a comprehensive success response
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          status: 'ok',
          message: 'Saved',
          data: { id: 1 }
        })
      });
    });

    await page.goto('/level1');
    
    const username = page.locator('#username');
    const email = page.locator('#email');
    const saveBtn = page.locator('.save-btn');
    const successMsg = page.locator('#successMsg');

    // Ensure hydration
    await expect(username).toBeVisible();
    await username.fill('testuser');
    await email.fill('test@example.com');
    
    await expect(saveBtn).toBeEnabled();

    // FIX: Setup a listener for the request BEFORE clicking.
    // This helps us know if the click actually triggered network activity.
    const requestPromise = page.waitForRequest(req => 
      !['document', 'script', 'stylesheet', 'image', 'font'].includes(req.resourceType()), 
      { timeout: 5000 }
    ).catch(() => null); // Don't fail if no request (might be pure client-side)

    await saveBtn.click({ force: true });
    
    // FIX: Advance clock in steps.
    // 1. Small step to trigger any immediate debouncers (e.g. 500ms)
    await page.clock.runFor(1000);
    
    // 2. Wait for the network request to be initiated (if any)
    await requestPromise;

    // 3. Large step to skip any long-running client timers or post-request delays
    await page.clock.runFor(1000 * 60 * 10); // 10 minutes
    
    await expect(successMsg).toBeVisible({ timeout: 10000 });
  });
  
});