import { expect, test } from '@playwright/test';
import { Locator_page,productByName } from '../locators/bai10.locator.ts';
import { Data_account,ten_san_pham,Card } from '../type/bai10.data.ts';
import { Locator } from '../locators/bai9.locator.ts';


test.beforeEach(async ({ page }, testInfo) => {
    
    const locator = Locator_page(page);
    const link = locator.go_to_URL;


    await page.goto(`${link}`);
    await expect(page).toHaveURL(`${link}`);
    await expect(locator.button_home_page).toBeVisible();
    
    
}); 
test('testcase-1', async ({ page }) => {
    const locator = Locator_page(page);
    const account = Data_account[0];
    const card = Card[0];
    
    await locator.button_signup_login.click();
    await locator.text_box_email.pressSequentially(account.email);
    await locator.text_box_password.pressSequentially(account.password);
    await locator.button_login.click();
    await expect(locator.verify_login).toBeVisible();

    
    await locator.button_product.click();
    await expect
    // const san_pham  = productByName(page, 'Blue Top');
    // await san_pham.hover();
    await locator.text_box_seach.pressSequentially(`${ten_san_pham}`);
    await locator.icon_seach.click();

    //click chon san pham
    await page.getByText('Add to cart', { exact: true }).nth(0).click();

    await locator.text_view_cart.click();
    await expect(locator.verify_cart).toBeVisible();

    await locator.button_checkout.click();

    //verify check out
    // em tạm thời để như này do account, lười settup lại data :D
    await expect(locator.verify_checkout).toBeVisible();

    await locator.text_box_comment.pressSequentially('best product ever!');
    await locator.button_place_order.click();


    //them thong tin the
    await locator.text_box_name_card.pressSequentially(card.name_of_card);
    await locator.text_box_number_card.pressSequentially(card.card_number);
    await locator.text_box_cvc.pressSequentially(card.cvc);
    await locator.text_box_expiration_month.pressSequentially(card.expiration_month);
    await locator.text_box_expiration_year.pressSequentially(card.expiration_year);
    await locator.button_pay_and_comfirm.click();

    await expect (locator.verify_order_confirm).toBeVisible();
    // để đăng xuất do lười code lại tạo tài khoản :D    
    await locator.button_log_out.click();
    await page.waitForTimeout(3000);
    await page.close();

});