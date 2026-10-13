import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Lấy tiêu đề của trang web (HTML <title>)
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Lấy URL hiện tại của trang
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
