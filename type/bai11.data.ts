
import { Page } from '@playwright/test';



export const info_guest =  [
  // thong tin the
    {  
        Firt_name: 'Nguyen',
        Last_name: 'Duc An',
        Email: 'nguyenvana_test@gmail.com',
        Phone: '09123456789',
    }
  ]

export const date_time = (page: Page) => ({
    // data thời gian
    date_start: page.locator(`//div[position()=1]/div[position()=2]/div[position()=2]/div[position()=1]/div[position()=3]`),//01/9/2026
    date_end: page.locator(`/html/body/div[2]/div/div[2]/div/div[2]/div/div/form/div[1]/div/div[2]/div[2]/div[1]/div[7]`),//05/9/2026   


});   
