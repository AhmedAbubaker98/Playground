const { test, expect } = require('@playwright/test');

test('user can click login button', async ({ page }) => {

  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.locator('text=Sign In')).toBeVisible();
});