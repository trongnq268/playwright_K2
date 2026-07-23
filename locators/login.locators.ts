import { Page } from "@playwright/test";

export const getLoginLocators = (page: Page) => ({
    btnSignupLogin: page.getByRole('link', { name: 'Signup / Login' }),
    lblLoginToYourAccount: page.getByRole('heading', { name: 'Login to your account' }),
    txtEmailAdress: page.locator('[data-qa="login-email"]'),
    txtPassword: page.locator('[data-qa="login-password"]'),
    btnLogin: page.getByRole('button', { name: 'Login' }),
    lblLoggedInAs: page.locator(`a:has-text("Logged in as")`),
});

export const loginData = {
    url: 'https://automationexercise.com/',
    email: 'techtest123@gmail.com',
    password: '12345678',
};

// Hàm wait nhận vào mili-giây, trả về một Promise
export const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};