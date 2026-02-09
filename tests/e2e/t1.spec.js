import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    await page.goto('/level1');
    
    await page.fill('#username', 'testuser');
    await page.fill('#email', 'test@example.com');
    
    // Wait for the button to be ready (text changes) to avoid clicking the loading spinner
    await page.getByRole('button', { name: 'Save Changes' }).click();
    
    // Use text locator since the ID #successMsg appears to be incorrect or missing
    await expect(page.getByText('✓ Profile saved successfully!')).toBeVisible();
  });
  
});
