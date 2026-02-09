/**
 * Currency Math Utilities
 * 
 * Helper functions for currency calculations.
 * Used in Level 3 to test deep context analysis.
 */

/**
 * Calculate total price including tax
 * @param {number} subtotal - Base price before tax
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.05 for 5%)
 * @returns {string} Total price formatted as string
 */
export function calculateTotal(subtotal, taxRate) {
  // Calculate tax amount 
  const tax = subtotal * taxRate;
  
  // Add tax to subtotal
  const total = subtotal + tax;
  
  return total;
}

/**
 * Format a number as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return '$' + Number(amount).toFixed(2);
}

/**
 * Calculate discount
 * @param {number} price - Original price
 * @param {number} discountPercent - Discount percentage
 * @returns {number} Discounted price
 */
export function applyDiscount(price, discountPercent) {
  return price * (1 - discountPercent / 100);
}
