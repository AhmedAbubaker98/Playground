import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    // FIX: Install the clock to control time. This allows us to bypass long delays.
    // Initialize with current time to prevent issues with 1970 epoch defaults.
    await page.clock.install({ time: new Date() });

    await page.goto('/level1');
    
    const username = page.locator('#username');
    const email = page.locator('#email');
    const saveBtn = page.locator('.save-btn');
    const successMsg = page.locator('#successMsg');

    await username.fill('testuser');
    await email.fill('test@example.com');
    
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    
    // FIX: Instead of waiting for real time, fast-forward the clock.
    // This handles any setTimeout/setInterval delays instantly.
    // Fast-forwarding 10 minutes (600,000ms) to cover extreme delays.
    await page.clock.fastForward(600000);
    
    await expect(successMsg).toBeVisible();
  });
  
});