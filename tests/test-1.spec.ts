import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
   await page.goto('https://playwright.dev/');
   await page.screenshot({ path: 'home.png' });
   await page.getByRole('link', { name: 'Docs' }).click();
   await page.screenshot({ path: 'docs.png' });
   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

   await page.getByRole('link', { name: 'How to install Playwright' }).click();
   await expect(page.getByRole('heading', { name: 'Installing PlaywrightDirect' })).toBeVisible();
   await page.goto('https://playwright.dev/');

  // await page.getByRole('link', { name: 'MCP'}).click();
   await page.getByRole('link', { name: 'Docs' }).click();
   await page.getByRole('link', { name: 'MCP' }).click();
   await expect(page.locator('h1')).toContainText('Playwright MCP');
   await page.screenshot({ path: 'homewore.png' });

  //  a: number= 5;
  //  const b: string = '4'; 
  //  console.log("ket quả: ", a === b);
  // await expect(page.locator('h1')).toContainText('PLAYWRIGHT MCP');
});

test('testcase 2', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Learn Videos' }).click();
  await page.getByRole('heading', { name: 'Learn Videos' }).click();
  await expect(page.getByRole('heading', { name: 'Learn Videos' })).toBeVisible();
  await page.getByText('Playwright Testing Agents:').click();
  await page.getByRole('listitem').filter({ hasText: 'Playwright Testing Agents:' }).getByRole('article').click();await page.getByRole('link', { name: 'Release Videos' }).click();
  await page.getByRole('heading', { name: 'Playwright Library' }).click();
  await page.getByRole('link', { name: 'Docs' }).click();
  await page.getByRole('link', { name: 'Writing tests', exact: true }).click();
  await page.getByRole('link', { name: 'Playwright logo Playwright' }).click();
  await page.getByRole('link', { name: 'Get started' }).click();

  await page.getByRole('link', { name: 'Parallelism' }).click();
  await page.getByRole('link', { name: 'Configuration', exact: true }).click();
  await page.getByRole('link', { name: 'Configuration', exact: true }).click();
  await page.getByRole('link', { name: 'Reporters', exact: true }).click();
  await page.getByText('playwright.config.ts').first().click();
  await page.getByText('Playwright Test comes with a').click();
  await page.getByText('export').first().click();
  await page.getByText('playwright.config.ts').nth(1).click();
  await page.getByText('playwright.config.ts').nth(1).click();
});

test('Homework buổi 4', async () => {

    let i: number;
    let result: number;

    for (let i = 1; i <= 10; i++) {
        result = i * 5;
        console.log(`5 * ${i} = ${result}`);
    }

});



