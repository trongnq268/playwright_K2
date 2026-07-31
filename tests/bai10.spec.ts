import { expect, test } from '@playwright/test';



test.beforeEach(async ({ page }, testInfo) => {
//ham chạy trước tất cả các test case
if (testInfo.title === 'testcase4') {
    return;
  }
  // test thử bỏ qua hàm beforeEach khi chạy testcase4
    
    // const Locator_page = Locator(page); 
    // const account = Data_account[0];

    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL('https://automationexercise.com/');
    // truy cap va xac minh duong dan
    // dang nhap thanh cong 
   


    //await page.close();
}); 
