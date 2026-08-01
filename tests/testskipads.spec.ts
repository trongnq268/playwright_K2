import { expect, test, Page } from '@playwright/test';
import { Locator_page, productByName } from '../locators/bai10.locator.ts';
import { Data_account, ten_san_pham, Card } from '../type/bai10.data.ts';

// ===== HÀM XỬ LÝ BANNER =====
async function closeAdIfExist(page: Page): Promise<void> {
    try {
        const ad = await page.waitForSelector('.ad-close, .modal-close, .popup-close, button:has-text("Close")', { 
            timeout: 2000 
        });
        await ad.click();
        console.log('✅ Đã đóng banner');
    } catch {
        // Không có banner, bỏ qua
    }
}

// ===== BEFORE EACH =====
test.beforeEach(async ({ page }: { page: Page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;

    await page.goto(`${link}`);
    await closeAdIfExist(page);
    await expect(page).toHaveURL(`${link}`);
    await expect(locator.button_home_page).toBeVisible();
});

// ===== TEST CASE =====
test('testcase_1', async ({ page }: { page: Page }) => {
    const locator = Locator_page(page);
    const account = Data_account[0];
    const card = Card[0];

    // Login
   
    
    await locator.button_product.click();
    await closeAdIfExist(page);;

    await page.waitForTimeout(1000); // Wait for 1 second before proceeding
    await page.close(); // Close the page to simulate a new session
});