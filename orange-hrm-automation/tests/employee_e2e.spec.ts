import { test, expect } from '../lib/fixtures/pom-fixtures';
import { Helper } from '../lib/utils/Helper';
import path from 'path';
import fs from 'fs';

test.describe.serial('Kịch bản 2: Quản lý nhân viên (Phần 1 & Phần 2)', () => {

  test.beforeEach(async ({ loginPage }) => {
    // Tiền điều kiện: Đăng nhập vào hệ thống bằng tài khoản Quản trị viên (Admin)
    const username = process.env.USER_NAME as string;
    const password = process.env.PASSWORD as string;

    await loginPage.goto();
    await loginPage.login(username, password);
  });

  test('TC03: CREATE (Thêm mới)', async ({
    dashboardPage,
    employeeListPage,
    addEmployeePage,
    page,
  }) => {
    // 1. Vào PIM > Add Employee
    await dashboardPage.goToPIM();
    await employeeListPage.clickAddEmployee();

    // Verify đã chuyển tới đúng trang Add Employee
    await expect(page).toHaveURL(/.*pim\/addEmployee.*/);
    await expect(addEmployeePage.pageHeader).toBeVisible();
    await expect(addEmployeePage.pageHeader).toHaveText('Add Employee');

    // Chuẩn bị dữ liệu nhân viên ngẫu nhiên tránh trùng lặp tài khoản và ID
    const randomSuffix = Helper.generateRandomString(5);
    const firstName = 'Automation';
    const middleName = 'QA';
    const lastName = `Staff_${randomSuffix}`;
    const employeeId = Helper.generateRandomEmployeeId();
    const username = Helper.generateRandomUsername();
    const password = Helper.generateStrongPassword();
    const avatarPath = path.resolve(__dirname, '../lib/data/avatar-dep-92.jpg');

    // 2. Nhập Họ tên đầy đủ
    await addEmployeePage.enterFullName(firstName, lastName, middleName);
    await addEmployeePage.setEmployeeId(employeeId);

    console.log(`Đã nhập họ tên: "${firstName} ${middleName} ${lastName}", Employee ID: "${employeeId}"`);

    // 3. Thử thách: Upload ảnh Avatar (file .jpg trong data)
    expect(fs.existsSync(avatarPath), `File ảnh avatar không tồn tại tại đường dẫn: ${avatarPath}`).toBeTruthy();
    await addEmployeePage.uploadAvatar(avatarPath);
    console.log(`Đã upload ảnh đại diện từ: "${avatarPath}"`);

    // 4. Bật "Create Login Details" -> Nhập user/pass cho nhân viên
    await addEmployeePage.toggleCreateLoginDetails(true);

    // Verify các trường nhập user/pass hiển thị sau khi bật switch
    await expect(addEmployeePage.usernameInput).toBeVisible();
    await expect(addEmployeePage.passwordInput).toBeVisible();
    await expect(addEmployeePage.confirmPasswordInput).toBeVisible();

    await addEmployeePage.enterLoginDetails(username, password);
    console.log(`Đã nhập tài khoản đăng nhập cho nhân viên: Username="${username}"`);

    // Click nút Save để lưu nhân viên mới
    await addEmployeePage.clickSave();

    // 5. Verify: Toast message "Successfully Saved"
    await expect(addEmployeePage.toast).toBeVisible({ timeout: 10000 });
    await expect(addEmployeePage.toast).toContainText('Successfully Saved');
    console.log('Xác thực thành công: Toast hiển thị thông báo "Successfully Saved"');

    // Lưu lại thông tin nhân viên vừa tạo vào file employees.json để phục vụ các kịch bản kế tiếp (TC04, TC05, TC06)
    const employeeRecord = {
      firstName,
      middleName,
      lastName,
      fullName: `${firstName} ${middleName} ${lastName}`,
      employeeId,
      username,
      password,
      avatarPath,
      createdAt: new Date().toISOString(),
    };
    const jsonPath = path.resolve(__dirname, '../lib/data/employees.json');
    fs.writeFileSync(jsonPath, JSON.stringify(employeeRecord, null, 2), 'utf-8');
    console.log(`Đã lưu thông tin nhân viên vào ${jsonPath}`);
  });

  test('TC04: READ (Tìm kiếm)', async ({
    dashboardPage,
    employeeListPage,
    page,
  }) => {
    // Đọc thông tin nhân viên vừa tạo từ file employees.json
    const jsonPath = path.resolve(__dirname, '../lib/data/employees.json');
    expect(fs.existsSync(jsonPath), `File ${jsonPath} không tồn tại. Vui lòng chạy TC03 trước để tạo nhân viên.`).toBeTruthy();
    const employeeData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    const searchTargetName = employeeData.lastName;
    console.log(`Chuẩn bị tìm kiếm nhân viên: Name="${searchTargetName}", FullName="${employeeData.fullName}", ID="${employeeData.employeeId}"`);

    // 1. Quay lại trang Employee List
    await dashboardPage.goToPIM();
    await employeeListPage.clickEmployeeListTab();

    // Verify: Đã chuyển đến trang Employee List thành công
    await expect(page).toHaveURL(/.*pim\/viewEmployeeList.*/);
    await expect(employeeListPage.employeeNameSearchInput).toBeVisible();
    await expect(employeeListPage.searchButton).toBeVisible();

    // 2. Nhập Tên nhân viên vừa tạo vào ô tìm kiếm
    await employeeListPage.enterEmployeeName(searchTargetName, true);
    console.log(`Đã nhập "${searchTargetName}" vào ô tìm kiếm Employee Name`);

    // 3. Click Search
    await employeeListPage.clickSearch();
    console.log('Đã click nút Search');

    // 4. Verify: Kết quả tìm kiếm hiển thị đúng thông tin nhân viên
    // Chờ danh sách bảng kết quả hiển thị
    await expect(employeeListPage.tableRows.first()).toBeVisible({ timeout: 10000 });

    // Kiểm tra thông báo số lượng bản ghi (Record(s) Found)
    const recordsText = await employeeListPage.getRecordsCountText();
    console.log(`Thông báo kết quả: "${recordsText}"`);
    expect(recordsText).toMatch(/\([0-9]+\)\s*Records?\s*Found/i);

    // Tìm dòng tương ứng với nhân viên vừa tạo (theo ID hoặc FullName)
    const targetRow = employeeListPage.getRowByText(employeeData.employeeId);
    await expect(targetRow).toBeVisible();

    // Xác thực các cột thông tin hiển thị đúng dữ liệu nhân viên
    await expect(targetRow).toContainText(employeeData.employeeId);
    await expect(targetRow).toContainText(employeeData.firstName);
    await expect(targetRow).toContainText(employeeData.lastName);

    // Lấy chi tiết thông tin từ dòng kết quả để kiểm tra cấu trúc bảng POM
    const rowData = await employeeListPage.getRowData(0);
    console.log('Dữ liệu hàng đầu tiên trong bảng:', JSON.stringify(rowData, null, 2));

    console.log(`Xác thực thành công TC04: Nhân viên "${employeeData.fullName}" (ID: ${employeeData.employeeId}) hiển thị chính xác trong kết quả tìm kiếm!`);
  });

  test('TC05: UPDATE (Cập nhật)', async ({
    dashboardPage,
    employeeListPage,
    personalDetailsPage,
    page,
  }) => {
    // Đọc thông tin nhân viên vừa tạo từ file employees.json
    const jsonPath = path.resolve(__dirname, '../lib/data/employees.json');
    expect(fs.existsSync(jsonPath), `File ${jsonPath} không tồn tại. Vui lòng chạy TC03 trước để tạo nhân viên.`).toBeTruthy();
    const employeeData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    console.log(`Bắt đầu TC05: Cập nhật thông tin cho nhân viên ID="${employeeData.employeeId}", FullName="${employeeData.fullName}"`);

    // 1. Vào PIM > Tìm và Click vào nhân viên trong danh sách
    await dashboardPage.goToPIM();
    await employeeListPage.clickEmployeeListTab();

    // Tìm kiếm nhân viên theo Employee ID để định vị chính xác trong bảng
    await employeeListPage.searchByEmployeeId(employeeData.employeeId);
    await expect(employeeListPage.tableRows.first()).toBeVisible({ timeout: 10000 });

    // Click vào nhân viên (nút Edit) trong danh sách
    await employeeListPage.clickEditEmployee(employeeData.employeeId);

    // 2. Chuyển sang tab "Personal Details"
    await personalDetailsPage.waitForPageLoaded();
    await personalDetailsPage.clickPersonalDetailsTab();

    // Verify đã mở đúng trang thông tin chi tiết nhân viên
    await expect(page).toHaveURL(/.*pim\/viewPersonalDetails.*/);
    await expect(personalDetailsPage.pageHeader).toBeVisible();

    // 3. Sửa thông tin: Nationality & Date of Birth
    const updatedNationality = 'Vietnamese';
    // Lưu ý: Hệ thống OrangeHRM này định dạng ngày sinh theo placeholder "yyyy-dd-mm"
    const updatedDob = '1995-20-10';

    await personalDetailsPage.selectNationality(updatedNationality);
    await personalDetailsPage.enterDateOfBirth(updatedDob);
    console.log(`Đã sửa thông tin: Nationality="${updatedNationality}", Date of Birth="${updatedDob}"`);


    // 4. Click Save
    await personalDetailsPage.clickSave();

    // 5. Verify: Toast message "Successfully Saved" (hệ thống OrangeHRM hiển thị "Successfully Updated" hoặc "Successfully Saved")
    await expect(personalDetailsPage.toast).toBeVisible({ timeout: 10000 });
    await expect(personalDetailsPage.toast).toContainText(/Successfully\s+(Saved|Updated)/i);
    const toastMsg = await personalDetailsPage.getToastMessage();
    console.log(`Toast message hiển thị: "${toastMsg}"`);


    // Xác thực thêm: Kiểm tra dữ liệu trên form sau khi cập nhật
    const selectedNationality = await personalDetailsPage.getSelectedNationality();
    expect(selectedNationality).toBe(updatedNationality);

    const savedDob = await personalDetailsPage.getDateOfBirth();
    expect(savedDob).toBe(updatedDob);

    // Cập nhật lại file employees.json để lưu trữ trạng thái mới nhất
    employeeData.nationality = updatedNationality;
    employeeData.dateOfBirth = updatedDob;
    employeeData.updatedAt = new Date().toISOString();
    fs.writeFileSync(jsonPath, JSON.stringify(employeeData, null, 2), 'utf-8');

    console.log(`Xác thực thành công TC05: Cập nhật nhân viên "${employeeData.fullName}" thành công!`);
  });

  test('TC06: DELETE (Xóa)', async ({
    dashboardPage,
    employeeListPage,
    page,
  }) => {
    // Đọc thông tin nhân viên từ file employees.json (được tạo từ TC03)
    const jsonPath = path.resolve(__dirname, '../lib/data/employees.json');
    expect(fs.existsSync(jsonPath), `File ${jsonPath} không tồn tại. Vui lòng chạy TC03 trước để tạo nhân viên.`).toBeTruthy();
    const employeeData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    console.log(`Bắt đầu TC06: Xóa nhân viên ID="${employeeData.employeeId}", FullName="${employeeData.fullName}"`);

    // 1. Quay lại danh sách, chọn nhân viên đó
    await dashboardPage.goToPIM();
    await employeeListPage.clickEmployeeListTab();

    // Verify: Đã chuyển đến trang Employee List
    await expect(page).toHaveURL(/.*pim\/viewEmployeeList.*/);
    await expect(employeeListPage.employeeIdSearchInput).toBeVisible();

    // Tìm kiếm nhân viên theo Employee ID để định vị chính xác nhân viên cần xóa trong danh sách
    await employeeListPage.searchByEmployeeId(employeeData.employeeId);

    // Verify: Hàng chứa thông tin nhân viên xuất hiện trong bảng danh sách
    const targetRow = employeeListPage.getRowByText(employeeData.employeeId);
    await expect(targetRow).toBeVisible({ timeout: 10000 });
    await expect(targetRow).toContainText(employeeData.employeeId);
    await expect(targetRow).toContainText(employeeData.lastName);

    // Chọn nhân viên đó (tick checkbox trên hàng nhân viên)
    await employeeListPage.selectEmployeeCheckbox(employeeData.employeeId);
    console.log(`Đã chọn nhân viên "${employeeData.fullName}" (ID: ${employeeData.employeeId}) trong danh sách`);

    // 2. Click nút Delete (Thùng rác)
    await employeeListPage.clickDeleteEmployee(employeeData.employeeId);
    console.log('Đã click vào nút Delete (icon thùng rác)');

    // 3. Thử thách: Xử lý Popup xác nhận ("Yes, Delete")
    // Verify: Popup xác nhận hiển thị và có tiêu đề "Are you Sure?"
    await expect(employeeListPage.deleteConfirmModal).toBeVisible({ timeout: 5000 });
    await expect(employeeListPage.deleteConfirmTitle).toContainText('Are you Sure?');
    await expect(employeeListPage.confirmDeleteButton).toBeVisible();
    await expect(employeeListPage.cancelDeleteButton).toBeVisible();
    console.log('Xác thực popup xác nhận xóa hiển thị chính xác với nút "Yes, Delete"');

    // Click nút "Yes, Delete" trên popup
    await employeeListPage.confirmDelete();
    console.log('Đã click nút "Yes, Delete" trên popup xác nhận');

    // Verify: Popup xác nhận đã đóng lại thành công
    await expect(employeeListPage.deleteConfirmModal).toBeHidden({ timeout: 5000 });
    console.log('Popup xác nhận đã đóng thành công');

    // Kiểm tra toast message nếu còn hiển thị trên màn hình (không block nếu toast tự động biến mất nhanh)
    try {
      const toastVisible = await employeeListPage.toast.first().isVisible({ timeout: 2000 });
      if (toastVisible) {
        const deleteToastMsg = await employeeListPage.getToastMessage();
        console.log(`Toast message hiển thị sau khi xóa: "${deleteToastMsg}"`);
      }
    } catch {
      // Toast tự động biến mất nhanh trên UI
    }

    // 4. Verify: Tìm lại nhân viên đó → Kết quả "No Records Found"
    // Tìm kiếm lại với Employee ID vừa xóa
    await employeeListPage.searchByEmployeeId(employeeData.employeeId);

    // Verify: Text "No Records Found" xuất hiện trên trang
    await expect(employeeListPage.noRecordsFoundText.first()).toBeVisible({ timeout: 10000 });

    // Verify: Không còn bản ghi nào trong bảng dữ liệu (rowCount = 0)
    const rowCount = await employeeListPage.getRowCount();
    expect(rowCount).toBe(0);

    // Verify: Thông báo số lượng bản ghi hiển thị "No Records Found"
    const recordsText = await employeeListPage.getRecordsCountText();
    console.log(`Thông báo kết quả tìm kiếm lại: "${recordsText}"`);
    expect(recordsText).toMatch(/No\s+Records?\s+Found/i);

    console.log(`Xác thực thành công TC06: Nhân viên "${employeeData.fullName}" (ID: ${employeeData.employeeId}) đã được xóa hoàn toàn khỏi hệ thống!`);
  });
});


