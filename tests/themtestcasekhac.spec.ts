import { expect, test } from '@playwright/test';
import { Locator } from '../locators/bai8.locators.ts';
import { Data_account } from '../locators/bai8.data.ts';

test.beforeEach(async ({ page }) => {
//ham chạy trước tất cả các test case

   
    const Locator_page = Locator(page);
    const account = Data_account[1];

    await page.goto('https://automationexercise.com./');
    await expect(page).toHaveURL('https://automationexercise.com./');
// truy cap va xac minh duong dan
// dang nhap thanh cong

    await Locator_page.sign_up_button.click();
    await Locator_page.text_box_name_sign_in.pressSequentially(account.email);
    await Locator_page.text_box_email_sign_in.pressSequentially(account.password);
    await Locator_page.button_login.click();

    await expect(Locator_page.verify_Email_Address_already_exist).toBeVisible();
    await page.waitForTimeout(3000);
    //await page.close();
});

test('testcase', async ({ page }) => {

    await page.waitForTimeout(3000);
    
});