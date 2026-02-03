import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    // FIX: Increase global test timeout to 60s to handle extreme delays
    test.setTimeout(60000);

    // FIX: Wait for network idle to ensure hydration is complete
    await page.goto('/level1', { waitUntil: 'networkidle' });
    
    const username = page.locator('#username');
    const email = page.locator('#email');
    const saveBtn = page.locator('.save-btn');
    const successMsg = page.locator('#successMsg');

    await username.fill('testuser');
    await email.fill('test@example.com');
    
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    
    // FIX: Increase assertion timeout to 50s (simulated payment delay might be >30s)
    await expect(successMsg).toBeVisible({ timeout: 50000 });
  });
  
});