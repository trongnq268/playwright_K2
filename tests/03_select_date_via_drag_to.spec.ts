import { test, expect } from '@playwright/test';

test('Test kéo chuột chọn ngày(Tọa độ trực tiếp)', async ({ page }) => {
  await page.goto('https://automationintesting.online/reservation/1?checkin=2026-08-05&checkout=2026-08-10');

  const startDay = page.locator('.rbc-date-cell:not(.rbc-off-range)').getByRole('button', { name: '20' });
  const endDay = page.locator('.rbc-date-cell:not(.rbc-off-range)').getByRole('button', { name: '30' });

  const startBox = await startDay.boundingBox();
  const endBox = await endDay.boundingBox();

   if (startBox && endBox) {
      // Di chuyển tới ô ngày 02 -> nhấn giữ chuột -> kéo
      await page.mouse.move(startBox.x, startBox.y);
      await page.mouse.down();
      await page.mouse.move(endBox.x, endBox.y, { steps:
  100 });
      await page.mouse.up();
    }
  // Verify hiển thị đúng 28 đêm
  // await expect(page.getByText(/28 nights/i)).toBeVisible();
});
