import { Page } from "@playwright/test";

export const getUI = (page: Page) => ({
  auth: authLocators(page),
  loginUI: getLoginLocators(page),
  preSignupUI: getPreSignupLocators(page),
  signupUI: getSignupLocators(page),
  afterSignupUI: getAfterSignupLocators(page),
  deleteAccUI: getDeleteAccLocators(page),
});

export const authLocators = (page: Page) => ({
  //Home page and menu bar
  homeSlide: page.locator("#slider-carousel"),
  signupLink: page.getByRole("link", { name: "Signup / Login" }),
  deleteAccLink: page.getByRole("link", { name: "Delete Account" }),
  logoutLink: page.getByRole("link", { name: "Logout" }),
  loggedInUserText: (username: string) =>
    page.getByText(`Logged in as ${username}`),
});

export const getLoginLocators = (page: Page) => ({
    loginHeading: page.getByRole("heading", { name: "Login to your account" }),
    emailInput: page.locator('[data-qa="login-email"]'),
    passwordInput: page.locator('[data-qa="login-password"]'),
    loginBtn: page.getByRole("button", { name: "Login" }),
    invalidLoginMsg: page.getByText("Your email or password is incorrect!"),
});

export const getPreSignupLocators = (page: Page) => ({
  //New user signup form
    signupHeading: page.getByRole("heading", { name: "New User Signup!" }),
    nameInput: page.locator('[data-qa="signup-name"]'),
    emailInput: page.locator('[data-qa="signup-email"]'),
    signUpBtn: page.getByRole("button", { name: "Signup" }),
    invalidEmailMsg: page.getByText("Email Address already exist!"),
});

export const getSignupLocators = (page: Page) => ({
  //Account Information Form
  enterAccInfoText: page.getByText("Enter Account Information"),
  title1: page.getByLabel("Mr."),
  title2: page.getByLabel("Mrs."),
  name: page.locator("input#name"),
  email: page.locator("input#email"),
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

  //Address Information Form
  firstNameInput: page.getByLabel("First Name"),
  lastNameInput: page.getByLabel("Last Name"),
  companyInput: page.getByLabel("Company", { exact: true }),
  addressInput1: page.getByRole("textbox", {
    name: "Address * (Street address, P.O. Box, Company name, etc.)",
  }),
  addressInput2: page.getByLabel("Address 2"),
  countryDropdown: page.getByLabel("Country"),
  stateInput: page.getByLabel("State"),
  cityInput: page.getByLabel("City"),
  zipcodeInput: page.locator("input#zipcode"),
  phoneInput: page.getByLabel("Mobile Number"),
  createAccBtn: page.getByRole("button", { name: "Create Account" }),
});

export const getAfterSignupLocators = (page: Page) => ({
  //Screen after succesfull registration
  signupSuccessHeading: page.getByText("Account Created!"),
  continueBtn: page.getByRole("link", { name: "Continue" }),
});

export const getDeleteAccLocators = (page: Page) => ({
  //Screen after deleting account
  deleteHeading: page.getByText("Account Deleted!"),
  continueBtn: page.getByRole("link", { name: "Continue" }),
});
