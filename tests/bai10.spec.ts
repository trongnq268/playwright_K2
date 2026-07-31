import { expect, test } from '@playwright/test';
import { Locator } from '../locators/bai10.locator.ts';


test.beforeEach(async ({ page }, testInfo) => {
    
    const locator = Locator(page);
    const link = locator.go_to_URL;


    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL('https://automationexercise.com/');
    await expect(locator.button_home_page).toBeVisible();
    
}); 
test('testcase1', async ({ page }) => {
 
   

    
    
    
});