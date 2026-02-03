import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../page-objects/CheckoutPage.js';

test.describe('Level 3: Checkout Calculation', () => {
  
  test('should calculate correct total with tax', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    
    await checkout.goto();
    
    const displayedTotal = await checkout.getDisplayedTotal();
    
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
