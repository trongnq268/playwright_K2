import { test, expect } from '@playwright/test';

test('Demo Wait', async ({ page }) => {
    await page.goto('https://saucedemo.com');
    // ... Login steps
    await page.click('#login-button');

    //   🔴 CÁCH 1: HARD WAIT
    // await page.waitForTimeout(5000);

    //   // 🟢 CÁCH 2: SMART WAIT (Nên dùng)
    console.log('Đang chờ URL ... ');
    await page.waitForURL('https://www.saucedemo.com/');

    // Assertion (Case 3: Sửa selector sai để test timeout)
    await expect(page.locator('.title')).toHaveText('Swag Labs');
});