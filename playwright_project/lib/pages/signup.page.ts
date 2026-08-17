import { Page, Locator } from '@playwright/test';

export class signupPage {
    constructor (private page: Page) {};

    // Trang 'Enter Account Information' (/signup)
    get accountInfoHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Enter Account Information' });
    }

    titleRadio(title: 'Mr' | 'Mrs'): Locator {
        return title === 'Mr' ? this.page.locator('#id_gender1') : this.page.locator('#id_gender2');
    }

    get passwordInput(): Locator {
        return this.page.locator('#password');
    }

    get daysSelect(): Locator {
        return this.page.locator('#days');
    }

    get monthsSelect(): Locator {
        return this.page.locator('#months');
    }

    get yearsSelect(): Locator {
        return this.page.locator('#years');
    }

    get firstNameInput(): Locator {
        return this.page.locator('#first_name');
    }

    get lastNameInput(): Locator {
        return this.page.locator('#last_name');
    }

    get addressInput(): Locator {
        return this.page.locator('#address1');
    }

    get stateInput(): Locator {
        return this.page.locator('#state');
    }

    get cityInput(): Locator {
        return this.page.locator('#city');
    }

    get zipcodeInput(): Locator {
        return this.page.locator('#zipcode');
    }

    get mobileNumberInput(): Locator {
        return this.page.locator('#mobile_number');
    }

    get createAccountBtn(): Locator {
        return this.page.locator('[data-qa="create-account"]');
    }

    // Trang '/account_created' sau khi tạo tài khoản thành công
    get accountCreatedHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Account Created!' });
    }

    get continueBtn(): Locator {
        return this.page.locator('[data-qa="continue-button"]');
    }
}
