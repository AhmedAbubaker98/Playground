const { test, expect } = require('@playwright/test');

test('user can click login button', async ({ page }) => {
  // 1. Go to the app (assuming localhost or static build)
  // For demo simplicity, we can inject HTML directly if not running a server,
  // or just navigate to a dummy page. Let's assume the app runs on port 3000.
  await page.goto('http://localhost:3000');

  // 2. THIS WILL FAIL
  // The code has '.btn-primary', but we are looking for '.btn-blue'
  // Kintsugi should fix this to: await page.click('.btn-primary');
  await page.click('.btn-blue', { timeout: 4000 });

  // 3. Assertion
  await expect(page.locator('text=Sign In')).toBeVisible();
});