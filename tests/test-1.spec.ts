import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationintesting.online/');
  await page.getByRole('textbox').first().click();
});