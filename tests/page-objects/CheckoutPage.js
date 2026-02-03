/**
 * Checkout Page Object
 * 
 * Encapsulates checkout page interactions.
 * Imports the currency math utilities for calculations.
 */

import { calculateTotal, formatCurrency } from '../../src/logic/currency-math.js';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/level3');
  }

  async getSubtotal() {
    const text = await this.page.locator('#subtotal').textContent();
    return parseFloat(text.replace('$', ''));
  }

  async getTax() {
    const text = await this.page.locator('#tax').textContent();
    return parseFloat(text.replace('$', ''));
  }

  async getDisplayedTotal() {
    const text = await this.page.locator('#total').textContent();
    return text.replace('$', '');
  }

  /**
   * Calculate what the total SHOULD be
   */
  calculateExpectedTotal(subtotal, taxRate) {
    return calculateTotal(subtotal, taxRate);
  }

  async clickCheckout() {
    await this.page.click('#checkoutBtn');
  }

  async isConfirmationVisible() {
    return await this.page.locator('#confirmation').isVisible();
  }
}
