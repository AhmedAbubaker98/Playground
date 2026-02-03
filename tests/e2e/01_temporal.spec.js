/**
 * Level 1: The Invisible Wait
 * 
 * Tests the async save button functionality.
 * This test has a race condition - it clicks too fast.
 */

import { test, expect } from '@playwright/test';

test.describe('Level 1: Async Button', () => {
  
  test('should save user profile successfully', async ({ page }) => {
    // Navigate to the profile page
    await page.goto('/level1');
    
    // Fill in the form
    await page.fill('#username', 'testuser');
    await page.fill('#email', 'test@example.com');
    
    // Click save button
    await page.click('.save-btn');
    
    // Verify success message appears
    await expect(page.locator('#successMsg')).toBeVisible();
  });
  
});
