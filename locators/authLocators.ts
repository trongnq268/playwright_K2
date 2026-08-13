import { Page } from "@playwright/test";

export const getUI = (page: Page) => ({
    navigation: getHomePageLocators(page),
    UILogin: getLoginLocators(page),
    UIPreSignUp: getPreSignUpLocators(page),
    UISignUp: getSignUpLocators(page),
    UIAccountCreate: getAccountCreateLocators(page),
    UIAccountDelete: getAccountDeleteLocators(page),
})

export const getHomePageLocators= (page: Page) =>({
    homePageSlide : page.locator(`#slider-carousel > div.carousel-inner`),
    homeLink: page.getByRole('link', { name: 'Home' }),
    SignupLoginLink: page.getByRole('link', { name: 'Signup / Login' }),
    LogoutLink: page.getByRole('link', { name: 'Logout' }),
    deleteAccountLink: page.getByRole('link', { name: 'Delete Account' }),
    loginUserText:(username: string) => 
        page.getByText(`Logged in as ${username}`),

    // //Homework9:
    // productLink: page.getByRole('link', { name: 'Products' }),
    // addToCartBtn: page.getByText('Add to cart'),
    // viewProducLink: page.getByRole('link', { name: 'View Product' }),
    // viewCartLink: page.locator(`u:has-text("View Cart")`),
    // continueShoppingBtn: page.getByRole('button', { name: 'Continue Shopping' }),
    // productAddSuccessMsg: page.getByText('Your product has been added to cart.', { exact: true }),

});

// Trang Login - Sign Up
export const getPreSignUpLocators= (page: Page) =>({
    newUserSignUpText :page.getByRole('heading', { name: 'New User Signup!' }),
    nameRegisterInput: page.locator('[data-qa="signup-name"]'),
    emailAddressRegisterInput: page.locator('[data-qa="signup-email"]'),
    signUpButton: page.getByRole('button', { name: 'Signup' }),
    emailExistMsg: page.getByText('Email Address already exist!'),
})

// Trang Login - Login
export const getLoginLocators = (page: Page)=> ({
    loginAccountText: page.getByRole('heading', { name: 'Login to your account' }),
    emailAddressLoginInput: page.locator('[data-qa="login-email"]'),
    passwordLoginInput: page.locator('[data-qa="login-password"]'),
    loginButton: page.getByRole('button', { name: 'Login' }),
    invalidLoginMsg: page.getByText('Your email or password is incorrect!'),
});

//Trang Sign Up - Account Infomation
export const getSignUpLocators = (page: Page) => ({
    accountInfoText: page.getByText("ENTER ACCOUNT INFORMATION", { exact: false }),
    MrRadio: page.getByLabel("Mr."),
    MrsRadio: page.getByLabel("Mrs."),
    nameInput: page.locator("input#name"),
    emailInput:page.locator("input#email"),
    passwordInput: page.getByLabel("Password"),
    daySelect: page.locator("select#days"),
    monthSelect: page.locator("select#months"),
    yearSelect: page.locator("select#years"),
    signupNewsletterCheckbox: page.getByRole('checkbox', { name: 'Sign up for our newsletter!', }),
    receiverOffersCheckbox: page.getByRole('checkbox', { name: 'Receive special offers from our partners!',}),

    //Trang Sign Up - Address Information
    fistNameInput: page.getByLabel("First Name"),
    lastNameInput: page.getByLabel("Last Name"),
    companyInput: page.getByLabel("Company", { exact: true }),
    addressInput: page.getByRole("textbox", {
        name: "Address * (Street address, P.O. Box, Company name, etc.)",
  }),
    address2Input: page.getByLabel("Address 2"),
    countrySelect: page.getByLabel("Country"),
    stateInput: page.getByLabel("State"),
    cityInput: page.getByLabel("City"),
    zipCodeInput: page.locator("input#zipcode"),
    mobileNumberInput:page.getByLabel("Mobile Number"),
    createAccountButton: page.getByRole("button", { name: "Create Account" }),

});

export const getAccountCreateLocators = (page: Page) =>({
    accountCreateHeading: page.getByText('Account Created!',),
    continueBtn: page.getByRole("link", {name: "Continue" }),
})

export const getAccountDeleteLocators = (page: Page) => ({
accountDeletedHeading: page.getByText('Account Deleted!',),
continueBtn: page.getByRole("link", { name: "Continue" }),
})

