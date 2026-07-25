import { expect, test } from '@playwright/test';
import { Locator } from '../locators/bai8.locators.ts';
import { Data_account } from '../locators/bai8.data.ts';
//import { wait } from '../locators/wait';


test('testcase_1', async ({ page }) => {


    const Locator_page = Locator(page);
    const account = Data_account[0];


    await page.goto('https://automationexercise.com./');
    await expect(page).toHaveURL('https://automationexercise.com./');
// truy cap va xac minh duong dan   
    await Locator_page.sign_up_button.click();
    await expect(Locator_page.verify_new_user).toBeVisible();
    await Locator_page.text_box_name_sign_up.pressSequentially('Nguyen Duc An');
    await Locator_page.text_box_email_sign_up.pressSequentially(account.email);
    await Locator_page.button_signup.click();

//dang ki
    await expect(Locator_page.enter_information_text).toBeVisible();
    await Locator_page.raidio_title.click();
    await Locator_page.text_box_password.pressSequentially(account.password);
    await Locator_page.droplist_day.selectOption('1');
    await Locator_page.droplist_month.selectOption('1');
    await Locator_page.droplist_year.selectOption('2000');
    await Locator_page.radio_sign_up_newsletter.click();
    await Locator_page.radio_receive_special_offers.click();


    //dien thong tin ca nhan
    await Locator_page.textbox_first_name.pressSequentially('Nguyen');
    await Locator_page.textbox_last_name.pressSequentially('Duc An');
    await Locator_page.textbox_address.pressSequentially('Ha Noi');
    await Locator_page.droplist_contry.selectOption('Singapore');
    await Locator_page.textbox_state.pressSequentially('Ha Noi');
    await Locator_page.textbox_city.pressSequentially('Ha Noi');
    await Locator_page.textbox_zipcode.pressSequentially('100000');
    await Locator_page.textbox_mobile_number.pressSequentially('0987654321');
    await Locator_page.button_create_account.click();
    await expect(Locator_page.verify_account_created).toBeVisible();
    await Locator_page.button_continue.click();
    await expect(Locator_page.verify_button_logout).toBeVisible();


    // xoa tai khoan
    await Locator_page.button_delete_account.click();
    await expect(Locator_page.verify_account_deleted).toBeVisible();
    await Locator_page.button_continue_delete_account.click();
    await page.waitForTimeout(3000);
    await page.close();

    
});


test('testcase_2', async ({ page }) => {
    const Locator_page = Locator(page);
    const account = Data_account[1];

    await page.goto('https://automationexercise.com./');
    await expect(page).toHaveURL('https://automationexercise.com./');
// truy cap va xac minh duong dan

    await Locator_page.sign_up_button.click();
    await expect(Locator_page.verify_new_user).toBeVisible();
    await Locator_page.text_box_name_sign_up.pressSequentially('nguyen duc an');
    await Locator_page.text_box_email_sign_up.pressSequentially(account.email);
    await Locator_page.button_signup.click();

    await expect(Locator_page.verify_Email_Address_already_exist).toBeVisible();
    await page.waitForTimeout(3000);
    await page.close();

    
});

test('testcase_3', async ({ page }) => {
    const Locator_page = Locator(page);
    const account = Data_account[1];

    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL('https://automationexercise.com/');
// truy cap va xac minh duong dan

    await Locator_page.sign_up_button.click();
    await Locator_page.text_box_name_sign_in.pressSequentially(account.email);
    await Locator_page.text_box_email_sign_in.pressSequentially(account.password);
    await Locator_page.button_login.click();

    await expect(Locator_page.verify_button_logout).toBeVisible();

    await page.waitForTimeout(3000);

    // await Locator_page.button_continue_delete_account.click();

    await page.close();
});
test('testcase_4', async ({ page }) => {
    const Locator_page = Locator(page);
    const account = Data_account[2];

    await page.goto('https://automationexercise.com./');
    await expect(page).toHaveURL('https://automationexercise.com./');
// truy cap va xac minh duong dan

    await Locator_page.sign_up_button.click();
    await Locator_page.text_box_name_sign_in.pressSequentially(account.email);
    await Locator_page.text_box_email_sign_in.pressSequentially(account.password);
    await Locator_page.button_login.click();

    await expect(Locator_page.wrong_password).toBeVisible();
    await page.waitForTimeout(3000);

    // await Locator_page.button_continue_delete_account.click();

    await page.close();
});





