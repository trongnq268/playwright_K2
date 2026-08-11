import { test, expect } from '@playwright/test';    
import { Locator_page} from '../locators/bai13.locator';


test.beforeEach(async ({ page }) => {

    // Đăng ký route TRƯỚC khi mở trang
    await page.route('**/*', route => {
        const url = route.request().url();

        if (
            url.includes('googlesyndication') ||
            url.includes('doubleclick') ||
            url.includes('googleads')
        ) {
            route.abort();
        } else {
            route.continue();
        }
    });

    const locator = Locator_page(page);
    const link = locator.go_to_URL;

    await page.goto(link);

    await expect(page).toHaveURL(link);
   
});
test('testcase1', async ({ page }) => {
    const locator = Locator_page(page);

   
    
    
});
