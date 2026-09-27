import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import path from 'path';

export class AddEmployeePage extends BasePage {
  readonly pageHeader: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly avatarInput: Locator;
  readonly createLoginDetailsSwitch: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly statusEnabledRadio: Locator;
  readonly statusDisabledRadio: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.orangehrm-main-title');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('.oxd-input-group:has(label:has-text("Employee Id")) input');
    this.avatarInput = page.locator('input[type="file"]');
    this.createLoginDetailsSwitch = page.locator('.oxd-switch-input');
    this.usernameInput = page.locator('.oxd-input-group:has(label:has-text("Username")) input');
    this.passwordInput = page.locator('.oxd-input-group:has(label:text-is("Password")) input[type="password"]');
    this.confirmPasswordInput = page.locator('.oxd-input-group:has(label:has-text("Confirm Password")) input[type="password"]');
    this.statusEnabledRadio = page.locator('.oxd-radio-wrapper:has-text("Enabled") input[type="radio"]');
    this.statusDisabledRadio = page.locator('.oxd-radio-wrapper:has-text("Disabled") input[type="radio"]');
    this.saveButton = page.locator('button[type="submit"]');
    this.cancelButton = page.locator('button:has-text("Cancel")');
  }

  /**
   * Điều hướng trực tiếp tới trang Add Employee
   */
  async goto(): Promise<void> {
    await this.navigate('/web/index.php/pim/addEmployee');
  }

  /**
   * Nhập đầy đủ họ và tên nhân viên
   * @param firstName Tên (First Name)
   * @param lastName Họ (Last Name)
   * @param middleName Tên đệm (Middle Name, tuỳ chọn)
   */
  async enterFullName(firstName: string, lastName: string, middleName?: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    if (middleName) {
      await this.middleNameInput.fill(middleName);
    }
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Upload ảnh đại diện nhân viên (Avatar)
   * @param filePath Đường dẫn tương đối hoặc tuyệt đối tới file ảnh (.jpg, .png...)
   */
  async uploadAvatar(filePath: string): Promise<void> {
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    await this.avatarInput.setInputFiles(absolutePath);
  }

  /**
   * Bật hoặc tắt toggle "Create Login Details"
   * @param enable true để bật, false để tắt
   */
  async toggleCreateLoginDetails(enable: boolean = true): Promise<void> {
    const isUsernameVisible = await this.usernameInput.isVisible();
    if (enable && !isUsernameVisible) {
      await this.createLoginDetailsSwitch.click();
      await this.usernameInput.waitFor({ state: 'visible' });
    } else if (!enable && isUsernameVisible) {
      await this.createLoginDetailsSwitch.click();
      await this.usernameInput.waitFor({ state: 'hidden' });
    }
  }

  /**
   * Nhập thông tin đăng nhập cho nhân viên mới
   * @param username Tên đăng nhập
   * @param password Mật khẩu
   * @param confirmPassword Xác nhận mật khẩu (mặc định lấy trùng password)
   */
  async enterLoginDetails(username: string, password: string, confirmPassword?: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword ?? password);
  }

  /**
   * Lấy mã định danh nhân viên (Employee Id) tự sinh trên form
   */
  async getEmployeeId(): Promise<string> {
    return await this.employeeIdInput.inputValue();
  }

  /**
   * Thiết lập mã định danh nhân viên (Employee Id)
   */
  async setEmployeeId(id: string): Promise<void> {
    await this.employeeIdInput.fill(id);
  }

  /**
   * Click nút Save để lưu nhân viên mới
   */
  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }
}
