import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    await page.goto('/level1');
    
    // Use locators for better readability
    const username = page.locator('#username');
    const email = page.locator('#email');
    const saveBtn = page.locator('.save-btn');
    const successMsg = page.locator('#successMsg');

    await username.fill('testuser');
    await email.fill('test@example.com');
    
    // Ensure button is ready/enabled before clicking (handles hydration/validation delays)
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
    
    // FIX: Increase timeout to handle the 'Temporal' async delay.
    // The operation likely takes longer than the default 5000ms.
    await expect(successMsg).toBeVisible({ timeout: 20000 });
  });
  
});