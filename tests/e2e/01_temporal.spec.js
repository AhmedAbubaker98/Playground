import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    // FIX: The delay is server-side (mock-payment.js), so page.clock won't work.
    // We must intercept the network request to bypass the backend delay.
    await page.route('**/api/**', async route => {
      if (route.request().method() === 'POST') {
        // Return a mock success response immediately
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Profile saved' })
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
    
    // With the network mock, the response should be near-instant.
    await expect(successMsg).toBeVisible({ timeout: 5000 });
  });
  
});