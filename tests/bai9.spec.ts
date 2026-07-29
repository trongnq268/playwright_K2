import { expect, test } from '@playwright/test';
import { Locator } from '../locators/bai9.locator.ts';
import { Data_account,quanlity, product_ID,number } from '../type/bai9.data.ts';

// test.beforeEach(async ({ page }, testInfo) => {
// //ham chạy trước tất cả các test case
// if (testInfo.title === 'testcase4') {
//     return;
//   }
//   // test thử bỏ qua hàm beforeEach khi chạy testcase4
   
//     const Locator_page = Locator(page); 
//     const account = Data_account[0];

//     await page.goto('https://automationexercise.com/');
//     await expect(page).toHaveURL('https://automationexercise.com/');
//     // truy cap va xac minh duong dan
//     // dang nhap thanh cong 
//     await expect(Locator_page.verify_home_page).toBeVisible();
//     await Locator_page.button_signup_login.click();
//     await Locator_page.text_box_email.pressSequentially(account.email);
//     await Locator_page.text_box_password.pressSequentially(account.password);
//     await Locator_page.button_login.click();


//     //await page.close();
// }); 

test('testcase1', async ({ page }) => {

    //dang nhap va nhan trang chu da co o ham beforEach
    const Locator_page = Locator(page);
    await page.goto('https://automationexercise.com/');
    await expect(Locator_page.verify_home_page).toBeVisible();

    await Locator_page.button_product.click();

    // em chưa tìm được cách nào khác ngoài các tìm theo id sản phẩm
    await page.hover(`[data-product-id="${product_ID}"]`);
    await page.click(`[data-product-id="${product_ID}"]`);

    await Locator_page.button_continue_shoping.click();

    await page.hover(`[data-product-id="${product_ID + 1}"]`);
    await page.click(`[data-product-id="${product_ID + 1}"]`);

    await Locator_page.text_view_cart.click();
    await expect(Locator_page.button_checkout).toBeVisible();

    await expect(page.locator(`[data-product-id="${product_ID}"]`)).toBeVisible();
    await expect(page.locator(`[data-product-id="${product_ID + 1}"]`)).toBeVisible();

    await page.waitForTimeout(3000);
    await page.close();
    

    
    
});

test('testcase2', async ({ page }) => {

    //dang nhap va nhan trang chu da co o ham beforEach
    const Locator_page = Locator(page);
    await page.goto('https://automationexercise.com/');
    await expect(Locator_page.verify_home_page).toBeVisible();
    
    await Locator_page.button_product.click();
   
    await Locator_page.button_view_product.nth(number).click();

    await expect(Locator_page.product_info).toBeVisible();

    await Locator_page.text_box_product_quality.clear();
    await Locator_page.text_box_product_quality.pressSequentially(quanlity.toString());

    await Locator_page.button_add_to_cart.click();
    await Locator_page.button_continue_shoping.click();

    await expect(Locator_page.text_box_product_quality).toHaveValue(quanlity.toString());
    

    await page.waitForTimeout(3000);
    await page.close();
    
});
test('testcase3', async ({ page }) => {

    //dang nhap va nhan trang chu da co o ham beforEach
    const Locator_page = Locator(page);
    
    await page.goto('https://automationexercise.com/');
    await expect(Locator_page.verify_home_page).toBeVisible();

    await Locator_page.button_product.click();

    
    await page.hover(`[data-product-id="${product_ID}"]`);
    await page.locator(`a[href="/product_details/${product_ID}"]`).click();

    await expect(Locator_page.product_info).toBeVisible();

    await Locator_page.text_box_product_quality.clear(); // clear value de chac chan nhap dung 
    await Locator_page.text_box_product_quality.pressSequentially(quanlity.toString());
    await Locator_page.button_add_to_cart.click();
    await Locator_page.text_view_cart.click();

    if (await page.locator(`[data-product-id="${product_ID}"]`).isVisible()) {
        await Locator_page.button_clear_gio_hang.click()
    }
    await expect(Locator_page.text_no_product_in_cart).toBeVisible();

    await page.waitForTimeout(3000);
    await page.close();
    
});

test('testcase4', async ({ page }) => {

    //dang nhap va nhan trang chu da co o ham beforEach
    const Locator_page = Locator(page);
    
    await page.goto('https://automationexercise.com/');
    await expect(Locator_page.verify_home_page).toBeVisible();

    await Locator_page.button_product.click();
   
    await Locator_page.button_view_product.nth(number).click();
    await Locator_page.button_add_to_cart.click();
    await Locator_page.text_view_cart.click();
    await expect(Locator_page.button_proceed_to_checkout).toBeVisible();
    await Locator_page.button_proceed_to_checkout.click();

    await Locator_page.text_login_in_pop_up.click();




    await page.waitForTimeout(3000);
    await page.close();
    
});