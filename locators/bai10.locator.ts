import { Page, Locator } from '@playwright/test';




export const Locator_page = (page: Page) => ({
go_to_URL: 'https://automationexercise.com',
button_signup_login: page.getByRole('link', { name: 'Signup / Login' }),//button dang nhap/dangky
text_box_email:page.locator('[data-qa="login-email"]'), //text box dien email
text_box_password:page.locator('[data-qa="login-password"]'), //text box dien mat khau
button_login:page.getByRole('button', { name: 'Login' }), // button login
verify_login:page.locator(`a:has-text("Logged in as")`),// xac minh dang nhap

text_view_cart:page.getByText('View Cart', { exact: true }),






button_home_page:page.getByRole('link', { name: 'Home' }),
button_product:page.locator(`a[href="/products"]`),
button_cart:page.getByRole('link', { name: 'Cart' }),
text_box_seach:page.getByRole('textbox', { name: 'Search Product' }),
icon_seach:page.locator('#submit_search'),
verify_cart:page.getByText('Shopping Cart', { exact: true }),

button_checkout:page.getByText('Proceed To Checkout', { exact: true }),
verify_checkout:page.locator('#cart_items').getByRole('heading', { name: 'Address Details' }),


text_box_comment:page.locator('[name="message"]'),
button_place_order:page.getByRole('link', { name: 'Place Order' }),


//thong tin the
text_box_name_card:page.locator('[data-qa="name-on-card"]'),
text_box_number_card:page.locator('[data-qa="card-number"]'),
text_box_cvc:page.locator('[data-qa="cvc"]'),
text_box_expiration_month:page.locator('[data-qa="expiry-month"]'),
text_box_expiration_year:page.locator('[data-qa="expiry-year"]'),
button_pay_and_comfirm:page.locator('[data-qa="pay-button"]'),

verify_order_confirm:page.getByText('Congratulations! Your order has been confirmed!', { exact: true }),

button_log_out:page.getByText('Logout', { exact: true }),













});  
// tim san pham theo ten
export const productByName = (page: Page, name: string): Locator =>
  page.locator(`(//div[contains(@class,'productinfo')]//p[contains(text(),'${name}')])[1]`);
