import { test, expect, Page } from '@playwright/test';

/**
 * Class Helper chứa các hàm tái sử dụng để tương tác với JS Dialogs (Alert, Confirm, Prompt)
 */
export class JSAlertHelper {
  /**
   * Click nút trigger JS Alert và tự động accept alert
   */
  static async handleAlert(page: Page, buttonText: string = 'Click for JS Alert') {
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.getByRole('button', { name: buttonText }).click();
  }

  /**
   * Click nút trigger JS Confirm và chọn Ok (accept) hoặc Cancel (dismiss)
   */
  static async handleConfirm(
    page: Page,
    action: 'accept' | 'dismiss' = 'accept',
    buttonText: string = 'Click for JS Confirm'
  ) {
    page.once('dialog', async (dialog) => {
      if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    await page.getByRole('button', { name: buttonText }).click();
  }

  /**
   * Click nút trigger JS Prompt, nhập text và chọn Ok (accept) hoặc Cancel (dismiss)
   */
  static async handlePrompt(
    page: Page,
    promptText?: string,
    action: 'accept' | 'dismiss' = 'accept',
    buttonText: string = 'Click for JS Prompt'
  ) {
    page.once('dialog', async (dialog) => {
      if (action === 'accept') {
        await dialog.accept(promptText);
      } else {
        await dialog.dismiss();
      }
    });
    await page.getByRole('button', { name: buttonText }).click();
  }
}

// Cấu hình ép buộc chạy ngầm (headless mode) không mở giao diện trình duyệt
test.use({ headless: true });

test.describe('Demo xử lý JavaScript Alerts trong Playwright', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  });

  test('TC01 - Click JS Alert (Accept)', async ({ page }) => {
    // Đăng ký event listener lắng nghe dialog trước khi click trigger
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });

    // Click button kích hoạt JS Alert
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    // Verify thông báo hiển thị sau khi đóng alert
    const result = page.locator('#result');
    await expect(result).toHaveText('You successfully clicked an alert');
  });

  test('TC02 - Click JS Confirm (Accept - Ok)', async ({ page }) => {
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('I am a JS Confirm');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    const result = page.locator('#result');
    await expect(result).toHaveText('You clicked: Ok');
  });

  test('TC03 - Click JS Confirm (Dismiss - Cancel)', async ({ page }) => {
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('I am a JS Confirm');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    const result = page.locator('#result');
    await expect(result).toHaveText('You clicked: Cancel');
  });

  test('TC04 - Click JS Prompt (Accept kèm nhập text)', async ({ page }) => {
    const inputMessage = 'Xin chào Đại ca!';

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('I am a JS prompt');
      await dialog.accept(inputMessage);
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

    const result = page.locator('#result');
    await expect(result).toHaveText(`You entered: ${inputMessage}`);
  });

  test('TC05 - Click JS Prompt (Dismiss - Cancel)', async ({ page }) => {
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

    const result = page.locator('#result');
    await expect(result).toHaveText('You entered: null');
  });

  test('TC06 - Sử dụng các hàm Helper tái sử dụng', async ({ page }) => {
    // 1. Alert
    await JSAlertHelper.handleAlert(page);
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');

    // 2. Confirm (Dismiss)
    await JSAlertHelper.handleConfirm(page, 'dismiss');
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');

    // 3. Prompt (Accept với text)
    await JSAlertHelper.handlePrompt(page, 'Tiểu đệ đã hoàn thành!');
    await expect(page.locator('#result')).toHaveText('You entered: Tiểu đệ đã hoàn thành!');
  });

});
