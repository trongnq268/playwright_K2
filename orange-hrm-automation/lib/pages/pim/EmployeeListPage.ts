import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class EmployeeListPage extends BasePage {
  readonly addEmployeeButton: Locator;
  readonly addEmployeeTab: Locator;
  readonly employeeListTab: Locator;
  readonly employeeNameSearchInput: Locator;
  readonly employeeIdSearchInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly tableRows: Locator;
  readonly recordsFoundText: Locator;
  readonly autocompleteDropdown: Locator;
  readonly tableLoadingSpinner: Locator;
  readonly noRecordsFoundText: Locator;
  readonly deleteConfirmModal: Locator;
  readonly deleteConfirmTitle: Locator;
  readonly confirmDeleteButton: Locator;
  readonly cancelDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addEmployeeButton = page.locator('button:has-text("Add")');
    this.addEmployeeTab = page.getByRole('link', { name: 'Add Employee' });
    this.employeeListTab = page.getByRole('link', { name: 'Employee List' });
    this.employeeNameSearchInput = page.locator('.oxd-input-group:has(label:has-text("Employee Name")) input');
    this.employeeIdSearchInput = page.locator('.oxd-input-group:has(label:has-text("Employee Id")) input');
    this.searchButton = page.locator('button[type="submit"]');
    this.resetButton = page.locator('button:has-text("Reset")');
    this.tableRows = page.locator('.oxd-table-body .oxd-table-card');
    this.recordsFoundText = page.locator('.orangehrm-horizontal-padding span.oxd-text, .oxd-table-filter-header span');
    this.autocompleteDropdown = page.locator('.oxd-autocomplete-dropdown');
    this.tableLoadingSpinner = page.locator('.oxd-loading-spinner, .oxd-form-loader');
    this.noRecordsFoundText = page.getByText('No Records Found');
    this.deleteConfirmModal = page.locator('.oxd-dialog-sheet');
    this.deleteConfirmTitle = this.deleteConfirmModal.getByText('Are you Sure?');
    this.confirmDeleteButton = this.deleteConfirmModal.locator('button:has-text("Yes, Delete")');
    this.cancelDeleteButton = this.deleteConfirmModal.locator('button:has-text("No, Cancel")');
  }

  /**
   * Mở trực tiếp trang danh sách nhân viên qua URL
   */
  async goto(): Promise<void> {
    await this.navigate('/web/index.php/pim/viewEmployeeList');
  }

  /**
   * Click nút "+ Add" để chuyển sang trang thêm nhân viên mới
   */
  async clickAddEmployee(): Promise<void> {
    await this.addEmployeeButton.click();
    await this.page.waitForURL('**/pim/addEmployee');
  }

  /**
   * Click tab "Add Employee" trên thanh điều hướng đầu trang
   */
  async clickAddEmployeeTab(): Promise<void> {
    await this.addEmployeeTab.click();
    await this.page.waitForURL('**/pim/addEmployee');
  }

  /**
   * Click tab "Employee List" trên thanh điều hướng đầu trang
   */
  async clickEmployeeListTab(): Promise<void> {
    await this.employeeListTab.click();
    await this.page.waitForURL('**/pim/viewEmployeeList**');
  }

  /**
   * Nhập tên nhân viên vào ô tìm kiếm Employee Name
   * @param name Tên nhân viên (có thể là First Name, Last Name hoặc Full Name)
   * @param selectHint Nếu true, chọn gợi ý xuất hiện trong autocomplete dropdown
   */
  async enterEmployeeName(name: string, selectHint: boolean = false): Promise<void> {
    await this.employeeNameSearchInput.click();
    await this.employeeNameSearchInput.fill(name);

    if (selectHint) {
      const option = this.autocompleteDropdown.locator('[role="option"]').filter({ hasText: name }).first();
      try {
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
      } catch {
        // Nếu không xuất hiện popup autocomplete kịp thời, giữ nguyên text đã nhập
      }
    }
  }

  /**
   * Nhập Employee Id vào ô tìm kiếm
   * @param id Mã nhân viên
   */
  async enterEmployeeId(id: string): Promise<void> {
    await this.employeeIdSearchInput.click();
    await this.employeeIdSearchInput.fill(id);
  }

  /**
   * Click nút Search và chờ dữ liệu bảng hoàn tất tải
   */
  async clickSearch(): Promise<void> {
    const searchResponsePromise = this.page.waitForResponse(
      response => response.url().includes('/api/v2/pim/employees') && response.status() === 200,
      { timeout: 10000 }
    ).catch(() => null);

    await this.searchButton.click();
    await searchResponsePromise;
    // Chờ loading spinner biến mất nếu xuất hiện
    await this.tableLoadingSpinner.waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
  }

  /**
   * Click nút Reset form tìm kiếm
   */
  async clickReset(): Promise<void> {
    const resetResponsePromise = this.page.waitForResponse(
      response => response.url().includes('/api/v2/pim/employees') && response.status() === 200,
      { timeout: 10000 }
    ).catch(() => null);

    await this.resetButton.click();
    await resetResponsePromise;
    await this.tableLoadingSpinner.waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
  }

  /**
   * Tìm kiếm nhân viên theo Tên
   * @param name Tên nhân viên
   * @param selectHint Có chọn gợi ý từ autocomplete hay không
   */
  async searchByEmployeeName(name: string, selectHint: boolean = false): Promise<void> {
    await this.enterEmployeeName(name, selectHint);
    await this.clickSearch();
  }

  /**
   * Tìm kiếm nhân viên theo Mã Id
   * @param id Mã nhân viên
   */
  async searchByEmployeeId(id: string): Promise<void> {
    await this.enterEmployeeId(id);
    await this.clickSearch();
  }

  /**
   * Lấy text thông báo số lượng bản ghi tìm thấy (VD: "(1) Record Found")
   */
  async getRecordsCountText(): Promise<string> {
    return (await this.recordsFoundText.first().textContent())?.trim() ?? '';
  }

  /**
   * Lấy số lượng hàng hiển thị trong bảng danh sách
   */
  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  /**
   * Lấy dữ liệu các cột của một hàng theo chỉ số (mặc định hàng đầu tiên - index 0)
   */
  async getRowData(rowIndex: number = 0): Promise<{
    id: string;
    firstAndMiddleName: string;
    lastName: string;
    jobTitle: string;
    employmentStatus: string;
    subUnit: string;
    supervisor: string;
  }> {
    const row = this.tableRows.nth(rowIndex);
    const cells = row.locator('.oxd-table-cell');
    return {
      id: (await cells.nth(1).textContent())?.trim() ?? '',
      firstAndMiddleName: (await cells.nth(2).textContent())?.trim() ?? '',
      lastName: (await cells.nth(3).textContent())?.trim() ?? '',
      jobTitle: (await cells.nth(4).textContent())?.trim() ?? '',
      employmentStatus: (await cells.nth(5).textContent())?.trim() ?? '',
      subUnit: (await cells.nth(6).textContent())?.trim() ?? '',
      supervisor: (await cells.nth(7).textContent())?.trim() ?? '',
    };
  }

  /**
   * Lấy Locator hàng chứa thông tin nhân viên theo Tên hoặc Mã ID
   */
  getRowByText(text: string): Locator {
    return this.tableRows.filter({ hasText: text });
  }

  /**
   * Click vào nút Edit (icon cây bút chì) của nhân viên tìm theo ID hoặc Tên
   * @param identifier ID hoặc Tên nhân viên
   */
  async clickEditEmployee(identifier: string): Promise<void> {
    const row = this.getRowByText(identifier).first();
    await row.waitFor({ state: 'visible' });
    await row.locator('button:has(.bi-pencil-fill)').click();
    await this.page.waitForURL('**/pim/viewPersonalDetails/**');
  }

  /**
   * Click trực tiếp vào dòng nhân viên trong danh sách
   * @param identifier ID hoặc Tên nhân viên
   */
  async clickEmployee(identifier: string): Promise<void> {
    const row = this.getRowByText(identifier).first();
    await row.waitFor({ state: 'visible' });
    // Click vào cell tên hoặc nút edit để mở chi tiết nhân viên
    await row.locator('.oxd-table-cell').nth(2).click();
    await this.page.waitForURL('**/pim/viewPersonalDetails/**');
  }

  /**
   * Click vào nút Delete (icon thùng rác) của nhân viên tìm theo ID hoặc Tên
   * @param identifier ID hoặc Tên nhân viên
   */
  async clickDeleteEmployee(identifier: string): Promise<void> {
    const row = this.getRowByText(identifier).first();
    await row.waitFor({ state: 'visible' });
    // Click vào icon thùng rác (Delete button) trong cột Actions
    await row.locator('button:has(.bi-trash)').click();
    // Chờ popup modal xác nhận xuất hiện
    await this.deleteConfirmModal.waitFor({ state: 'visible' });
  }

  /**
   * Click nút xác nhận "Yes, Delete" trên dialog xác nhận xóa
   */
  async confirmDelete(): Promise<void> {
    await this.confirmDeleteButton.waitFor({ state: 'visible' });
    await this.confirmDeleteButton.click();
    // Chờ modal xác nhận đóng lại
    await this.deleteConfirmModal.waitFor({ state: 'hidden', timeout: 10000 });
  }

  /**
   * Click nút hủy bỏ "No, Cancel" trên dialog xác nhận xóa
   */
  async cancelDelete(): Promise<void> {
    await this.cancelDeleteButton.waitFor({ state: 'visible' });
    await this.cancelDeleteButton.click();
    await this.deleteConfirmModal.waitFor({ state: 'hidden' });
  }

  /**
   * Tick chọn checkbox của hàng nhân viên trong danh sách
   * @param identifier ID hoặc Tên nhân viên
   */
  async selectEmployeeCheckbox(identifier: string): Promise<void> {
    const row = this.getRowByText(identifier).first();
    await row.waitFor({ state: 'visible' });
    await row.locator('.oxd-checkbox-input').click();
  }

  /**
   * Thực hiện toàn bộ quy trình xóa nhân viên: click thùng rác và xác nhận trên popup
   * @param identifier ID hoặc Tên nhân viên
   */
  async deleteEmployee(identifier: string): Promise<void> {
    await this.clickDeleteEmployee(identifier);
    await this.confirmDelete();
  }

  /**
   * Kiểm tra thông báo hoặc trạng thái không tìm thấy bản ghi nào ("No Records Found")
   */
  async isNoRecordsFound(): Promise<boolean> {
    const isNoRecordVisible = await this.noRecordsFoundText.first().isVisible().catch(() => false);
    const rowCount = await this.getRowCount();
    return isNoRecordVisible || rowCount === 0;
  }
}


