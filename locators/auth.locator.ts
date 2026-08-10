import { Page, Locator } from '@playwright/test';

export class AuthLocators {
  constructor(private page: Page) { }

  // Login section
  get loginEmailInput(): Locator { return this.page.locator('input[data-qa="login-email"]'); }
  get loginPasswordInput(): Locator { return this.page.locator('input[data-qa="login-password"]'); }
  get loginBtn(): Locator { return this.page.locator('button[data-qa="login-button"]'); }

  // Signup section
  get signupNameInput(): Locator { return this.page.locator('input[data-qa="signup-name"]'); }
  get signupEmailInput(): Locator { return this.page.locator('input[data-qa="signup-email"]'); }
  get signupBtn(): Locator { return this.page.locator('button[data-qa="signup-button"]'); }

  // Account Information form
  get titleMrRadio(): Locator { return this.page.locator('#id_gender1'); }
  get passwordInput(): Locator { return this.page.locator('input[data-qa="password"]'); }
  get daysSelect(): Locator { return this.page.locator('select[data-qa="days"]'); }
  get monthsSelect(): Locator { return this.page.locator('select[data-qa="months"]'); }
  get yearsSelect(): Locator { return this.page.locator('select[data-qa="years"]'); }
  get firstNameInput(): Locator { return this.page.locator('input[data-qa="first_name"]'); }
  get lastNameInput(): Locator { return this.page.locator('input[data-qa="last_name"]'); }
  get companyInput(): Locator { return this.page.locator('input[data-qa="company"]'); }
  get addressInput(): Locator { return this.page.locator('input[data-qa="address"]'); }
  get address2Input(): Locator { return this.page.locator('input[data-qa="address2"]'); }
  get countrySelect(): Locator { return this.page.locator('select[data-qa="country"]'); }
  get stateInput(): Locator { return this.page.locator('input[data-qa="state"]'); }
  get cityInput(): Locator { return this.page.locator('input[data-qa="city"]'); }
  get zipcodeInput(): Locator { return this.page.locator('input[data-qa="zipcode"]'); }
  get mobileNumberInput(): Locator { return this.page.locator('input[data-qa="mobile_number"]'); }
  get createAccountBtn(): Locator { return this.page.locator('button[data-qa="create-account"]'); }

  // Confirmation pages & Auth actions
  get accountCreatedHeader(): Locator { return this.page.locator('h2[data-qa="account-created"]'); }
  get accountDeletedHeader(): Locator { return this.page.locator('h2[data-qa="account-deleted"]'); }
  get continueBtn(): Locator { return this.page.locator('a[data-qa="continue-button"]'); }
  get logoutBtn(): Locator { return this.page.locator('a[href="/logout"]'); }
}
