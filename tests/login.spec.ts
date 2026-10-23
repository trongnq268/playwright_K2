import { test, expect } from '../lib/fixtures/test.fixture';
import { LoginTestCase } from '../lib/types/login.interface';
import loginDataJson from '../lib/data/loginData.json';

// Ép kiểu dữ liệu để đảm bảo tập dữ liệu kiểm thử tuân thủ chặt chẽ interface LoginTestCase
const loginData: LoginTestCase[] = loginDataJson as LoginTestCase[];

test.describe('Chức năng Đăng nhập - Data Driven Testing', { tag: ['@login', '@regression'] }, () => {
  for (const data of loginData) {
    test(`[${data.testCaseId}] ${data.description}`, async ({ loginPage, page }) => {
      await test.step('Điều hướng tới trang đăng nhập và kiểm tra form', async () => {
        await loginPage.goto();
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
      });

      await test.step(`Thực hiện đăng nhập với tài khoản: ${data.email || '<rỗng>'}`, async () => {
        await loginPage.login(data.email, data.password);
      });

      await test.step('Xác thực kết quả kiểm thử', async () => {
        if (data.expectedResult === 'success') {
          await expect(loginPage.logoutButton).toBeVisible();
          await expect(loginPage.loggedInUser).toBeVisible();
        } else {
          const hasError = await loginPage.isErrorMessageVisible();
          if (hasError) {
            const errorMessage = await loginPage.getErrorMessage();
            if (data.expectedMessage) {
              expect(errorMessage).toContain(data.expectedMessage);
            } else {
              expect(errorMessage).toBeTruthy();
            }
          } else {
            // Form bị chặn ở client bởi HTML5 validation
            await expect(loginPage.logoutButton).not.toBeVisible();
            expect(page.url()).toContain('/login');
          }
        }
      });
    });
  }
});
