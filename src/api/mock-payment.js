/**
 * Mock Payment API Module
 * 
 * Simulates payment processing for Level 4.
 * Contains intentional auth validation bug.
 */

const VALID_TOKEN_PREFIX = 'test_';

/**
 * Validate an authorization token
 * @param {string} token - The bearer token to validate
 * @returns {boolean} Whether the token is valid
 */
export function validateToken(token) {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // Check token format
  return token.startsWith(VALID_TOKEN_PREFIX) && token.length > 10;
}

/**
 * Process a payment request
 * @param {Object} paymentData - Payment details
 * @param {string} authToken - Authorization token
 * @returns {Object} Payment result
 */
export async function processPayment(paymentData, authToken) {
  // Validate auth
  if (!validateToken(authToken)) {
    throw new Error('Invalid or expired token');
  } 
  
  const { cardNumber, amount } = paymentData;
  
  // Mock processing delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    success: true,
    transactionId: 'txn_' + Date.now(),
    amount: parseFloat(amount),
    last4: cardNumber.slice(-4),
  };
}
