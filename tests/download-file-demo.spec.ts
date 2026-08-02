import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Demo Setup & Check Download File trong Playwright', () => {

  test('TC01 - Download file và tự động lưu vào thư mục downloads của project', async ({ page }) => {
    // 1. Định nghĩa thư mục lưu file download trong project: learning-playwright/downloads
    const downloadDir = path.join(process.cwd(), 'downloads');

    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    // 2. Đi tới trang web có tính năng download (Demo site)
    await page.goto('https://the-internet.herokuapp.com/download');

    // 3. Đăng ký Promise lắng nghe sự kiện 'download' TRƯỚC KHI click nút download
    const downloadPromise = page.waitForEvent('download');

    // 4. Click chọn file cần download (Ví dụ: file 'some-file.txt' hoặc file đầu tiên trong danh sách)
    const downloadLink = page.locator('.example a').first();
    await downloadLink.click();

    // 5. Chờ sự kiện download hoàn tất và lấy thông tin file
    const download = await downloadPromise;

    // Lấy tên file gốc do trình duyệt gợi ý
    const fileName = download.suggestedFilename();
    const filePath = path.join(downloadDir, fileName);

    // 6. Lưu file từ thư mục tạm của browser về thư mục downloads của project
    await download.saveAs(filePath);

    // =========================================================
    // 7. KIỂM TRA (ASSERTION) XEM DOWNLOAD CÓ THÀNH CÔNG KHÔNG
    // =========================================================

    // Check 1: Kiểm tra trình duyệt không bị lỗi trong quá trình download
    const failureReason = await download.failure();
    expect(failureReason, `Download bị thất bại do lỗi: ${failureReason}`).toBeNull();

    // Check 2: Kiểm tra file thực sự tồn tại tại vị trí đã lưu trong project
    const isFileExists = fs.existsSync(filePath);
    expect(isFileExists, `Không tìm thấy file tại đường dẫn: ${filePath}`).toBeTruthy();

    // Check 3: Kiểm tra dung lượng file lớn hơn 0 bytes (đảm bảo file không bị rỗng/hỏng)
    const fileSize = fs.statSync(filePath).size;
    expect(fileSize, 'File tải về có dung lượng bằng 0 bytes').toBeGreaterThan(0);
  });

});
