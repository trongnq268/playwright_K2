import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly toast: Locator;
  readonly successToast: Locator;
  readonly infoToast: Locator;
  readonly toastTitle: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toast = page.locator('.oxd-toast');
    this.successToast = page.locator('.oxd-toast--success');
    this.infoToast = page.locator('.oxd-toast--info');
    this.toastTitle = this.toast.locator('.oxd-text--toast-title');
    this.toastMessage = this.toast.locator('.oxd-text--toast-message');
  }

  /**
   * Điều hướng tới một đường dẫn URL (tương đối theo baseURL)
   * @param path Đường dẫn URL cần tới
   */
  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Lấy tiêu đề trang hiện tại
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Lấy URL hiện tại của trang
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Click vào menu ở thanh bên trái (Sidebar menu)
   * @param menuName Tên menu (ví dụ: 'PIM', 'Admin', 'Dashboard'...)
   */
  async clickSidebarMenu(menuName: string): Promise<void> {
    await this.page.locator(`.oxd-main-menu-item:has-text("${menuName}")`).click();
  }

  /**
   * Lấy nội dung tin nhắn Toast thông báo
   */
  async getToastMessage(): Promise<string> {
    await this.toast.first().waitFor({ state: 'visible' });
    return (await this.toastMessage.first().textContent())?.trim() ?? '';
  }
}

