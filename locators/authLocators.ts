import { Page } from "@playwright/test";

export const getUI = (page: Page) => ({
  navigation: getHomePageLocators(page),
  loginUI: getLoginLocators(page),
  preSignupUI: getPreSignupLocators(page),
  signupUI: getSignupLocators(page),
  accountCreatedUI: getAccountCreatedLocators(page),
  accountDeletedUI: getAccountDeletedLocators(page),
});

export const getHomePageLocators = (page: Page) => ({
  homeSlide: page.locator("#slider-carousel"),
  signupLoginBtn: page.getByRole("link", { name: "Signup / Login" }),
  deleteAccountBtn: page.getByRole("link", { name: "Delete Account" }),
  logoutBtn: page.getByRole("link", { name: "Logout" }),
  loggedInUserText: (username: string) =>
    page.getByText(`Logged in as ${username}`),
});

export const getLoginLocators = (page: Page) => ({
  loginHeading: page.getByRole("heading", { name: "Login to your account" }),
  emailInput: page.locator('[data-qa="login-email"]'),
  passwordInput: page.locator('[data-qa="login-password"]'),
  loginBtn: page.getByRole("button", { name: "Login" }),
  invalidLoginMessage: page.getByText("Your email or password is incorrect!"),
});

export const getPreSignupLocators = (page: Page) => ({
  signupHeading: page.getByRole("heading", { name: "New User Signup!" }),
  nameInput: page.locator('[data-qa="signup-name"]'),
  emailInput: page.locator('[data-qa="signup-email"]'),
  signupBtn: page.getByRole("button", { name: "Signup" }),
  existingEmailMessage: page.getByText("Email Address already exist!"),
});

export const getSignupLocators = (page: Page) => ({
  accountInfoHeading: page.getByText("ENTER ACCOUNT INFORMATION", { exact: false }),
  titleMrRadio: page.getByLabel("Mr."),
  titleMrsRadio: page.getByLabel("Mrs."),
  nameInput: page.locator("input#name"),
  emailInput: page.locator("input#email"),
  passwordInput: page.getByLabel("Password"),
  dayDropdown: page.locator("select#days"),
  monthDropdown: page.locator("select#months"),
  yearDropdown: page.locator("select#years"),
  newsletterCheckbox: page.getByRole("checkbox", {
    name: "Sign up for our newsletter!",
  }),
  specialOfferCheckbox: page.getByRole("checkbox", {
    name: "Receive special offers from our partners!",
  }),

  firstNameInput: page.getByLabel("First Name"),
  lastNameInput: page.getByLabel("Last Name"),
  companyInput: page.getByLabel("Company", { exact: true }),
  address1Input: page.getByRole("textbox", {
    name: "Address * (Street address, P.O. Box, Company name, etc.)",
  }),
  address2Input: page.getByLabel("Address 2"),
  countryDropdown: page.getByLabel("Country"),
  stateInput: page.getByLabel("State"),
  cityInput: page.getByLabel("City"),
  zipcodeInput: page.locator("input#zipcode"),
  phoneInput: page.getByLabel("Mobile Number"),
  createAccountBtn: page.getByRole("button", { name: "Create Account" }),
});

export const getAccountCreatedLocators = (page: Page) => ({
  accountCreatedHeading: page.getByText("ACCOUNT CREATED!"),
  continueBtn: page.getByRole("link", { name: "Continue" }),
});

export const getAccountDeletedLocators = (page: Page) => ({
  accountDeletedHeading: page.getByText("ACCOUNT DELETED!"),
  continueBtn: page.getByRole("link", { name: "Continue" }),
});
