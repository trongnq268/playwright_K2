import { Page } from "@playwright/test";

/**
 * Class Helper chứa các hàm xử lý cửa sổ/tab mới (New Window / New Tab)
 */
export class WindowHelper {
  /**
   * Click vào element mở tab mới và trả về Page object của tab mới đó
   * @param page Tab hiện tại
   * @param triggerAction Hàm thực thi hành động click (hoặc trigger)
   * @returns Promise<Page> Tab mới đã mở
   */
  static async switchToNewWindow(page: Page, triggerAction: () => Promise<void>): Promise<Page> {
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      triggerAction(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}

/**
 * Hàm helper hỗ trợ chuyển sang window/tab mới
 */
export const switchToNewWindow = WindowHelper.switchToNewWindow;
