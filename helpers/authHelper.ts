import { Page, expect } from "@playwright/test";
import { IAddress, IUserLogin, IUserRegister } from "../types/user.interface";
import {
  getPreSignupLocators,
  getSignupLocators,
  getLoginLocators,
  getHomePageLocators,
  getAccountDeletedLocators,
} from "../locators/authLocators";

export const loginUser = async (page: Page, loginDetails: IUserLogin) => {
  const loginUI = getLoginLocators(page);
  await loginUI.emailInput.fill(loginDetails.email);
  await loginUI.passwordInput.fill(loginDetails.password);
  await loginUI.loginBtn.click();
};

export const fillPreSignupForm = async (
  page: Page,
  name: string,
  email: string,
) => {
  const preSignupUI = getPreSignupLocators(page);
  await preSignupUI.nameInput.fill(name);
  await preSignupUI.emailInput.fill(email);
  await preSignupUI.signupBtn.click();
};

export const registerUser = async (
  page: Page,
  user: IUserRegister,
  address: IAddress,
): Promise<IUserRegister> => {
  const signupUI = getSignupLocators(page);

  await signupUI.titleMrRadio.click();
  await signupUI.passwordInput.fill(user.password);
  await signupUI.dayDropdown.selectOption(`${user.day}`);
  await signupUI.monthDropdown.selectOption(`${user.month}`);
  await signupUI.yearDropdown.selectOption(`${user.year}`);
  await signupUI.newsletterCheckbox.check();
  await signupUI.specialOfferCheckbox.check();

  await signupUI.firstNameInput.fill(address.firstName);
  await signupUI.lastNameInput.fill(address.lastName);
  await signupUI.companyInput.fill(address.company ?? "");
  await signupUI.address1Input.fill(address.address1);
  await signupUI.address2Input.fill(address.address2 ?? "");
  await signupUI.countryDropdown.selectOption(address.country);
  await signupUI.stateInput.fill(address.state);
  await signupUI.cityInput.fill(address.city);
  await signupUI.zipcodeInput.fill(address.zipcode);
  await signupUI.phoneInput.fill(address.phone);

  await signupUI.createAccountBtn.click();
  return user;
};

export const deleteAccount = async (page: Page) => {
  const navUI = getHomePageLocators(page);
  const accountDeletedUI = getAccountDeletedLocators(page);
  await navUI.deleteAccountBtn.click();
  await expect(accountDeletedUI.accountDeletedHeading).toBeVisible();
};
