import { test, expect } from '@playwright/test';
//Mượn tài nguyên có sẵn để dùng. Nếu cái mới thì cần khai báo mới có thể sd

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // 'has title': test TC

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/); //title của pagee có chứ từ... Hay không
});

// await: cơ chế autowait của playw. Page tương ứng với tab

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();
  //getByRole: locator

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// Tại phần se

import { test, expect } from '@playwright/test';

test('has title', async () => {

    
});




