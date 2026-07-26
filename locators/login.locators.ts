import { Page } from "@playwright/test";

export const getLoginLocators = (page: Page) => ({
    signUpLoginLink: page.getByRole('link', { name: 'Signup / Login'  }),
    loginText: page.getByText('Login to your account' ),
    emailPlaceHolder: page.locator('[data-qa="login-email"]'),
    passWordPlaceHolder: page.getByPlaceholder('Password'),
    loginButton: page.getByRole('button', {name: 'Login'}),
    userInfoText: page.getByText("Logged in as"),
});