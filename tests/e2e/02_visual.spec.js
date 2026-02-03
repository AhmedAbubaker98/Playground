import { test, expect } from '@playwright/test';

test.describe('Level 2: Dynamic Modal', () => {
  
  test('should accept terms of service', async ({ page }) => {
    await page.goto('/level2');
    
    await page.click('#showModal');
    
    // Explicitly wait longer for the modal to appear
    await expect(page.locator('.modal-overlay')).toBeVisible({ timeout: 30000 });
    
    await page.click('.modal-accept-btn');
  });
  
});