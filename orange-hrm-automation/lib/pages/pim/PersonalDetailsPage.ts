import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class PersonalDetailsPage extends BasePage {
  readonly pageHeader: Locator;
  readonly employeeNameHeader: Locator;
  readonly personalDetailsTab: Locator;
  readonly formLoader: Locator;
  readonly nationalityDropdown: Locator;
  readonly nationalityDropdownInput: Locator;
  readonly nationalityOptions: Locator;
  readonly dateOfBirthInput: Locator;
  readonly savePersonalDetailsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.orangehrm-edit-employee-content h6').filter({ hasText: 'Personal Details' });
    this.employeeNameHeader = page.locator('.orangehrm-edit-employee-name');
    this.personalDetailsTab = page.locator('.orangehrm-edit-employee-navigation').getByRole('link', { name: 'Personal Details' });
    this.formLoader = page.locator('.oxd-form-loader, .oxd-loading-spinner');
    this.nationalityDropdown = page.locator('.oxd-input-group:has(label:has-text("Nationality")) .oxd-select-text');
    this.nationalityDropdownInput = page.locator('.oxd-input-group:has(label:has-text("Nationality")) .oxd-select-text-input');
    this.nationalityOptions = page.locator('.oxd-select-dropdown [role="option"]');
    this.dateOfBirthInput = page.locator('.oxd-input-group:has(label:has-text("Date of Birth")) input');
    // Nút Save đầu tiên thuộc form thông tin Personal Details (nút thứ 2 thuộc Custom Fields)
    this.savePersonalDetailsButton = page.locator('.orangehrm-edit-employee-content form').first().locator('button[type="submit"]');
  }

  /**
   * Chờ trang Personal Details tải hoàn tất (skeleton loader biến mất)
   */
  async waitForPageLoaded(): Promise<void> {
    await this.page.waitForURL('**/viewPersonalDetails/**');
    await this.formLoader.waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
    await this.pageHeader.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Chuyển sang tab "Personal Details" trên thanh menu thông tin nhân viên
   */
  async clickPersonalDetailsTab(): Promise<void> {
    await this.personalDetailsTab.click();
    await this.waitForPageLoaded();
  }

  /**
   * Chọn Quốc tịch (Nationality) trong dropdown
   * @param nationality Tên quốc gia/quốc tịch (VD: "Vietnamese", "American")
   */
  async selectNationality(nationality: string): Promise<void> {
    await this.nationalityDropdown.click();
    await this.nationalityOptions.first().waitFor({ state: 'visible', timeout: 5000 });
    const targetOption = this.nationalityOptions.filter({ hasText: nationality }).first();
    await targetOption.waitFor({ state: 'visible', timeout: 5000 });
    await targetOption.click();
  }

  /**
   * Lấy giá trị Quốc tịch hiện tại đang được chọn
   */
  async getSelectedNationality(): Promise<string> {
    return (await this.nationalityDropdownInput.textContent())?.trim() ?? '';
  }

  /**
   * Nhập ngày sinh (Date of Birth)
   * Định dạng chuẩn hiển thị trên OrangeHRM: YYYY-MM-DD (hoặc YYYY-DD-MM tuỳ cấu hình hệ thống)
   * @param dob Chuỗi ngày sinh (VD: "1995-10-20")
   */
  async enterDateOfBirth(dob: string): Promise<void> {
    await this.dateOfBirthInput.click();
    // Xoá nội dung cũ bằng phím tắt trước khi nhập mới
    await this.page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
    await this.page.keyboard.press('Backspace');
    await this.dateOfBirthInput.fill(dob);
  }

  /**
   * Lấy giá trị trường Ngày sinh (Date of Birth)
   */
  async getDateOfBirth(): Promise<string> {
    return await this.dateOfBirthInput.inputValue();
  }

  /**
   * Click nút Save của phần Personal Details
   */
  async clickSave(): Promise<void> {
    await this.savePersonalDetailsButton.click();
  }

  /**
   * Thực hiện toàn bộ việc cập nhật Quốc tịch và Ngày sinh rồi lưu
   * @param nationality Quốc tịch mới
   * @param dob Ngày sinh mới
   */
  async updatePersonalDetails(nationality: string, dob: string): Promise<void> {
    await this.selectNationality(nationality);
    await this.enterDateOfBirth(dob);
    await this.clickSave();
  }
}
