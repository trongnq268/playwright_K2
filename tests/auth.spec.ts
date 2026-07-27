import { test, expect } from "@playwright/test";
import { getUI } from "../locators/authLocators";
import * as data from "../data/userData";
import {
  fillPreSignupForm,
  deleteAccount,
  loginUser,
  registerUser,
} from "../helpers/authHelper";
import { IUserLogin } from "../types/user.interface";

test.describe("Quản lý Đăng ký và Đăng nhập (Auth Management Tests)", () => {
  let ui: ReturnType<typeof getUI>;

  test.beforeEach(async ({ page }) => {
    // Step 1: Mở trình duyệt & Step 2: Truy cập http://automationexercise.com
    await page.goto("http://automationexercise.com");
    ui = getUI(page);

    // Step 3: Xác minh trang chủ hiển thị thành công
    await expect(ui.navigation.homeSlide).toBeVisible();

    // Step 4: Nhấp vào nút 'Signup / Login'
    await ui.navigation.signupLoginBtn.click();
  });

  test("TC01 - Đăng ký người dùng thành công (Register User)", async ({ page }) => {
    // Step 5: Xác minh dòng chữ 'New User Signup!' hiển thị
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    // Step 6: Nhập tên & email & Step 7: Nhấp nút 'Signup'
    const dynamicData = data.createDynamicUserData();
    await fillPreSignupForm(
      page,
      dynamicData.user.name,
      dynamicData.user.email,
    );

    // Step 8: Xác minh dòng chữ 'ENTER ACCOUNT INFORMATION' hiển thị
    await expect(ui.signupUI.accountInfoHeading).toBeVisible();
    await expect(ui.signupUI.nameInput).toHaveValue(dynamicData.user.name);
    await expect(ui.signupUI.emailInput).toHaveValue(dynamicData.user.email);

    // Step 9 -> 13: Điền chi tiết thông tin cá nhân/địa chỉ và nhấp 'Create Account'
    await registerUser(page, dynamicData.user, dynamicData.address);

    // Step 14: Xác minh dòng chữ 'ACCOUNT CREATED!' hiển thị
    await expect(ui.accountCreatedUI.accountCreatedHeading).toBeVisible();

    // Step 15: Nhấp nút 'Continue'
    await ui.accountCreatedUI.continueBtn.click();

    // Step 16: Xác minh dòng chữ 'Logged in as [username]' hiển thị
    await expect(
      ui.navigation.loggedInUserText(dynamicData.user.name),
    ).toBeVisible();

    // Step 17: Nhấp nút 'Delete Account'
    await ui.navigation.deleteAccountBtn.click();

    // Step 18: Xác minh dòng chữ 'ACCOUNT DELETED!' hiển thị & nhấp nút 'Continue'
    await expect(ui.accountDeletedUI.accountDeletedHeading).toBeVisible();
    await ui.accountDeletedUI.continueBtn.click();
  });

  test("TC02 - Đăng ký người dùng với Email đã tồn tại (Register User with existing email)", async ({ page }) => {
    // Step 5: Xác minh dòng chữ 'New User Signup!' hiển thị
    await expect(ui.preSignupUI.signupHeading).toBeVisible();

    // Step 6: Nhập tên & email đã tồn tại & Step 7: Nhấp 'Signup'
    await fillPreSignupForm(
      page,
      data.EXISTING_EMAIL_DATA.name,
      data.EXISTING_EMAIL_DATA.email,
    );

    // Step 8: Xác minh thông báo lỗi 'Email Address already exist!' hiển thị
    await expect(ui.preSignupUI.existingEmailMessage).toBeVisible();
  });

  test("TC03 - Đăng nhập người dùng thành công (Login User with correct credentials)", async ({ page }) => {
    // Chuẩn bị tài khoản hợp lệ
    const dynamicData = data.createDynamicUserData();
    await fillPreSignupForm(
      page,
      dynamicData.user.name,
      dynamicData.user.email,
    );
    await registerUser(page, dynamicData.user, dynamicData.address);
    await ui.accountCreatedUI.continueBtn.click();

    // Đăng xuất và quay lại form đăng nhập
    await ui.navigation.logoutBtn.click();
    await ui.navigation.signupLoginBtn.click();

    // Step 5: Xác minh dòng chữ 'Login to your account' hiển thị
    await expect(ui.loginUI.loginHeading).toBeVisible();

    // Step 6: Nhập email & password chính xác & Step 7: Nhấp 'login'
    const loginDetails: IUserLogin = {
      email: dynamicData.user.email,
      password: dynamicData.user.password,
    };
    await loginUser(page, loginDetails);

    // Step 8: Xác minh dòng chữ 'Logged in as [username]' hiển thị
    await expect(
      ui.navigation.loggedInUserText(dynamicData.user.name),
    ).toBeVisible();

    // Step 9: Nhấp nút 'Delete Account' & Step 10: Xác minh 'ACCOUNT DELETED!' hiển thị
    await deleteAccount(page);
  });

  test("TC04 - Đăng nhập người dùng thất bại (Login User with incorrect credentials)", async ({ page }) => {
    // Step 5: Xác minh dòng chữ 'Login to your account' hiển thị
    await expect(ui.loginUI.loginHeading).toBeVisible();

    // Step 6: Nhập email & password sai & Step 7: Nhấp nút 'login'
    await loginUser(page, data.INVALID_LOGIN_DATA);

    // Step 8: Xác minh thông báo lỗi 'Your email or password is incorrect!' hiển thị
    await expect(ui.loginUI.invalidLoginMessage).toBeVisible();
  });
});
