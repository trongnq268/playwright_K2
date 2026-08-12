import { test, expect } from '@playwright/test';    
import { Locator_page} from '../locators/bai13.locator';



test('testcase1', async ({ page }) => {

    const bookingOptions = {
          roomType: 'Single',
          startDate: '2026-09-10',
          endDate: '2026-09-12',
        };
    
    console.log(page.locator(`a[href="/reservation/1?checkin=${bookingOptions.startDate}&checkout=${bookingOptions.endDate}"]`))
   
    
    
});
