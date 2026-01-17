const { test, expect } = require('@playwright/test');

test('user can click login button', async ({ page }) => {

  await page.goto('http://localhost:3000');

  // The button is visible and labeled "Sign In". Using text locator for stability.
  await page.click('text=Sign In');

  await expect(page.locator('text=Sign In')).toBeVisible();
});