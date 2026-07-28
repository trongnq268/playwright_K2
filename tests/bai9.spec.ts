import { expect, test } from '@playwright/test';
import { Locator } from '../locators/bai9.locator.ts';
import { Data_account } from '../type/bai9.data.ts';

test.beforeEach(async ({ page }) => {
//ham chạy trước tất cả các test case

   
    const Locator_page = Locator(page);
    const account = Data_account[0];

    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL('https://automationexercise.com/');
    // truy cap va xac minh duong dan
    // dang nhap thanh cong 
    await expect(Locator_page.verify_home_page).toBeVisible();
    await Locator_page.button_signup_login.click();
    await Locator_page.text_box_email.pressSequentially(account.email);
    await Locator_page.text_box_password.pressSequentially(account.password);
    await Locator_page.button_login.click();


    //await page.close();
}); 

test('testcase1', async ({ page }) => {

    //dang nhap va nhan trang chu da co o ham beforEach
    const Locator_page = Locator(page);
    

    await Locator_page.button_product.click();

    // em chưa tìm được cách nào khác ngoài các tìm theo id sản phẩm
    await page.hover('[data-product-id="1"]');
    await page.click('[data-product-id="1"]');

    await Locator_page.button_continue_shoping.click();

    await page.hover('[data-product-id="2"]');
    await page.click('[data-product-id="2"]');

    await Locator_page.text_view_cart.click();
    await expect(Locator_page.button_checkout).toBeVisible();

    await page.waitForTimeout(3000);
    await page.close();
    
    
    
    
});