import { Page, Locator } from '@playwright/test';




export const Locator_page = (page: Page) => ({


go_to_URL: 'https://automationexercise.com',
button_home_page:page.getByRole('link', { name: 'Home' }),
button_product:page.locator(`a[href="/products"]`),
button_cart:page.getByRole('link', { name: 'Cart' }),
text_box_seach:page.getByRole('textbox', { name: 'Search Product' }),
icon_seach:page.locator('#submit_search'),







});  
// tim san pham theo ten
export const productByName = (page: Page, name: string): Locator =>
  page.locator(`(//div[contains(@class,'productinfo')]//p[contains(text(),'${name}')])[1]`);
