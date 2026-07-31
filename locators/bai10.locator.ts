import { Page, Locator } from '@playwright/test';




export const Locator_page = (page: Page) => ({


go_to_URL: 'https://automationexercise.com',
button_home_page:page.getByRole('link', { name: 'Home' }),
button_product:page.locator(`a[href="/products"]`),
search_input: page.locator('#search_product'),
search_button: page.locator('#submit_search'),
button_cart:page.getByRole('link', { name: 'Cart' }),




});  

export const productByName = (page: Page, name: string): Locator =>
  page.locator(`(//div[contains(@class,'productinfo')]//p[contains(text(),'${name}')])[1]`);
