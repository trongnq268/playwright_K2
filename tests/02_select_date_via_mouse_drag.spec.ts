import { test, expect, Page, Locator } from '@playwright/test';

/**
 * Hàm Helper kéo chuột giữa 2 Locators bất kỳ với vi bước (steps) để React Big Calendar nhận diện event
 */
async function dragBetween(page: Page, startLocator: Locator, endLocator: Locator, steps = 50) {
  const startBox = (await startLocator.boundingBox())!;
  const endBox = (await endLocator.boundingBox())!;

  await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps });
  await page.mouse.up();
}

test('Test tính năng kéo chuột chọn ngày từ 11/08 đến 15/08', async ({ page }) => {
  // 1. Mở trang đặt phòng
  await page.goto('https://automationintesting.online/reservation/1?checkin=2026-08-05&checkout=2026-08-10');

  // 2. Định vị nút ngày 11 và 15
  const startDay = page.locator('.rbc-date-cell:not(.rbc-off-range)').getByRole('button', { name: '01' });
  const endDay = page.locator('.rbc-date-cell:not(.rbc-off-range)').getByRole('button', { name: '30' });

  // 3. Gọi hàm Helper kéo chuột truyền trực tiếp startDay và endDay
  await dragBetween(page, startDay, endDay);

  // 4. Verification: Kiểm tra hiển thị đúng 5 nights
  // const priceSummary = page.getByText(/5 nights/i);
  // await expect(priceSummary).toBeVisible();
});
