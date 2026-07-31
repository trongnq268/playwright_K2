import { expect, test } from '@playwright/test';
import { Locator } from '../locators/bai9.locator.ts';
import { Data_account,quanlity, product_ID,number,Card,thong_tin } from '../type/bai9.data.ts';
import { Locator_bai8 } from '../locators/bai8.locators.ts';

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
        await expect(Locator_page.text_no_product_in_cart).toBeVisible();
        await Locator_page.button_clear_gio_hang.click();
    }
    else{
        console.log('khong co san pham');
    }
    

    await page.waitForTimeout(3000);
    await page.close();
    
});

test('testcase4', async ({ page }) => {
 
    //dang nhap va nhan trang chu da co o ham beforEach
    const Locator_page = Locator(page);
    const Locator_bai8_page = Locator_bai8(page);
    const account = Data_account[1];
    const card = Card[0];

    await page.goto('https://automationexercise.com/');
    await expect(Locator_page.verify_home_page).toBeVisible();

    await Locator_page.button_product.click();
   
    await page.hover(`[data-product-id="${product_ID}"]`);
    await page.locator(`a[href="/product_details/${product_ID}"]`).click();
    await Locator_page.button_add_to_cart.click();
    await Locator_page.text_view_cart.click();
    await expect(Locator_page.button_proceed_to_checkout).toBeVisible();
    await Locator_page.button_proceed_to_checkout.click();

    await Locator_page.text_login_in_pop_up.click();



    //su dung test case tao tai khoang cua bai 8

    await expect(Locator_bai8_page.verify_new_user).toBeVisible();
    await Locator_bai8_page.text_box_name_sign_up.pressSequentially('Nguyen Duc An');
    await Locator_bai8_page.text_box_email_sign_up.pressSequentially(account.email);
    await Locator_bai8_page.button_signup.click();



    await expect(Locator_bai8_page.enter_information_text).toBeVisible();
    await Locator_bai8_page.raidio_title.click();
    await Locator_bai8_page.text_box_password.pressSequentially(account.password);
    console.log(account.password)
    await Locator_bai8_page.droplist_day.selectOption('1');
    await Locator_bai8_page.droplist_month.selectOption('1');
    await Locator_bai8_page.droplist_year.selectOption('2000');
    await Locator_bai8_page.radio_sign_up_newsletter.click();
    await Locator_bai8_page.radio_receive_special_offers.click();


    //dien thong tin ca nhan
    await Locator_bai8_page.textbox_first_name.pressSequentially('Nguyen');
    await Locator_bai8_page.textbox_last_name.pressSequentially('Duc An');
    await Locator_bai8_page.textbox_address.pressSequentially('Ha Noi');
    await Locator_bai8_page.droplist_contry.selectOption('Singapore');
    await Locator_bai8_page.textbox_state.pressSequentially('Ha Noi');
    await Locator_bai8_page.textbox_city.pressSequentially('Ha Noi');
    await Locator_bai8_page.textbox_zipcode.pressSequentially('100000');
    await Locator_bai8_page.textbox_mobile_number.pressSequentially('0987654321');
    await Locator_bai8_page.button_create_account.click();
    await expect(Locator_bai8_page.verify_account_created).toBeVisible();
    await Locator_bai8_page.button_continue.click();
    await expect(Locator_bai8_page.verify_button_logout).toBeVisible();


    await Locator_page.button_cart.click();
    await Locator_page.button_proceed_to_checkout.click();

    //xac nhan va nhap thong tin 
    await expect(page.locator(`#product-${product_ID}`)).toBeVisible();


    // de 2 thong tin cho nhanh
    await expect(page.locator(`#product-${product_ID}`)).toBeVisible();
    await expect(page.locator(`text=${thong_tin[0].country}`).nth(0)).toHaveText(thong_tin[0].country);
    await expect(page.locator(`text=${thong_tin[0].country}`).nth(1)).toHaveText(thong_tin[0].country);
    await expect(page.getByText(`${thong_tin[0].phone}`, { exact: true }).nth(0)).toContainText('0987654321');
    await expect(page.getByText(`${thong_tin[0].phone}`, { exact: true }).nth(1)).toContainText('0987654321');;

    await Locator_page.text_box_comment.pressSequentially('best product ever!');
    await Locator_page.button_place_order.click();
    

    //nhap thong tin the
    await Locator_page.text_box_name_card.pressSequentially(card.name_of_card);
    await Locator_page.text_box_number_card.pressSequentially(card.card_number);
    await Locator_page.text_box_cvc.pressSequentially(card.cvc);
    await Locator_page.text_box_expiration_month.pressSequentially(card.expiration_month);
    await Locator_page.text_box_expiration_year.pressSequentially(card.expiration_year);
    await Locator_page.button_pay_and_comfirm.click();

    await expect (Locator_page.verify_order_confirm).toBeVisible();

    await Locator_bai8_page.button_delete_account.click();
    await expect(Locator_bai8_page.verify_account_deleted).toBeVisible();
    await Locator_bai8_page.button_continue_delete_account.click();
    await page.waitForTimeout(3000);
    await page.close();
    
});
test('testcase5', async ({ page }) => {
 
    //dang nhap va nhan trang chu da co o ham beforEach
    const Locator_page = Locator(page);
    const Locator_bai8_page = Locator_bai8(page);
    const account = Data_account[1];
    const card = Card[0];

    await page.goto('https://automationexercise.com/');
    await expect(Locator_page.verify_home_page).toBeVisible();

    await Locator_page.button_product.click();
   
    await page.hover(`[data-product-id="${product_ID}"]`);
    await page.locator(`a[href="/product_details/${product_ID}"]`).click();
    await Locator_page.button_add_to_cart.click();
    await Locator_page.text_view_cart.click();
    await expect(Locator_page.button_proceed_to_checkout).toBeVisible();
    await Locator_page.button_proceed_to_checkout.click();

    await Locator_page.text_login_in_pop_up.click();



    //su dung test case tao tai khoang cua bai 8

    await expect(Locator_bai8_page.verify_new_user).toBeVisible();
    await Locator_bai8_page.text_box_name_sign_up.pressSequentially('Nguyen Duc An');
    await Locator_bai8_page.text_box_email_sign_up.pressSequentially(account.email);
    await Locator_bai8_page.button_signup.click();



    await expect(Locator_bai8_page.enter_information_text).toBeVisible();
    await Locator_bai8_page.raidio_title.click();
    await Locator_bai8_page.text_box_password.pressSequentially(account.password);
    console.log(account.password)
    await Locator_bai8_page.droplist_day.selectOption('1');
    await Locator_bai8_page.droplist_month.selectOption('1');
    await Locator_bai8_page.droplist_year.selectOption('2000');
    await Locator_bai8_page.radio_sign_up_newsletter.click();
    await Locator_bai8_page.radio_receive_special_offers.click();


    //dien thong tin ca nhan
    await Locator_bai8_page.textbox_first_name.pressSequentially('Nguyen');
    await Locator_bai8_page.textbox_last_name.pressSequentially('Duc An');
    await Locator_bai8_page.textbox_address.pressSequentially('Ha Noi');
    await Locator_bai8_page.droplist_contry.selectOption('Singapore');
    await Locator_bai8_page.textbox_state.pressSequentially('Ha Noi');
    await Locator_bai8_page.textbox_city.pressSequentially('Ha Noi');
    await Locator_bai8_page.textbox_zipcode.pressSequentially('100000');
    await Locator_bai8_page.textbox_mobile_number.pressSequentially('0987654321');
    await Locator_bai8_page.button_create_account.click();
    await expect(Locator_bai8_page.verify_account_created).toBeVisible();
    await Locator_bai8_page.button_continue.click();
    await expect(Locator_bai8_page.verify_button_logout).toBeVisible();


    await Locator_page.button_cart.click();
    await Locator_page.button_proceed_to_checkout.click();

    //de 2 thong tin cho nhanh
    await expect(page.locator(`#product-${product_ID}`)).toBeVisible();
    await expect(page.locator(`text=${thong_tin[0].country}`).nth(0)).toHaveText(thong_tin[0].country);
    await expect(page.locator(`text=${thong_tin[0].country}`).nth(1)).toHaveText(thong_tin[0].country);
    await expect(page.getByText(`${thong_tin[0].phone}`, { exact: true }).nth(0)).toContainText('0987654321');
    await expect(page.getByText(`${thong_tin[0].phone}`, { exact: true }).nth(1)).toContainText('0987654321');;




    await Locator_bai8_page.button_delete_account.click();
    await expect(Locator_bai8_page.verify_account_deleted).toBeVisible();
    await Locator_bai8_page.button_continue_delete_account.click();
    await page.waitForTimeout(3000);
    await page.close();

    
});