import { test, expect } from "@playwright/test";
import { getUI } from "../locators/authLocators";
import {
  createDynamicUserData,
  createMandatoryUserData,
  EXISTING_EMAIL_DATA,
} from "../data/user.data";
import {
  fillPreSignupForm,
  registerUser,
  loginUser,
  deleteAccount,
} from "../helpers/authHelper";

test.describe("Quản lý Đăng ký Tài khoản (New User Signup Tests)", () => {
  let ui: ReturnType<typeof getUI>;

  test.beforeEach(async ({ page }) => {
    // Truy cập trang chủ & Điều hướng tới trang Signup/Login
    await page.goto("http://automationexercise.com");
    ui = getUI(page);
    await expect(ui.navigation.homeSlide).toBeVisible();
    await ui.navigation.signupLoginBtn.click();
  });

  test("TC_SIGNUP_001 | Đăng ký tài khoản thành công với đầy đủ các trường (Bắt buộc + Tùy chọn) @smoke @signup @happy_path", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    const dynamicData = createDynamicUserData();
    await fillPreSignupForm(
      page,
      dynamicData.user.name,
      dynamicData.user.email
    );

    await expect(ui.signupUI.accountInfoHeading).toBeVisible();
    await expect(ui.signupUI.nameInput).toHaveValue(dynamicData.user.name);
    await expect(ui.signupUI.emailInput).toHaveValue(dynamicData.user.email);
    await expect(ui.signupUI.emailInput).toBeDisabled();

    await registerUser(page, dynamicData.user, dynamicData.address, {
      isMr: true,
      newsletter: true,
      optin: true,
    });

    await expect(ui.accountCreatedUI.accountCreatedHeading).toBeVisible();
    await ui.accountCreatedUI.continueBtn.click();

    await expect(
      ui.navigation.loggedInUserText(dynamicData.user.name)
    ).toBeVisible();

    await deleteAccount(page);
  });

  test("TC_SIGNUP_002 | Đăng ký tài khoản thành công chỉ với các trường Bắt buộc @regression @signup @happy_path", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    const mandatoryData = createMandatoryUserData();
    await fillPreSignupForm(
      page,
      mandatoryData.user.name,
      mandatoryData.user.email
    );

    await expect(ui.signupUI.accountInfoHeading).toBeVisible();
    await registerUser(page, mandatoryData.user, mandatoryData.address);

    await expect(ui.accountCreatedUI.accountCreatedHeading).toBeVisible();
    await ui.accountCreatedUI.continueBtn.click();

    await expect(
      ui.navigation.loggedInUserText(mandatoryData.user.name)
    ).toBeVisible();

    await deleteAccount(page);
  });

  test("TC_SIGNUP_003 | Đăng ký với Email đã tồn tại trong hệ thống @regression @signup @negative", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    // 1. Tạo mới 1 tài khoản để đảm bảo email chắc chắn đã tồn tại trong hệ thống
    const existingUserData = createDynamicUserData();
    await fillPreSignupForm(
      page,
      existingUserData.user.name,
      existingUserData.user.email
    );
    await registerUser(page, existingUserData.user, existingUserData.address);
    await ui.accountCreatedUI.continueBtn.click();

    // 2. Đăng xuất khỏi tài khoản vừa tạo
    await ui.navigation.logoutBtn.click();
    await ui.navigation.signupLoginBtn.click();

    // 3. Thử đăng ký lại với chính Email đã tồn tại ở trên
    await fillPreSignupForm(
      page,
      "Duplicate User Test",
      existingUserData.user.email
    );

    // 4. Xác minh thông báo lỗi Email Address already exist! hiển thị thành công
    await expect(ui.preSignupUI.existingEmailMessage).toBeVisible();
    await expect(page).toHaveURL(/.*(signup|login)/);

    // 5. Dọn dẹp: Đăng nhập lại tài khoản ban đầu và thực hiện xóa tài khoản
    await ui.navigation.signupLoginBtn.click();
    await loginUser(page, {
      email: existingUserData.user.email,
      password: existingUserData.user.password,
    });
    await deleteAccount(page);
  });

  test("TC_SIGNUP_004 | Bỏ trống trường Name tại Form Signup Bước 1 @regression @signup @negative", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    await ui.preSignupUI.emailInput.fill("valid_email_1712049202@example.com");
    await ui.preSignupUI.signupBtn.click();

    const isNameRequired = await ui.preSignupUI.nameInput.evaluate(
      (el: HTMLInputElement) => el.required
    );
    const isNameValid = await ui.preSignupUI.nameInput.evaluate(
      (el: HTMLInputElement) => el.checkValidity()
    );

    expect(isNameRequired).toBe(true);
    expect(isNameValid).toBe(false);
    await expect(page).toHaveURL(/.*login/);
  });

  test("TC_SIGNUP_005 | Bỏ trống trường Email tại Form Signup Bước 1 @regression @signup @negative", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    await ui.preSignupUI.nameInput.fill("Auto Tester");
    await ui.preSignupUI.signupBtn.click();

    const isEmailRequired = await ui.preSignupUI.emailInput.evaluate(
      (el: HTMLInputElement) => el.required
    );
    const isEmailValid = await ui.preSignupUI.emailInput.evaluate(
      (el: HTMLInputElement) => el.checkValidity()
    );

    expect(isEmailRequired).toBe(true);
    expect(isEmailValid).toBe(false);
    await expect(page).toHaveURL(/.*login/);
  });

  test("TC_SIGNUP_006 | Nhập sai định dạng Email tại Form Signup Bước 1 @regression @signup @negative", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    await fillPreSignupForm(page, "Auto Tester", "invalidemailformat.com");

    const isEmailValid = await ui.preSignupUI.emailInput.evaluate(
      (el: HTMLInputElement) => el.checkValidity()
    );

    expect(isEmailValid).toBe(false);
    await expect(page).toHaveURL(/.*login/);
  });

  test("TC_SIGNUP_007 | Kiểm tra thuộc tính trường Email và tự động điền Name tại Bước 2 @regression @signup @ui", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    const testName = "Tester Readonly";
    const testEmail = `readonly_${Date.now()}@example.com`;

    await fillPreSignupForm(page, testName, testEmail);

    await expect(ui.signupUI.accountInfoHeading).toBeVisible();
    await expect(ui.signupUI.nameInput).toHaveValue(testName);
    await expect(ui.signupUI.emailInput).toHaveValue(testEmail);
    await expect(ui.signupUI.emailInput).toBeDisabled();
  });

  test("TC_SIGNUP_008 | Bỏ trống trường Password bắt buộc tại Bước 2 @regression @signup @negative", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    const mandatoryData = createMandatoryUserData();
    await fillPreSignupForm(
      page,
      mandatoryData.user.name,
      mandatoryData.user.email
    );

    await expect(ui.signupUI.accountInfoHeading).toBeVisible();

    // Điền thông tin địa chỉ nhưng bỏ trống Password
    await ui.signupUI.firstNameInput.fill(mandatoryData.address.firstName);
    await ui.signupUI.lastNameInput.fill(mandatoryData.address.lastName);
    await ui.signupUI.address1Input.fill(mandatoryData.address.address);
    await ui.signupUI.stateInput.fill(mandatoryData.address.state);
    await ui.signupUI.cityInput.fill(mandatoryData.address.city);
    await ui.signupUI.zipcodeInput.fill(mandatoryData.address.zipCode);
    await ui.signupUI.phoneInput.fill(mandatoryData.address.mobilePhone);

    await ui.signupUI.createAccountBtn.click();

    const isPasswordValid = await ui.signupUI.passwordInput.evaluate(
      (el: HTMLInputElement) => el.checkValidity()
    );
    expect(isPasswordValid).toBe(false);
  });

  test("TC_SIGNUP_009 | Bỏ trống trường Address 1 bắt buộc tại Bước 2 @regression @signup @negative", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    const mandatoryData = createMandatoryUserData();
    await fillPreSignupForm(
      page,
      mandatoryData.user.name,
      mandatoryData.user.email
    );

    await expect(ui.signupUI.accountInfoHeading).toBeVisible();

    await ui.signupUI.passwordInput.fill(mandatoryData.user.password);
    await ui.signupUI.firstNameInput.fill(mandatoryData.address.firstName);
    await ui.signupUI.lastNameInput.fill(mandatoryData.address.lastName);
    // Bỏ trống Address 1
    await ui.signupUI.stateInput.fill(mandatoryData.address.state);
    await ui.signupUI.cityInput.fill(mandatoryData.address.city);
    await ui.signupUI.zipcodeInput.fill(mandatoryData.address.zipCode);
    await ui.signupUI.phoneInput.fill(mandatoryData.address.mobilePhone);

    await ui.signupUI.createAccountBtn.click();

    const isAddressValid = await ui.signupUI.address1Input.evaluate(
      (el: HTMLInputElement) => el.checkValidity()
    );
    expect(isAddressValid).toBe(false);
  });

  test("TC_SIGNUP_010 | Bỏ trống trường Mobile Number bắt buộc tại Bước 2 @regression @signup @negative", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    const mandatoryData = createMandatoryUserData();
    await fillPreSignupForm(
      page,
      mandatoryData.user.name,
      mandatoryData.user.email
    );

    await expect(ui.signupUI.accountInfoHeading).toBeVisible();

    await ui.signupUI.passwordInput.fill(mandatoryData.user.password);
    await ui.signupUI.firstNameInput.fill(mandatoryData.address.firstName);
    await ui.signupUI.lastNameInput.fill(mandatoryData.address.lastName);
    await ui.signupUI.address1Input.fill(mandatoryData.address.address);
    await ui.signupUI.stateInput.fill(mandatoryData.address.state);
    await ui.signupUI.cityInput.fill(mandatoryData.address.city);
    await ui.signupUI.zipcodeInput.fill(mandatoryData.address.zipCode);
    // Bỏ trống Mobile Number

    await ui.signupUI.createAccountBtn.click();

    const isPhoneValid = await ui.signupUI.phoneInput.evaluate(
      (el: HTMLInputElement) => el.checkValidity()
    );
    expect(isPhoneValid).toBe(false);
  });

  test("TC_SIGNUP_011 | Kiểm tra giới hạn và ngăn chặn chọn ngày tháng năm sinh trong tương lai @boundary @signup @validation", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    const dynamicData = createDynamicUserData();
    await fillPreSignupForm(
      page,
      dynamicData.user.name,
      dynamicData.user.email
    );

    await expect(ui.signupUI.accountInfoHeading).toBeVisible();

    const years = await ui.signupUI.yearDropdown
      .locator("option")
      .allInnerTexts();
    const yearNumbers = years
      .map((y) => parseInt(y.trim(), 10))
      .filter((y) => !isNaN(y));

    const maxYear = Math.max(...yearNumbers);
    const minYear = Math.min(...yearNumbers);

    expect(minYear).toBe(1900);
    expect(maxYear).toBe(2021);
    expect(yearNumbers).not.toContain(2026);
    expect(yearNumbers).not.toContain(2027);
  });

  test("TC_SIGNUP_012 | Kiểm tra tự động đăng nhập và cập nhật trạng thái Header sau khi nhấn Continue @smoke @signup @functional", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    const dynamicData = createDynamicUserData();
    await fillPreSignupForm(
      page,
      dynamicData.user.name,
      dynamicData.user.email
    );

    await registerUser(page, dynamicData.user, dynamicData.address);
    await expect(ui.accountCreatedUI.accountCreatedHeading).toBeVisible();

    await ui.accountCreatedUI.continueBtn.click();

    await expect(page).toHaveURL("https://automationexercise.com/");
    await expect(
      ui.navigation.loggedInUserText(dynamicData.user.name)
    ).toBeVisible();
    await expect(ui.navigation.logoutBtn).toBeVisible();
    await expect(ui.navigation.deleteAccountBtn).toBeVisible();

    await deleteAccount(page);
  });

  test("TC_SIGNUP_013 | Thực hiện quy trình Xóa tài khoản (Delete Account Cleanup) @regression @signup @cleanup", async ({
    page,
  }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    const dynamicData = createDynamicUserData();
    await fillPreSignupForm(
      page,
      dynamicData.user.name,
      dynamicData.user.email
    );

    await registerUser(page, dynamicData.user, dynamicData.address);
    await ui.accountCreatedUI.continueBtn.click();

    await expect(
      ui.navigation.loggedInUserText(dynamicData.user.name)
    ).toBeVisible();

    await ui.navigation.deleteAccountBtn.click();
    await expect(ui.accountDeletedUI.accountDeletedHeading).toBeVisible();
    await ui.accountDeletedUI.continueBtn.click();

    await expect(page).toHaveURL("https://automationexercise.com/");
    await expect(ui.navigation.signupLoginBtn).toBeVisible();
  });
});
