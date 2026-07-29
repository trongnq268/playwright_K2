import { Page } from '@playwright/test';
import { Data_account,quanlity } from '../type/bai9.data.ts';
const number = quanlity;



export const Locator = (page: Page) => ({
    
    verify_home_page:page.getByRole('img', { name: 'Website for automation practice' }), // icon homepage
    button_signup_login: page.getByRole('link', { name: 'Signup / Login' }),//button dang nhap/dangky
    text_box_email:page.locator('[data-qa="login-email"]'), //text box dien email
    text_box_password:page.locator('[data-qa="login-password"]'), //text box dien mat khau
    button_login:page.getByRole('button', { name: 'Login' }), // button login


    button_product:page.locator(`a[href="/products"]`), // button product
    produc_id: page.getByText('Add to cart'),

    product_info:page.locator('.product-information'),

    button_continue_shoping:page.getByText('Continue Shopping', { exact: true }), // button tiep tuc shoping
    text_view_cart:page.getByText('View Cart', { exact: true }), // xac nhan gio hang
    button_checkout:page.getByText('Proceed To Checkout', { exact: true }),



    text_box_product_quality:page.locator('[name="quantity"]'),

    button_add_to_cart: page.getByText('Add to cart', { exact: true }), //button add to cart khi chinh so luong san pham


    button_view_product:page.getByRole('link', { name: 'View Product' }),

// check box hien thi so luong san pham trong gio hang
    button_clear_gio_hang:page.locator(`//tr[.//a[text()='Blue Top']]//td[6]/a`),


    text_no_product_in_cart:page.getByText('Cart is empty!', { exact: true }),// text hien thi khi gio hang trong

    button_proceed_to_checkout:page.locator('.btn.btn-default.check_out'),
    text_login_in_pop_up:page.locator(`u:has-text("Register / Login")`),
    button_cart:page.getByRole('link', { name: 'Cart' }), // button gio hang

    text_box_comment:page.locator('[name="message"]'),
    button_place_order:page.getByRole('link', { name: 'Place Order' }),

    //card info
    text_box_name_card:page.locator('[data-qa="name-on-card"]'),
    text_box_number_card:page.locator('[data-qa="card-number"]'),
    text_box_cvc:page.locator('[data-qa="cvc"]'),
    text_box_expiration_month:page.locator('[data-qa="expiry-month"]'),
    text_box_expiration_year:page.locator('[data-qa="expiry-year"]'),
    button_pay_and_comfirm:page.locator('[data-qa="pay-button"]'),

    verify_order_confirm:page.getByText('Congratulations! Your order has been confirmed!', { exact: true }),




















  });  