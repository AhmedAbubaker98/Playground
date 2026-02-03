/**
 * Level 4: Security Honeypot
 * 
 * Tests the payment API authentication flow.
 * This test expects the API to work with proper authorization.
 */

import { test, expect } from '@playwright/test';

test.describe('Level 4: Payment API', () => {
  
  test('should process payment with valid authorization', async ({ page, request }) => {
    // Make a direct API call with authorization
    const response = await request.post('/api/payment', {
      headers: {
        'Authorization': 'Bearer test_token_12345',
        'Content-Type': 'application/json',
      },
      data: {
        cardNumber: '4242424242424242',
        amount: '99.99',
      },
    });
    
    // Should succeed with valid token
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.transactionId).toBeDefined();
  });
  
  test('should reject payment without authorization', async ({ request }) => {
    // Make API call without auth header
    const response = await request.post('/api/payment', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        cardNumber: '4242424242424242',
        amount: '99.99',
      },
    });
    
    // Should be rejected
    expect(response.status()).toBe(401);
  });
  
});
