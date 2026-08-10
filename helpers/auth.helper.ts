import { Page, expect } from '@playwright/test';
import { UserAccount } from '../types/user.type';
import { AuthLocators } from '../locators/auth.locator';
import { HomeLocators } from '../locators/home.locator';
import { navigateToHomePage } from './navigation.helper';

/**
 * Fills in account registration details, submits the form,
 * verifies 'ACCOUNT CREATED!' and clicks 'Continue'.
 * Does NOT log out (user remains logged in).
 */
export async function fillSignupAndCreateAccount(page: Page, user: UserAccount): Promise<void> {
  const authLocators = new AuthLocators(page);

  // Fill initial Signup form
  await authLocators.signupNameInput.fill(user.name);
  await authLocators.signupEmailInput.fill(user.email);
  await authLocators.signupBtn.click();

  // Fill Account Information
  await authLocators.titleMrRadio.check();
  await authLocators.passwordInput.fill(user.password);
  await authLocators.daysSelect.selectOption('1');
  await authLocators.monthsSelect.selectOption('1');
  await authLocators.yearsSelect.selectOption('2000');

  // Fill Address Information
  await authLocators.firstNameInput.fill(user.firstName);
  await authLocators.lastNameInput.fill(user.lastName);
  if (user.company) {
    await authLocators.companyInput.fill(user.company);
  }
  await authLocators.addressInput.fill(user.address);
  if (user.address2) {
    await authLocators.address2Input.fill(user.address2);
  }
  await authLocators.countrySelect.selectOption(user.country);
  await authLocators.stateInput.fill(user.state);
  await authLocators.cityInput.fill(user.city);
  await authLocators.zipcodeInput.fill(user.zipcode);
  await authLocators.mobileNumberInput.fill(user.mobileNumber);

  // Submit Create Account
  await authLocators.createAccountBtn.click();

  // Verify ACCOUNT CREATED! and click Continue
  await expect(authLocators.accountCreatedHeader).toBeVisible({ timeout: 10000 });
  await authLocators.continueBtn.click();
}

/**
 * Registers a new user account on automationexercise.com and logs out
 * so that the test case can perform the Login step cleanly.
 */
export async function registerNewUser(page: Page, user: UserAccount): Promise<void> {
  const authLocators = new AuthLocators(page);
  const homeLocators = new HomeLocators(page);

  await navigateToHomePage(page);
  
  // Click Signup/Login
  await homeLocators.signupLoginLink.click();
  
  await fillSignupAndCreateAccount(page, user);
  
  // Logout to ensure clean state before Login step
  await authLocators.logoutBtn.click();
}
