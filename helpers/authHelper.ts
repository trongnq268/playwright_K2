import { IAddress, IUserLogin, IUserRegister } from "../types/user.interface";
import { expect, Page } from "@playwright/test";
import {
  getPreSignupLocators,
  getSignupLocators,
  getLoginLocators,
  navigationLocators,
  getDeleteAccLocators,
} from "../locators/auth.locators";

export const baseNavigation = async (page: Page) => {
  await page.goto("https://automationexercise.com/");
};

export const loginUser = async (page: Page, loginDetails: IUserLogin) => {
  const loginUI = getLoginLocators(page);
  await loginUI.emailInput.fill(loginDetails.email);
  await loginUI.passwordInput.fill(loginDetails.password);
  await loginUI.loginBtn.click();
};

export const fillPreSignup = async (
  page: Page,
  name: string,
  email: string,
) => {
  const preSignupUI = getPreSignupLocators(page);
  await preSignupUI.nameInput.fill(name);
  await preSignupUI.emailInput.fill(email);
  await preSignupUI.signUpBtn.click();
};

export const registerUser = async (
  page: Page,
  user: IUserRegister,
  address: IAddress,
): Promise<IUserRegister> => {
  const signupUI = getSignupLocators(page);

  //fill in account information form
  await signupUI.title1.click();
  await signupUI.passwordInput.fill(user.password);
  await signupUI.dayDropdown.selectOption(`${user.day}`);
  await signupUI.monthDropdown.selectOption(`${user.month}`);
  await signupUI.yearDropdown.selectOption(`${user.year}`);
  await signupUI.newsletterCheckbox.check();
  await signupUI.specialOfferCheckbox.check();

  //fill in account address form
  await signupUI.firstNameInput.fill(user.firstName);
  await signupUI.lastNameInput.fill(user.lastName);
  await signupUI.companyInput.fill(address.company ?? "");
  await signupUI.addressInput1.fill(address.address1);
  await signupUI.addressInput2.fill(address.address2 ?? "");
  await signupUI.countryDropdown.selectOption(address.country);
  await signupUI.stateInput.fill(address.state);
  await signupUI.cityInput.fill(address.city);
  await signupUI.zipcodeInput.fill(address.zipcode);
  await signupUI.phoneInput.fill(user.phone);

  await signupUI.createAccBtn.click();

  return user;
};

export const deleteAcc = async (page: Page) => {
  const auth = navigationLocators(page);
  const deleteAccUI = getDeleteAccLocators(page);
  await auth.deleteAccLink.click();
  await deleteAccUI.continueBtn.click();
};
