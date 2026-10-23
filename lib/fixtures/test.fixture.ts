import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';

/**
 * Định nghĩa kiểu dữ liệu cho các custom fixture mở rộng từ Playwright base test.
 */
type MyFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

/**
 * Custom fixture cung cấp sẵn các đối tượng Page Objects (LoginPage, RegisterPage)
 * giúp tự động quản lý vòng đời khởi tạo trang trong suốt quá trình chạy test.
 */
export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});

export { expect };
