import { test, expect } from '../lib/fixtures/pom-fixtures';
import { Helper } from '../lib/utils/Helper';

test.describe('Kịch bản 1: Authentication Flow', () => {
  test('TC01: Login Success', async ({ loginPage, dashboardPage, page }) => {
    // 1. Lấy User/Pass từ .env
    const username = process.env.USER_NAME as string;
    const password = process.env.PASSWORD as string;

    expect(username, 'Biến môi trường USER_NAME phải được cấu hình trong .env').toBeTruthy();
    expect(password, 'Biến môi trường PASSWORD phải được cấu hình trong .env').toBeTruthy();

    // 2. Nhập vào form Login
    await loginPage.goto();
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);

    // 3. Click nút Login
    await loginPage.clickLogin();

    // 4. Verify: Chuyển đến Dashboard & Hiện tên User ở góc phải
    await expect(page).toHaveURL(/.*dashboard.*/);
    await expect(dashboardPage.headerTitle).toBeVisible();
    await expect(dashboardPage.headerTitle).toHaveText('Dashboard');
    await expect(dashboardPage.userDropdownName).toBeVisible();

    const userNameText = await dashboardPage.getUserName();
    expect(userNameText.length).toBeGreaterThan(0);
    console.log(`Đăng nhập thành công! User hiển thị ở góc phải: "${userNameText}"`);
  });

  test('TC02: Login Fail', async ({ loginPage }) => {
    // 1. Nhập sai Password (random)
    const username = process.env.USER_NAME || 'Admin';
    const randomPassword = Helper.generateRandomPassword();

    await loginPage.goto();
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(randomPassword);

    // 2. Click nút Login
    await loginPage.clickLogin();

    // 3. Verify: Thông báo "Invalid credentials" xuất hiện màu đỏ
    await expect(loginPage.alertBox).toBeVisible();
    await expect(loginPage.alertBox).toHaveClass(/oxd-alert--error/);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');

    // Kiểm tra thông báo có màu đỏ (hệ màu rgb(235, 9, 16) trong giao diện OrangeHRM)
    await expect(loginPage.errorMessage).toHaveCSS('color', 'rgb(235, 9, 16)');

    const errorText = await loginPage.getErrorMessage();
    const errorColor = await loginPage.getErrorMessageColor();
    console.log(`Thông báo lỗi hiển thị: "${errorText}", màu chữ: ${errorColor}`);
  });
});
