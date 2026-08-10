import { Page } from '@playwright/test';

export const getAuthLocators = (page: Page) => ({
  // Header auth elements
  signupLoginBtn: page.locator('.shop-menu a[href="/login"]'),
  logoutBtn: page.locator('.shop-menu a[href="/logout"]'),
  deleteAccountBtn: page.locator('.shop-menu a[href="/delete_account"]'),
  loggedInAsText: page.locator('.shop-menu').getByText(/Logged in as/),

  // Initial Signup form (/login)
  signupNameInput: page.locator('input[data-qa="signup-name"]'),
  signupEmailInput: page.locator('input[data-qa="signup-email"]'),
  signupBtn: page.locator('button[data-qa="signup-button"]'),

  // Enter Account Information form (/signup)
  titleMrRadio: page.locator('#id_gender1'),
  titleMrsRadio: page.locator('#id_gender2'),
  passwordInput: page.locator('input[data-qa="password"]'),
  daysSelect: page.locator('select[data-qa="days"]'),
  monthsSelect: page.locator('select[data-qa="months"]'),
  yearsSelect: page.locator('select[data-qa="years"]'),
  newsletterCheckbox: page.locator('#newsletter'),
  specialOffersCheckbox: page.locator('#optin'),
  firstNameInput: page.locator('input[data-qa="first_name"]'),
  lastNameInput: page.locator('input[data-qa="last_name"]'),
  companyInput: page.locator('input[data-qa="company"]'),
  address1Input: page.locator('input[data-qa="address"]'),
  address2Input: page.locator('input[data-qa="address2"]'),
  countrySelect: page.locator('select[data-qa="country"]'),
  stateInput: page.locator('input[data-qa="state"]'),
  cityInput: page.locator('input[data-qa="city"]'),
  zipcodeInput: page.locator('input[data-qa="zipcode"]'),
  mobileNumberInput: page.locator('input[data-qa="mobile_number"]'),
  createAccountBtn: page.locator('button[data-qa="create-account"]'),

  // Account Created page (/account_created)
  accountCreatedHeading: page.locator('h2[data-qa="account-created"]'),
  accountCreatedContinueBtn: page.locator('a[data-qa="continue-button"]'),

  // Account Deleted page (/delete_account)
  accountDeletedHeading: page.locator('h2[data-qa="account-deleted"]'),
  accountDeletedContinueBtn: page.locator('a[data-qa="continue-button"]'),
});
