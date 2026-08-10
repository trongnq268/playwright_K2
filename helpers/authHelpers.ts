import { Page, expect } from '@playwright/test';
import { getUI } from '../locators/productsLocators';
import { UserSignupInfo } from '../types/user.interface';
import { handleGoogleAds, safeNavigate } from './productsHelpers';

/**
 * Điền thông tin Đăng ký và tạo tài khoản mới.
 */
export async function signUpUser(page: Page, user: UserSignupInfo) {
  const ui = getUI(page);

  // 1. Điền Name & Email ở form Signup ban đầu
  await ui.authPage.signupNameInput.fill(user.name);
  await ui.authPage.signupEmailInput.fill(user.email);
  await ui.authPage.signupBtn.click();

  await handleGoogleAds(page, '/signup');
  await expect(page).toHaveURL(/.*signup/);

  // 2. Điền chi tiết thông tin tài khoản
  if (user.title === 'Mr') {
    await ui.authPage.titleMrRadio.check();
  } else if (user.title === 'Mrs') {
    await ui.authPage.titleMrsRadio.check();
  }

  await ui.authPage.passwordInput.fill(user.password);

  if (user.day) await ui.authPage.daysSelect.selectOption(user.day);
  if (user.month) await ui.authPage.monthsSelect.selectOption(user.month);
  if (user.year) await ui.authPage.yearsSelect.selectOption(user.year);

  if (user.newsletter) await ui.authPage.newsletterCheckbox.check();
  if (user.specialOffers) await ui.authPage.specialOffersCheckbox.check();

  // 3. Điền thông tin địa chỉ
  await ui.authPage.firstNameInput.fill(user.firstName);
  await ui.authPage.lastNameInput.fill(user.lastName);
  if (user.company) await ui.authPage.companyInput.fill(user.company);
  await ui.authPage.address1Input.fill(user.address1);
  if (user.address2) await ui.authPage.address2Input.fill(user.address2);
  await ui.authPage.countrySelect.selectOption(user.country);
  await ui.authPage.stateInput.fill(user.state);
  await ui.authPage.cityInput.fill(user.city);
  await ui.authPage.zipcodeInput.fill(user.zipcode);
  await ui.authPage.mobileNumberInput.fill(user.mobileNumber);

  // 4. Click Create Account
  await ui.authPage.createAccountBtn.click();

  // 5. Xác nhận ACCOUNT CREATED!
  await expect(ui.authPage.accountCreatedHeading).toBeVisible();
}

/**
 * Click menu Signup / Login và chuyển tới trang Login / Register.
 */
export async function navigateToSignupLoginPage(page: Page) {
  const ui = getUI(page);
  await safeNavigate(page, '/login', async () => {
    await ui.homePage.signupLoginBtn.click({ timeout: 5000 });
  });
  await expect(page).toHaveURL(/.*login/);
}

/**
 * Click nút Continue sau khi tạo tài khoản thành công.
 */
export async function clickContinueAfterAccountCreated(page: Page) {
  const ui = getUI(page);
  await safeNavigate(page, '/', async () => {
    await ui.authPage.accountCreatedContinueBtn.click({ timeout: 5000 });
  });
}

/**
 * Đăng ký tài khoản mới, bấm Continue và xác nhận Logged in as username.
 */
export async function signUpUserAndContinue(page: Page, user: UserSignupInfo) {
  const ui = getUI(page);
  await signUpUser(page, user);
  await clickContinueAfterAccountCreated(page);
  await expect(ui.authPage.loggedInAsText).toContainText(user.name);
}

/**
 * Thực hiện xóa tài khoản và xác nhận ACCOUNT DELETED!
 */
export async function deleteAccount(page: Page) {
  const ui = getUI(page);
  await safeNavigate(page, '/delete_account', async () => {
    await ui.authPage.deleteAccountBtn.click({ timeout: 5000 });
  });
  await expect(ui.authPage.accountDeletedHeading).toBeVisible();
  await safeNavigate(page, '/', async () => {
    await ui.authPage.accountDeletedContinueBtn.click({ timeout: 5000 });
  });
}

