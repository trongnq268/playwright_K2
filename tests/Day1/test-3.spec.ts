import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
  await expect(page.getByRole('heading', { name: 'Installing PlaywrightDirect' })).toBeVisible();
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'MCP', exact: true }).click();
  // moooix locattor sex cos 1 ddiaj chi rieeng ddeer phaan bieejt chusng vowis nhuwngx thanwgf khac. Vif thees cos theer cos cais exact=true
  // phaanf tuwr cuar mooix trang sex khacs nhau. Vif thees sex cos truowngf howjp page hieenr thij exxact=tue cos truowngf howjpg khoogn

  await expect(page.getByRole('heading', { name: 'Playwright MCP', exact: true })).toBeVisible();
  await expect(page.locator('h1')).toContainText('Playwright MCP');
});

test('test2', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Learn Videos' }).click();
  await expect(page.getByRole('heading', { name: 'Learn Videos' })).toBeVisible();
  await page.getByText('Playwright Testing Agents:').click();
  await page.getByRole('button', { name: 'Watch Playwright Testing' }).click();

});
