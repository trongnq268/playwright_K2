import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alertBox: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.alertBox = page.locator('.oxd-alert');
    this.errorMessage = page.locator('.oxd-alert-content-text');
  }

  /**
   * Mở trang đăng nhập
   */
  async goto(): Promise<void> {
    await this.navigate('/web/index.php/auth/login');
  }

  /**
   * Nhập username vào form
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Nhập password vào form
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click nút Login
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Thực hiện toàn bộ quy trình login
   */
  async login(username?: string, password?: string): Promise<void> {
    const user = username ?? process.env.USER_NAME ?? '';
    const pass = password ?? process.env.PASSWORD ?? '';
    await this.enterUsername(user);
    await this.enterPassword(pass);
    await this.clickLogin();
  }

  /**
   * Lấy nội dung thông báo lỗi
   */
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  /**
   * Lấy mã màu computed CSS (color) của thông báo lỗi
   */
  async getErrorMessageColor(): Promise<string> {
    return await this.errorMessage.evaluate((el) => window.getComputedStyle(el).color);
  }
}
