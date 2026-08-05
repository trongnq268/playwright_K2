import { Page } from "@playwright/test";

export const getUI = (page: Page) => ({
  navigation: getHomepageLocators(page),
  loginUI: getLoginLocators(page),
  preSignupUI: getPreSignUpLocators(page),
  signupUI: getSignUpLocators(page),
});
export const getHomepageLocators = (page: Page) => ({
  // Trang chủ & menu
  homePageLogo: page.getByRole("img", {
    name: "Website for automation practice",
  }),
  signupLoginBtn: page.getByRole("link", { name: "Signup / Login" }),
  // Không dùng exact:true vì icon font (fa-shopping-cart) chèn thêm ký tự vào accessible name.
  // Phải khoanh vùng trong .nav.navbar-nav (menu chính) vì trang luôn có sẵn 1 link "View Cart"
  // khác nằm trong #cartModal (ẩn qua CSS) mà getByRole đôi lúc vẫn khớp, gây strict mode violation.
  cartBtn: page.locator(".nav.navbar-nav").getByRole("link", { name: "Cart" }),
  logoutBtn: page.getByRole("link", { name: "Logout" }),
  loggedInUserText: (username: string) =>
    `a:has-text("Logged in as ${username}")`,
  // Dùng khi đăng nhập bằng tài khoản có sẵn (không biết trước username, không tạo tài khoản mới để lấy tên)
  loggedInIndicator: page.locator(".nav.navbar-nav").getByText("Logged in as"),
});

export const getPreSignUpLocators = (page: Page) => ({
  signupTitleText: page.getByRole("heading", {
    name: "New User Signup!",
    level: 2,
  }),
  signupNameInput: page.locator('[data-qa="signup-name"]'),
  signupEmailInput: page.locator('[data-qa="signup-email"]'),
  signupLoginBtn: page.locator('[data-qa="signup-button"]'),
  emailExistText: page.getByText("Email Address already exist!", {exact: true,}),
});

export const getSignUpLocators = (page: Page) => ({
  accountInforText: page.locator(`b:has-text("Enter Account Information")`),
  MrRadio: page.getByLabel("Mr."),
  MrsRadio: page.getByLabel("Mrs."),
  nameInput: page.locator("#name"),
  emailInput: page.locator('[data-qa="email"]'),
  passwordInput: page.locator('[data-qa="password"]'),
  daySelect: page.locator('[data-qa="days"]'),
  monthSelect: page.locator('[data-qa="months"]'),
  yearSelect: page.locator('[data-qa="years"]'),
  newsletterCheckbox: page.getByLabel("Sign up for our newsletter!"),
  specialOfferCheckbox: page.getByLabel(
    "Receive special offers from our partners!",
  ),
  FirstNameInput: page.locator('[data-qa="first_name"]'),
  LastNameInput: page.locator('[data-qa="last_name"]'),
  CompanyInput: page.locator('[data-qa="company"]'),
  AddressInput: page.locator('[data-qa="address"]'),
  Address2Input: page.locator('[data-qa="address2"]'),
  CountrySelect: page.locator('[data-qa="country"]'),
  StateInput: page.locator('[data-qa="state"]'),
  CityInput: page.locator('[data-qa="city"]'),
  ZipcodeInput: page.locator('[data-qa="zipcode"]'),
  MobilePhoneInput: page.locator('[data-qa="mobile_number"]'),
  createAccountBtn: page.locator('[data-qa="create-account"]'),
  accountCreatedText: page.locator(`b:has-text("Account Created!")`),
  continueBtn: page.locator('[data-qa="continue-button"]'),
  //   loggedInUserSignupText: (username: string) => page.locator(`a:has-text("Logged in as ${username}")`),
  deleteBtn: page.getByRole("link", { name: "Delete Account" }),
  accountDeletedText: page.locator(`b:has-text("Account Deleted!")`),
});

export const getLoginLocators = (page: Page) => ({
  loginTitleText: page.getByRole("heading", {
    name: "Login to your account",
    level: 2,
  }),
  loginEmailInput: page.locator('[data-qa="login-email"]'),
  loginPasswordInput: page.locator('[data-qa="login-password"]'),
  loginBtn: page.locator('[data-qa="login-button"]'),
  errorMessageText: page.getByText("Your email or password is incorrect!", {
    exact: true,
  }),
});
