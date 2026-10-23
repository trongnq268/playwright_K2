import path from 'path';
import { test, expect } from '../lib/fixtures/test.fixture';
import { RegisterTestCase } from '../lib/types/register.interface';
import { readCsv } from '../lib/utils/csv_reader';

// Nạp tập dữ liệu kiểm thử DDT từ tệp tin CSV bằng hàm tiện ích tùy biến
const csvPath = path.resolve(__dirname, '../lib/data/registerData.csv');
const registerData: RegisterTestCase[] = readCsv<RegisterTestCase>(csvPath);

test.describe('Chức năng Đăng ký - Data Driven Testing', { tag: ['@register', '@regression'] }, () => {
  for (const data of registerData) {
    test(`[${data.testCaseId}] ${data.description}`, async ({ registerPage, page }) => {
      await test.step('Điều hướng tới trang đăng ký và kiểm tra giao diện ban đầu', async () => {
        await registerPage.goto();
        await expect(registerPage.signupNameInput).toBeVisible();
        await expect(registerPage.signupEmailInput).toBeVisible();
        await expect(registerPage.signupButton).toBeVisible();
      });

      // Với ca đăng ký thành công, sinh email duy nhất có thể truy vết theo chuẩn automation
      const registrationPayload = { ...data };
      if (data.expectedResult === 'success') {
        const timestamp = Date.now();
        registrationPayload.email = `reg_${timestamp}@auto.test`;
      }

      await test.step('Điền thông tin và thực hiện đăng ký', async () => {
        await registerPage.register(registrationPayload);
      });

      await test.step('Xác thực kết quả kiểm thử', async () => {
        if (data.expectedResult === 'success') {
          await expect(registerPage.accountCreatedHeading).toBeVisible({ timeout: 15000 });
          const headingText = await registerPage.getSuccessHeading();
          expect(headingText.toUpperCase()).toContain('ACCOUNT CREATED');
        } else {
          const errorVisible = await registerPage.signupErrorMessage.isVisible().catch(() => false);
          if (errorVisible) {
            const errorMsg = await registerPage.getErrorMessage();
            if (data.expectedMessage) {
              expect(errorMsg).toContain(data.expectedMessage);
            } else {
              expect(errorMsg).toBeTruthy();
            }
          } else {
            // Trường hợp HTML5 validation chặn submit tại client
            await expect(registerPage.accountCreatedHeading).not.toBeVisible();
            expect(page.url()).not.toContain('/account_created');
          }
        }
      });
    });
  }
});
