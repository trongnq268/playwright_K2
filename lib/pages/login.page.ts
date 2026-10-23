import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Lớp LoginPage quản lý các tương tác trên trang Đăng nhập (/login),
 * với các bộ định vị được giới hạn nghiêm ngặt trong khối .login-form để tránh xung đột với form đăng ký.
 */
export class LoginPage extends BasePage {
  // Locators (Getter pattern - lazy evaluation, tránh lỗi stale element)
  get loginForm(): Locator { return this.page.locator('.login-form'); }
  get emailInput(): Locator { return this.loginForm.locator('input[data-qa="login-email"]'); }
  get passwordInput(): Locator { return this.loginForm.locator('input[data-qa="login-password"]'); }
  get loginButton(): Locator { return this.loginForm.locator('button[data-qa="login-button"]'); }
  get errorMessage(): Locator { return this.loginForm.locator('p'); }
  get loggedInUser(): Locator { return this.page.locator('li:has-text("Logged in as")'); }
  get logoutButton(): Locator { return this.page.locator('a[href="/logout"]'); }

  constructor(page: Page) {
    super(page);
  }

  /**
   * Điều hướng tới trang Đăng nhập (/login).
   */
  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  /**
   * Nhập địa chỉ Email vào biểu mẫu đăng nhập.
   * @param email Địa chỉ email cần nhập
   */
  async fillEmail(email: string): Promise<void> {
    await this.fillField(this.emailInput, email);
  }

  /**
   * Nhập Mật khẩu vào biểu mẫu đăng nhập.
   * @param password Mật khẩu cần nhập
   */
  async fillPassword(password: string): Promise<void> {
    await this.fillField(this.passwordInput, password);
  }

  /**
   * Nhấp chọn nút Đăng nhập (Login).
   */
  async clickLogin(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Thực thi toàn bộ quy trình đăng nhập với thông tin tài khoản được cung cấp.
   * @param email Email người dùng
   * @param password Mật khẩu người dùng
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Lấy nội dung thông báo lỗi hiển thị trên biểu mẫu đăng nhập.
   * Kiểm tra thông báo lỗi trả về từ máy chủ hoặc thông điệp xác thực client HTML5.
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isElementVisible(this.errorMessage)) {
      return await this.getElementText(this.errorMessage);
    }
    // Phương án dự phòng: kiểm tra validationMessage của HTML5 nếu biểu mẫu không được gửi đi
    const emailValidation = await this.emailInput.evaluate((el: HTMLInputElement) => el.validationMessage).catch(() => '');
    if (emailValidation) return emailValidation;

    const passwordValidation = await this.passwordInput.evaluate((el: HTMLInputElement) => el.validationMessage).catch(() => '');
    if (passwordValidation) return passwordValidation;

    return '';
  }

  /**
   * Kiểm tra thông báo lỗi có hiển thị trực quan trên biểu mẫu đăng nhập hay không.
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Kiểm tra trạng thái đăng nhập thành công của người dùng.
   * Xác thực sự xuất hiện của menu 'Logged in as <username>' hoặc nút Đăng xuất (Logout).
   */
  async isLoggedIn(): Promise<boolean> {
    const userVisible = await this.isElementVisible(this.loggedInUser);
    const logoutVisible = await this.isElementVisible(this.logoutButton);
    return userVisible || logoutVisible;
  }
}
