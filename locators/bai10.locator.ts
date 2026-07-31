import { Page } from '@playwright/test';




export const Locator = (page: Page) => ({


go_to_URL: 'https://automationexercise.com',
button_home_page:page.getByRole('link', { name: 'Home' }),
button_product:page.locator(`a[href="/products"]`),
search_input: page.locator('#search_product'),
search_button: page.locator('#submit_search'),
button_cart:page.getByRole('link', { name: 'Cart' }),

find_product_by_name: async (name: string) => {
    await page.locator('#search_product').fill(name);
    await page.locator('#submit_search').click();
    return page.locator('.productinfo', { hasText: name });
},


});  
