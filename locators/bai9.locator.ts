import { Page } from '@playwright/test';




export const Locator = (page: Page) => ({
    
    verify_home_page:page.getByRole('img', { name: 'Website for automation practice' }), // icon homepage
    button_signup_login: page.getByRole('link', { name: 'Signup / Login' }),//button dang nhap/dangky
    text_box_email:page.locator('[data-qa="login-email"]'), //text box dien email
    text_box_password:page.locator('[data-qa="login-password"]'), //text box dien mat khau
    button_login:page.getByRole('button', { name: 'Login' }), // button login


    button_product:page.locator(`a[href="/products"]`), // button product
    produc_id: page.getByText('Add to cart'),

    button_continue_shoping:page.getByText('Continue Shopping', { exact: true }), // button tiep tuc shoping
    text_view_cart:page.getByText('View Cart', { exact: true }), // xac nhan gio hang
    button_checkout:page.getByText('Proceed To Checkout', { exact: true }),




    










    


  });  