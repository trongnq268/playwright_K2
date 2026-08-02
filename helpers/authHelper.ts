import { Page, expect } from "@playwright/test";
import { IUserAddress, IUserLogin, IUserRegister } from "../types/user.interface";
import {
  getPreSignupLocators,
  getSignupLocators,
  getLoginLocators,
  getHomePageLocators,
  getAccountDeletedLocators,
} from "../locators/authLocators";

export const fillPreSignupForm = async (page: Page, name: string, email: string) => {
  const predang_ky = getPreSignupLocators(page);
  await predang_ky.nameInput.fill(name);
  await predang_ky.emailInput.fill(email);
  await predang_ky.signupBtn.click();
};

export const fillPreSigupFrom = fillPreSignupForm;

export const loginUser = async (page: Page, loginUser: IUserLogin) => {
  const login = getLoginLocators(page);
  await login.emailInput.fill(loginUser.email);
  await login.passwordInput.fill(loginUser.password);
  await login.loginBtn.click();
};

export const registerUser = async (
  page: Page,
  user: IUserRegister,
  address: IUserAddress,
  options?: { isMr?: boolean; newsletter?: boolean; optin?: boolean }
): Promise<IUserRegister> => {
  const dang_ky = getSignupLocators(page);

  if (options?.isMr !== undefined) {
    if (options.isMr) {
      await dang_ky.titleMrRadio.check();
    } else {
      await dang_ky.titleMrsRadio.check();
    }
  }

  await dang_ky.passwordInput.fill(user.password);

  if (user.date) await dang_ky.dayDropdown.selectOption(`${user.date}`);
  if (user.month) await dang_ky.monthDropdown.selectOption(`${user.month}`);
  if (user.year) await dang_ky.yearDropdown.selectOption(`${user.year}`);

  if (options?.newsletter) await dang_ky.newsletterCheckbox.check();
  if (options?.optin) await dang_ky.specialOfferCheckbox.check();

  await dang_ky.firstNameInput.fill(address.firstName);
  await dang_ky.lastNameInput.fill(address.lastName);
  if (address.company) await dang_ky.companyInput.fill(address.company);
  await dang_ky.address1Input.fill(address.address);
  if (address.address2) await dang_ky.address2Input.fill(address.address2);
  if (address.country) await dang_ky.countryDropdown.selectOption(address.country);
  await dang_ky.stateInput.fill(address.state);
  await dang_ky.cityInput.fill(address.city);
  await dang_ky.zipcodeInput.fill(address.zipCode);
  await dang_ky.phoneInput.fill(address.mobilePhone);
  await dang_ky.createAccountBtn.click();
  return user;
};

export const deleteAccount = async (page: Page) => {
  const home = getHomePageLocators(page);
  const accountDeleted = getAccountDeletedLocators(page);
  await home.deleteAccountBtn.click();
  await expect(accountDeleted.accountDeletedHeading).toBeVisible();
  await accountDeleted.continueBtn.click();
};