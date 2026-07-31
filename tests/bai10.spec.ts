import { expect, test } from '@playwright/test';
import { Locator_page } from '../locators/bai10.locator.ts';


test.beforeEach(async ({ page }, testInfo) => {
    
    const locator = Locator_page(page);
    const link = locator.go_to_URL;


    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL('https://automationexercise.com/');
    await expect(locator.button_home_page).toBeVisible();
    
}); 
test('tìm sản phẩm theo tên', async ({ page }) => {
    const locator = Locator_page(page);

    // await page.goto(locator.go_to_URL);
    // await expect(locator.button_home_page).toBeVisible();

    await locator.button_product.click();
    await page.locator("text='Blue Top'").click();
});