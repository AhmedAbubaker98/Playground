import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    await page.goto('/level1');
    
    await page.fill('#username', 'testuser');
    await page.fill('#email', 'test@example.com');
    
    // Use role-based selector to wait for button to finish loading
    await page.getByRole('button', { name: 'Save Changes' }).click();
    
    await expect(page.locator('#saveSuccess')).toBeVisible();
  });
  
});
