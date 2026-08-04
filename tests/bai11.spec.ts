import { expect, test } from '@playwright/test';
import { Locator_page } from '../locators/bai11.locator.ts';
import { info_guest, date_time } from '../type/bai11.data.ts';
import { closeAdIfExist } from '../locators/skip_ads.ts';

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
    await closeAdIfExist(page);

    await expect(page).toHaveURL(link);
   
});


test('testcase1', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[0];
    const dateTime = date_time(page);


    await locator.button_booknow_singleroom.click();
    await expect(locator.verify_single_room).toBeVisible();

    await locator.today.click();
    //await locator.next.click();

    // chọn thời gian từ ngày 01/9/2026 đến ngày 05/9/2026
    // const date_start = dateTime.date_start;
    // const date_end = dateTime.date_end;

    // await date_start.dragTo(date_end);

    await expect(locator.button_select_date).toBeVisible();
    await locator.button_select_date.click();

    await locator.button_reserve.click();

    // dien thong tin
    await locator.textbox_firstname.fill(data_guest.Firt_name);
    await locator.textbox_lastname.fill(data_guest.Last_name);
    await locator.textbox_email.fill(data_guest.Email);
    await locator.textbox_phone.fill(data_guest.Phone);

    await locator.button_resever.click();

    await locator.button_return_home.click();
    
    
});