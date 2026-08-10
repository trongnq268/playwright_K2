import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Demo Upload File trong Playwright Automation', () => {

  /**
   * TC01: Upload file từ đĩa (thư mục project / data)
   * Minh họa cách upload file chuẩn bằng locator.setInputFiles()
   */
  test('TC01 - Upload file thành công từ thư mục trong project', async ({ page }) => {
    // 1. Chuẩn bị file upload (tạo file mẫu nếu chưa có)
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const fileName = 'sample-upload.txt';
    const filePath = path.join(dataDir, fileName);

    // Nối nội dung giả lập nếu file chưa tồn tại
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'Đây là file nội dung thử nghiệm upload Playwright.', 'utf-8');
    }

    // 2. Truy cập trang upload file
    await page.goto('https://the-internet.herokuapp.com/upload');

    // 3. Kiểm tra hiển thị của trang upload
    const headingUploader = page.getByRole('heading', { name: 'File Uploader' });
    await expect(headingUploader).toBeVisible();

    // 4. Chọn file upload (dùng setInputFiles trên input[type="file"])
    const fileInput = page.locator('#file-upload');
    await fileInput.setInputFiles(filePath);

    // 5. Click nút Upload
    const uploadButton = page.getByRole('button', { name: 'Upload' });
    await uploadButton.click();

    // 6. Kiểm tra (Assertions) kết quả sau khi upload
    // Check 1: Tiêu đề trang chuyển thành "File Uploaded!"
    const headingSuccess = page.getByRole('heading', { name: 'File Uploaded!' });
    await expect(headingSuccess).toBeVisible();

    // Check 2: Tên file hiển thị chính xác trong khu vực #uploaded-files
    const uploadedFileName = page.locator('#uploaded-files');
    await expect(uploadedFileName).toHaveText(fileName);
  });

  /**
   * TC02: Upload file trực tiếp từ bộ nhớ (In-memory Buffer)
   * Không cần phải tạo file vật lý trên ổ đĩa, thích hợp cho việc sinh dữ liệu động
   */
  test('TC02 - Upload file trực tiếp từ Buffer (in-memory buffer)', async ({ page }) => {
    // 1. Định nghĩa tên file và nội dung động trong bộ nhớ
    const fileName = `dynamic-upload-${Date.now()}.txt`;
    const fileBuffer = Buffer.from('Nội dung file được tạo động trực tiếp từ bộ nhớ trong Playwright!');

    // 2. Truy cập trang upload file
    await page.goto('https://the-internet.herokuapp.com/upload');

    // 3. Truyền object chứa thông tin file và buffer vào setInputFiles
    const fileInput = page.locator('#file-upload');
    await fileInput.setInputFiles({
      name: fileName,
      mimeType: 'text/plain',
      buffer: fileBuffer,
    });

    // 4. Click nút Upload
    const uploadButton = page.locator('#file-submit');
    await uploadButton.click();
     const uploadButton1 = page.frameLocator('#file-submit');
    // 5. Assertions kiểm tra kết quả
    const headingSuccess = page.locator('h3');
    await expect(headingSuccess).toHaveText('File Uploaded!');

    const uploadedFileName = page.locator('#uploaded-files');
    await expect(uploadedFileName).toContainText(fileName);
  });

});
