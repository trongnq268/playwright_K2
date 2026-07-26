import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' }).locator('span')).toBeVisible();
  await expect(page.locator('h1')).toMatchAriaSnapshot(`- heading "Playwright enables reliable web automation for testing, scripting, and AI agents." [level=1]`);
  await expect(page.locator('h1')).toMatchAriaSnapshot(`- heading "Playwright enables reliable web automation for testing, scripting, and AI agents." [level=1]`);
await page.screenshot({ path: 'evd.png' });
});
//await page.screenshot({ path: 'evd.png' });
// leenhj treen ddeer cap man hinh. Sau moi step co the cap lai man hinh ddee xac dinh