import { expect, test } from '@playwright/test';
import { Locator_page,productByName } from '../locators/bai10.locator.ts';
import { Data_account,ten_san_pham,Card } from '../type/bai10.data.ts';


test.beforeEach(async ({ page }, testInfo) => {
    
    const locator = Locator_page(page);
    const link = locator.go_to_URL;


    await page.goto(`${link}`);
    await expect(page).toHaveURL(`${link}`);
    await expect(locator.button_home_page).toBeVisible();
    
    
}); 
test('testcase_1', async ({ page }) => {
    const locator = Locator_page(page);
    const account = Data_account[0];
    const card = Card[0];
    
    await locator.button_signup_login.click();
    await locator.text_box_email.pressSequentially(account.email);
    await locator.text_box_password.pressSequentially(account.password);
    await locator.button_login.click();
    await expect(locator.verify_login).toBeVisible();

    
    await locator.button_product.click();
    
    // const san_pham  = productByName(page, 'Blue Top');
    // await san_pham.hover();
    await locator.text_box_seach.pressSequentially(`${ten_san_pham}`);
    await locator.icon_seach.click();

    //click chon san pham
    await locator.add_to_cart_button.nth(0).click();

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
test('testcase_2', async ({ page }) => {
    const locator = Locator_page(page);

    await locator.button_product.click();
    
    // const san_pham  = productByName(page, 'Blue Top');
    // await san_pham.hover();
    await locator.text_box_seach.pressSequentially(`${ten_san_pham}`);
    await locator.icon_seach.click();

    //click chon san pham
    await locator.add_to_cart_button.nth(0).click();
    

    await locator.text_view_cart.click();
    await expect(locator.verify_cart).toBeVisible();


    // dem button x de clear het tat ca cac button x
    const deleteButtons = locator.icon_x_clear_product
    const count = await deleteButtons.count();

    for (let i = 0; i < count; i++) {
        if (await deleteButtons.nth(i).isVisible()) {
            await deleteButtons.nth(i).click();
        }
    }

    await expect(locator.verify_cart_empty).toBeVisible();
    await page.waitForTimeout(3000);
    await page.close();
});
test('testcase_3', async ({ page }) => {
    const locator = Locator_page(page);

    await locator.button_product.click();
    
    await expect(locator.text_category).toBeVisible();

   
    // danh muc women
    await locator.option_women_of_category.click();

    // chon ngau nhien mot danh muc thuoc women
    const dress = locator.option_dress_of_women;
    const tops = locator.option_top_of_women;
    const saree = locator.option_saree_of_women;

    const Option_women = [dress,tops,saree];
    const randomOptions_women = Option_women[Math.floor(Math.random() * Option_women.length)];
    await randomOptions_women.click();

    // chon ngau nhien mot san pham trong danh muc
   
    const count = await locator.add_to_cart_button.count();
    const randomIndex = Math.floor(Math.random() * count);
    await locator.add_to_cart_button.nth(randomIndex).click();

    
    await locator.button_continue_shoping.click();


    //danh muc men
    await locator.option_men_of_category.click();
   

    //chon ngau nhien mot danh muc men
    const Tshirt = locator.option_Tshirts_of_men;
    const Jeans = locator.option_Jeans_of_men;

    const Option_men = [Tshirt,Jeans];
    const randomOptions_men = Option_men[Math.floor(Math.random() * Option_men.length)];
    await randomOptions_men.click();





    await page.waitForTimeout(3000);
    await page.close();
});
test('testcase_4', async ({ page }) => {
    const locator = Locator_page(page);
    const account = Data_account[0];
  
    await locator.button_product.click();
    
    // const san_pham  = productByName(page, 'Blue Top');
    // await san_pham.hover();
    await locator.text_box_seach.pressSequentially(`${ten_san_pham}`);
    await locator.icon_seach.click();

    //click chon san pham
    await page.getByText('Add to cart', { exact: true }).nth(0).click();
    await locator.button_continue_shoping.click();

    // dang nhap

    await locator.button_signup_login.click();
    await locator.text_box_email.pressSequentially(account.email);
    await locator.text_box_password.pressSequentially(account.password);
    await locator.button_login.click();
    await expect(locator.verify_login).toBeVisible();

    // kiem tra la gio hang sau khi dang nhap
    await locator.button_cart.click();
    await expect(page.getByRole('link', { name: `${ten_san_pham}` })).toBeVisible();
    

    // thêm thao tác x để không bị lỗi ở những lần đăng nhập sau
    const deleteButtons = locator.icon_x_clear_product
    const count = await deleteButtons.count();

    for (let i = 0; i < count; i++) {
        if (await deleteButtons.nth(i).isVisible()) {
            await deleteButtons.nth(i).click();
        }
    }

    await page.waitForTimeout(3000);
    await page.close();
});
test('testcase_5', async ({ page }) => {
    const locator = Locator_page(page);
    const account = Data_account[0];
    const card = Card[0];
    
    await locator.button_signup_login.click();
    await locator.text_box_email.pressSequentially(account.email);
    await locator.text_box_password.pressSequentially(account.password);
    await locator.button_login.click();
    await expect(locator.verify_login).toBeVisible();

    
    await locator.button_product.click();
    
    // const san_pham  = productByName(page, 'Blue Top');
    // await san_pham.hover();
    await locator.text_box_seach.pressSequentially(`${ten_san_pham}`);
    await locator.icon_seach.click();

    //click chon san pham
    await locator.add_to_cart_button.nth(0).click();

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



    // down load (copy AI)

    const downloadButton = page.getByRole('link', { name: 'Download Invoice' });
    const downloadPromise = page.waitForEvent('download');

    await downloadButton.click();

    const download = await downloadPromise;

    // Xác minh download thành công
    expect(await download.failure()).toBeNull();

    // Kiểm tra tên file
    expect(await download.suggestedFilename()).toContain('.txt');

});