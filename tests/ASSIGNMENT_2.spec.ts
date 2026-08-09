import { test, expect } from '@playwright/test';

import {Locator_assigment} from '../locators/assignment_locator';
import {Data, Product} from '../type/asssignment_data';

// ham dang nhap
async function login(locator_page: ReturnType<typeof Locator_assigment>, account: any) {
    await locator_page.text_box_username.pressSequentially(account.user);
    await locator_page.text_box_password.pressSequentially(account.password);
    await locator_page.button_login.click();
}
async function add_to_cart(locator_page: ReturnType<typeof Locator_assigment>) {
    await locator_page.sauce_labs_backpack_product.click();
    await expect(locator_page.button_remove_sauce_labs_backpack_product).toBeVisible();

    await locator_page.sauce_labs_bike_bikelight.click();
    await expect(locator_page.button_remove_sauce_labs_bike_light).toBeVisible();

    await locator_page.icon_cart.click();
}
async function verify_cart(locator_page: ReturnType<typeof Locator_assigment>) {
    await expect(locator_page.verify_product_sauce_labs_backpack_product).toBeVisible();
    await expect(locator_page.verify_product_sauce_labs_bike_light).toBeVisible()
}




test.describe('Assignment 2', () => {
    test.beforeEach(async ({ page }) => {

        // Đăng ký route TRƯỚC khi mở trang
        await page.route('**/*', route => {
            const url = route.request().url();

            if (
                url.includes('googlesyndication') ||
                url.includes('doubleclick') ||
                url.includes('googleads')
            ) {
                route.abort();
            } else {
                route.continue();
            }
        });

        const locator_page = Locator_assigment(page);
        const link = locator_page.Go_to_url;

        await page.goto(link);

        await expect(page).toHaveURL(link);
        await expect(locator_page.button_login).toBeVisible();

    });

    test('testcase1', async ({ page }) => {

        const locator_page = Locator_assigment(page);
        const account = Data[0];

        await login(locator_page, account);
        //them san pham vao gio hang
        await add_to_cart(locator_page);

    
        // kiem tra san pham da them
        await verify_cart(locator_page);

        await locator_page.button_checkout.click();
        await expect(locator_page.verify_checkout).toBeVisible();

        await page.waitForTimeout(5000);
        await page.close();

    });
});
// test('testcase2', async ({ page }) => {

//     const locator_page = Locator_assigment(page);
//     const account = Data[0];
//     console.log(locator_page.verify_product_sauce_labs_backpack_product)
//     //page.locator(`//div[normalize-space()='Sauce Labs Backpack']`)


   
// });