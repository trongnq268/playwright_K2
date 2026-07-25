import { test, expect } from '@playwright/test';
import { getLoginLocators, wait } from '../locators/login.locators';

test('Thực hành: Tách Locator Trang Đăng Nhập', async ({ page }) => {

    const loginData = {
        url: 'https://automationexercise.com/',
        email: 'techtest123@gmail.com',
        password: '12345678',
    };

    const demo = getLoginLocators(page);

    await page.goto(loginData.url);
    await demo.btnSignupLogin.click();
    await expect(demo.lblLoginToYourAccount).toBeVisible();
    await demo.txtEmailAdress.fill(loginData.email);
    await wait(3000);
    await demo.txtPassword.fill(loginData.password);
    await wait(3000);
    await demo.btnLogin.click();
    await expect(page.getByText('Logged in as Tech Test')).toBeVisible();
    await wait(2000);
});
