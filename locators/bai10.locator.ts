import { Page } from '@playwright/test';




export const Locator = (page: Page) => ({


go_to_URL: 'https://automationexercise.com',
button_home_page:page.getByRole('link', { name: 'Home' }),
button_cart:page.getByRole('link', { name: 'Cart' }),




});  
