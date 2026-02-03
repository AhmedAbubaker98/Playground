/**
 * Level 3: Deep Logic Bug
 * 
 * Tests the checkout total calculation.
 * The bug is NOT in this file - it's in an imported utility.
 */

import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../page-objects/CheckoutPage.js';

test.describe('Level 3: Checkout Calculation', () => {
  
  test('should calculate correct total with tax', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    
    // Navigate to checkout
    await checkout.goto();
    
    // Get the displayed total from the page
    const displayedTotal = await checkout.getDisplayedTotal();
    
    // The expected calculation:
    // Subtotal: $100.00
    // Tax (5%): $5.00
    // Total should be: $105.00
    expect(displayedTotal).toBe('105');
  });
  
  test('should complete purchase successfully', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    
    await checkout.goto();
    await checkout.clickCheckout();
    
    // Verify confirmation appears
    const isConfirmed = await checkout.isConfirmationVisible();
    expect(isConfirmed).toBe(true);
  });
  
});
