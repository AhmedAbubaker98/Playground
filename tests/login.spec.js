const { test, expect } = require('@playwright/test');

test('user can click login button', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: 'Sign In' }).click();

  // After clicking 'Sign In', the user should navigate away from the login page.
  // We assert that the 'Login Page' heading is no longer visible.
  await expect(page.getByRole('heading', { name: 'Login Page' })).toBeHidden();
});