import { test, expect } from '@playwright/test';

test.describe('Level 2: Dynamic Modal', () => {
  
  test('should accept terms of service', async ({ page }) => {
    await page.goto('/level2');
    
    await page.click('#showModal');
    
    await expect(page.locator('.modal-backdrop')).toBeVisible();
    
    await page.click('.accept-terms-btn');
    
    await expect(page.locator('#result')).toHaveText('✓ Terms Accepted');
  });
  
});
