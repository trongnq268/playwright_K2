import { expect, test } from '@playwright/test';
import { Locator_page, Verify_values} from '../locators/bai11.locator';
import { info_guest, time } from '../type/bai11.data';
import { closeAdIfExist } from '../locators/skip_ads';




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
// ham nhap thong tin
async function fillGuestInfo(locator: ReturnType<typeof Locator_page>, data_guest: any) {
    await locator.textbox_firstname.pressSequentially(data_guest.Firt_name);
    await locator.textbox_lastname.pressSequentially(data_guest.Last_name);
    await locator.textbox_email.pressSequentially(data_guest.Email);
    await locator.textbox_phone.pressSequentially(data_guest.Phone);
}
// ham dien thoi gian
async function filltime(locator: ReturnType<typeof Locator_page>, data_time: any) {
    await locator.text_box_start_day.clear();
    await locator.text_box_start_day.pressSequentially(data_time.start_day);
    await locator.text_box_end_day.clear();
    await locator.text_box_end_day.pressSequentially(data_time.end_day);
}
// ham book phong
async function bookSingleRoom(locator: ReturnType<typeof Locator_page>) {
    await locator.button_booknow_singleroom.click();
    await expect(locator.verify_single_room).toBeVisible();
    await locator.today.click();
    await expect(locator.button_select_date).toBeVisible();
    await locator.button_select_date.click();
    await locator.button_reserve.click();
}



test('testcase1', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[0];
    const dateTime = time;
    const verify_values = Verify_values(page);

    
    await filltime(locator, dateTime[0]); 

    await bookSingleRoom(locator);

    // dien thong tin
    await fillGuestInfo(locator, data_guest);

    await locator.button_resever.click();
    

    await Promise.race([
    locator.button_return_home.waitFor({ state: "visible" }),
    locator.page_over_load.waitFor({ state: "visible" }),
    ]);

    if (await locator.button_return_home.isVisible()) {
        await expect(locator.verify_date).toBeVisible();
        await locator.button_return_home.click();
    } 
    if (await locator.page_over_load.isVisible()) {
        await expect(locator.page_over_load).toBeVisible();
        
    }
   
    
    
});
test('testcase2', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[1];
    const dateTime = time;
    const verify_values = Verify_values(page);
    
    await filltime(locator, dateTime[0]);

    await bookSingleRoom(locator);

    // dien thong tin
    await fillGuestInfo(locator, data_guest);

    await locator.button_resever.click();

    await Promise.race([
    locator.button_return_home.waitFor({ state: "visible" }),
    locator.page_over_load.waitFor({ state: "visible" }),
    ]);

    if (await locator.button_return_home.isVisible()) {
        await expect(locator.verify_date).toBeVisible();
        await locator.button_return_home.click();
    } 
    if (await locator.page_over_load.isVisible()) {
        await expect(locator.page_over_load).toBeVisible();
        
    }
    
    
});
test('testcase3', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[2];
    const dateTime = time;
    const verify_values = Verify_values(page);


    await filltime(locator, dateTime[0]);

    await bookSingleRoom(locator);

    // dien thong tin
    await fillGuestInfo(locator, data_guest);

    await locator.button_resever.click();
    await expect(verify_values.firt_name_3_18_characters).toBeVisible();

});
test('testcase4', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[3];
    const dateTime = time;
    const verify_values = Verify_values(page);

    await filltime(locator, dateTime[0]);

    await bookSingleRoom(locator);

    // dien thong tin
    await fillGuestInfo(locator, data_guest);
    await locator.button_reserve.click();

    await Promise.race([
    locator.button_return_home.waitFor({ state: "visible" }),
    locator.page_over_load.waitFor({ state: "visible" }),
    ]);

    if (await locator.button_return_home.isVisible()) {
        await expect(locator.verify_date).toBeVisible();
        await locator.button_return_home.click();
    } 
    if (await locator.page_over_load.isVisible()) {
        await expect(locator.page_over_load).toBeVisible();
    }
});
test('testcase5', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[4];
    const dateTime = time;
    const verify_values = Verify_values(page);

    await filltime(locator, dateTime[0]);

    await bookSingleRoom(locator);

    // dien thong tin
    await fillGuestInfo(locator, data_guest);
    await locator.button_resever.click();
    await expect(verify_values.firt_name_3_18_characters).toBeVisible();
});
test('testcase6', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[5];
    const dateTime = time;
    const verify_values = Verify_values(page);

    await filltime(locator, dateTime[0]);

    await bookSingleRoom(locator);

    // dien thong tin
    await fillGuestInfo(locator, data_guest);
    await locator.button_resever.click();
    await expect(verify_values.email_invalid).toBeVisible();
});
test('testcase7', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[6];
    const dateTime = time;
    const verify_values = Verify_values(page);

    await filltime(locator, dateTime[0]);


    await bookSingleRoom(locator);

    // dien thong tin
    await fillGuestInfo(locator, data_guest);
    await locator.button_resever.click();
    await expect(verify_values.phone_invalid).toBeVisible();
    
});
test('testcase8', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[7];
    const dateTime = time;
    const verify_values = Verify_values(page);

    await filltime(locator, dateTime[0]);

    await bookSingleRoom(locator);

    // dien thong tin
    await fillGuestInfo(locator, data_guest);
    await locator.button_resever.click();
    await expect(verify_values.phone_invalid).toBeVisible();

    
});
test('testcase9', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[8];
    const dateTime = time;
    const verify_values = Verify_values(page);

    await filltime(locator, dateTime[0]);

    await bookSingleRoom(locator);

    // chi dien 1 truong thong tin bat ky
    const locators = [
    locator.textbox_firstname,
    locator.textbox_lastname,
    locator.textbox_email,
    locator.textbox_phone
    ];

    const randomLocator = locators[Math.floor(Math.random() * locators.length)];
    const characters = data_guest.characters ?? '';

    await randomLocator.pressSequentially(characters);
    await locator.button_resever.click();
    await expect(verify_values.verify).toBeVisible();
    

    
});
test('testcase10', async ({ page }) => {
    const locator = Locator_page(page);
    const link = locator.go_to_URL;
    const data_guest = info_guest[0];
    const dateTime = time;
    const verify_values = Verify_values(page);

    await filltime(locator, dateTime[0]);
    
    await bookSingleRoom(locator);

    
    await fillGuestInfo(locator, data_guest);
    await locator.button_cancel.click();
    await expect(locator.button_cancel).toBeHidden();
    

    
});
// test('testcase11', async ({ page }) => {
//     const locator = Locator_page(page);
//     const link = locator.go_to_URL;
//     const data_guest = info_guest[0];
//     const dateTime = time;
//     const verify_values = Verify_values(page);


//     await locator.button_booknow_singleroom.click();
//     await expect(locator.verify_single_room).toBeVisible();

//     await locator.today.click();
    
//     const date_start = page.getByRole('button', { name: '18' });
//     const date_end  = page.getByRole('button', { name: '22' });

//     await date_start.dragTo(date_end);
    



    
// });