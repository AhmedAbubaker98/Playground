import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    await page.goto('/level1');
    
    await page.fill('#username', 'testuser');
    await page.fill('#email', 'test@example.com');
    
    await page.click('.save-btn');
    
    await expect(page.locator('#successMsg')).toBeVisible();
  });
  
});
