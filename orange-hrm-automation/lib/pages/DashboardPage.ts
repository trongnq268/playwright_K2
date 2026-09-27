import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly headerTitle: Locator;
  readonly userDropdownName: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.userDropdownName = page.locator('.oxd-userdropdown-name');
  }

  /**
   * Kiểm tra header Dashboard có hiển thị không
   */
  async isDashboardVisible(): Promise<boolean> {
    return await this.headerTitle.isVisible();
  }

  /**
   * Lấy tên User hiển thị ở góc trên bên phải
   */
  async getUserName(): Promise<string> {
    return (await this.userDropdownName.textContent())?.trim() ?? '';
  }

  /**
   * Điều hướng đến module PIM từ thanh menu bên trái
   */
  async goToPIM(): Promise<void> {
    await this.clickSidebarMenu('PIM');
    await this.page.waitForURL('**/pim/**');
  }
}
