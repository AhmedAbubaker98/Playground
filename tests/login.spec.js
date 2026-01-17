const { test, expect } = require('@playwright/test');

test('user can click login button', async ({ page }) => {

  await page.goto('http://localhost:3000');

  // Fix: The button did not have the class '.btn-blue'. Using the accessible role and name selector.
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Kintsugi Fix: Wait for network activity to settle, ensuring asynchronous login/navigation completes before assertion.
  await page.waitForLoadState('networkidle');

  // Assertion fixed: After clicking 'Sign In', the user should navigate away, meaning the 'Login Page' heading should disappear.
  await expect(page.getByRole('heading', { name: 'Login Page' })).not.toBeVisible();
});