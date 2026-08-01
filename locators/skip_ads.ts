import { Page, Locator } from '@playwright/test';

// export async function closeAdIfExist(page: Page): Promise<void> {
//     try {
//         const ad = await page.waitForSelector('.ad-close, .modal-close, .popup-close, button:has-text("Close")', { 
//             timeout: 2000 
//         });
//         await ad.click();
//         console.log('✅ Đã đóng banner');
//     } catch {
//         // Không có banner, bỏ qua
//     }
// }
export async function closeAdIfExist(page: Page) {
    const closeButton = page.locator('.close, .modal-close, .btn-close');

    if (await closeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await closeButton.click();
    }
}
