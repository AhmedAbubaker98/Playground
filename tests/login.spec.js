const { test, expect } = require('@playwright/test');

test('user can click login button', async ({ page }) => {

  await page.goto('http://localhost:3000');

  // Fix: The button did not have the class '.btn-blue'. Using the accessible role and name selector.
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.locator('text=Sign In')).toBeVisible();
});