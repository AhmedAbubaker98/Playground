/**
 * Level 2: Chaos CSS
 * 
 * Tests the terms of service modal.
 * The modal uses obfuscated class names that change on every load.
 */

import { test, expect } from '@playwright/test';

test.describe('Level 2: Dynamic Modal', () => {
  
  test('should accept terms of service', async ({ page }) => {
    // Navigate to the terms page
    await page.goto('/level2');
    
    // Click to open the modal
    await page.click('#showModal');
    
    // Wait for modal to be visible
    await expect(page.locator('.modal-overlay')).toBeVisible();
    
    // Click the accept button
    await page.click('.modal-accept-btn');
    
    // Verify acceptance is shown
    await expect(page.locator('#result')).toHaveText('✓ Terms Accepted');
  });
  
});
