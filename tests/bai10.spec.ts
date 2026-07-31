import { expect, test } from '@playwright/test';
import { Locator_page,productByName } from '../locators/bai10.locator.ts';
import { Data_account,ten_san_pham } from '../type/bai10.data.ts';


test.beforeEach(async ({ page }, testInfo) => {
    
    const locator = Locator_page(page);
    const link = locator.go_to_URL;


    await page.goto(`${link}`);
    await expect(page).toHaveURL(`${link}`);
    await expect(locator.button_home_page).toBeVisible();
    
    
}); 
test('tìm sản phẩm theo tên', async ({ page }) => {
    const locator = Locator_page(page);
    

    
    await locator.button_product.click();
    // const san_pham  = productByName(page, 'Blue Top');
    // await san_pham.hover();
    await locator.text_box_seach.pressSequentially(`${ten_san_pham}`);
    await locator.icon_seach.click();





});