const { test, expect } = require('@playwright/test');

test('user can click login button', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.click('.btn-blue', { timeout: 4000 });

  await expect(page.locator('text=Sign In')).toBeVisible();
});