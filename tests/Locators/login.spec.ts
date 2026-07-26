import {test, expect} from '@playwright/test';
import { getLoginLocators } from '../../locators/login.locators';

test('Kiem tra login', async ({page}) => {
await page.goto("http://automationexercise.com");
const loginUI = getLoginLocators(page);
await loginUI.signUpLoginLink.click();
await expect(page).toHaveURL('https://automationexercise.com/login');
await expect(loginUI.loginText).toBeVisible();

//await loginUI.emailPlaceHolder.click();
await loginUI.emailPlaceHolder.fill("ptthu4w@gmail.com"); // Nhap kieu copy paste
//await loginUI.emailPlaceHolder.pressSequentially("testuser_qa@example.com", {delay: 500}); // Nhajp kieeur gox tuwngf chuw
//await loginUI.passWordPlaceHolder.click();
await loginUI.passWordPlaceHolder.fill("ptthu4@123");
await loginUI.loginButton.click();
await expect(loginUI.userInfoText).toBeVisible();
});
