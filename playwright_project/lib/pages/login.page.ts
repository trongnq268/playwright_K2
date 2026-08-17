import { Page, Locator } from '@playwright/test';

export class loginPage {
    constructor (private page: Page) {};

    // Form 'Login to your account'
    get loginEmailInput(): Locator {
        return this.page.locator('[data-qa="login-email"]');
    }

    get loginPasswordInput(): Locator {
        return this.page.locator('[data-qa="login-password"]');
    }

    get loginBtn(): Locator {
        return this.page.locator('[data-qa="login-button"]');
    }

    // Form 'New User Signup!'
    get signupNameInput(): Locator {
        return this.page.locator('[data-qa="signup-name"]');
    }

    get signupEmailInput(): Locator {
        return this.page.locator('[data-qa="signup-email"]');
    }

    get signupBtn(): Locator {
        return this.page.locator('[data-qa="signup-button"]');
    }
}
