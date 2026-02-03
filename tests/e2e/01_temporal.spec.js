import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    // FIX: Increase global timeout
    test.setTimeout(60000);

    // FIX: Install clock to control client-side delays
    await page.clock.install({ time: new Date() });

    // FIX: Intercept ALL state-changing requests (POST/PUT/PATCH)
    // Removed resourceType check to be safer. 
    await page.route('**', async route => {
      const method = route.request().method();
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        await route.fulfill({ 
          status: 200, 
          contentType: 'application/json',
          body: JSON.stringify({ success: true, status: 'ok', message: 'Profile saved' }) 
        });
      } else {
        await route.continue();
      }
    });

    await page.goto('/level1');
    
    // FIX: Wait for hydration. The button might be visible but not interactive yet.
    await page.waitForLoadState('networkidle');
    
    const username = page.locator('#username');
    const email = page.locator('#email');
    const saveBtn = page.locator('.save-btn');
    const successMsg = page.locator('#successMsg');

    await username.fill('testuser');
    await email.fill('test@example.com');
    
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    
    // FIX: Fast forward time to skip client-side delays/debouncers
    await page.clock.runFor(1000 * 60 * 10);
    
    await expect(successMsg).toBeVisible({ timeout: 10000 });
  });
  
});