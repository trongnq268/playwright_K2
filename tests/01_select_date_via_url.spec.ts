import { test, expect } from '@playwright/test';

test('Cách 1: Select date range via URL query parameters', async ({ page }) => {
  // Navigate directly with updated checkin and checkout query parameters
  await page.goto('https://automationintesting.online/reservation/1?checkin=2026-08-02&checkout=2026-08-30');

  // Verify URL updated correctly
  expect(page.url()).toContain('checkin=2026-08-02');
  expect(page.url()).toContain('checkout=2026-08-30');

  // Verify Price Summary displays 28 nights
  const priceSummary = page.getByText(/28 nights/i);
  await expect(priceSummary).toBeVisible();
});
