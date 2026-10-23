import { Page, Locator } from '@playwright/test';

/**
 * Lớp cơ sở BasePage đóng gói các hành động và phương thức tương tác chung của trình duyệt,
 * phục vụ làm lớp cha kế thừa cho toàn bộ các Page Objects trong framework.
 */
export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Điều hướng tới một địa chỉ URL cụ thể với cơ chế chờ 'domcontentloaded' nhằm tối ưu tốc độ tải trang.
   * @param url Đường dẫn tương đối hoặc URL tuyệt đối
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Nhấp chuột trái vào một phần tử chỉ định.
   * @param locator Đối tượng định vị (Locator) của phần tử
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Nhập giá trị vào trường văn bản.
   * Nếu giá trị là chuỗi rỗng (""), thực hiện xóa sạch trường bằng clear().
   * @param locator Đối tượng định vị của ô nhập liệu
   * @param value Giá trị cần nhập
   */
  async fillField(locator: Locator, value: string): Promise<void> {
    if (value === '') {
      await locator.clear();
    } else {
      await locator.fill(value);
    }
  }

  /**
   * Chọn một giá trị từ danh sách lựa chọn (dropdown menu).
   * @param locator Đối tượng định vị của thẻ select
   * @param value Giá trị hoặc nhãn cần chọn
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  /**
   * Chọn hộp kiểm (checkbox).
   * @param locator Đối tượng định vị của hộp kiểm
   */
  async checkCheckbox(locator: Locator): Promise<void> {
    await locator.check();
  }

  /**
   * Bỏ chọn hộp kiểm (checkbox).
   * @param locator Đối tượng định vị của hộp kiểm
   */
  async uncheckCheckbox(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  /**
   * Lấy nội dung văn bản bên trong của một phần tử.
   * @param locator Đối tượng định vị của phần tử
   */
  async getElementText(locator: Locator): Promise<string> {
    const text = await locator.innerText();
    return text.trim();
  }

  /**
   * Xác thực phần tử có đang hiển thị trực quan trên giao diện hay không.
   * @param locator Đối tượng định vị của phần tử
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Đợi cho phần tử hiển thị trên giao diện theo một khoảng thời gian chờ tùy chọn.
   * @param locator Đối tượng định vị của phần tử
   * @param timeout Thời gian chờ tối đa tính bằng mili-giây
   */
  async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Lấy tiêu đề hiện tại của trang web đang mở.
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Lấy địa chỉ URL hiện tại của trang web.
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}
