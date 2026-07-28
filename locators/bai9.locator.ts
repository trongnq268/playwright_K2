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

    button_continue_shoping:page.getByText('Continue Shopping', { exact: true }), // button tiep tuc shoping
    text_view_cart:page.getByText('View Cart', { exact: true }), // xac nhan gio hang
    button_checkout:page.getByText('Proceed To Checkout', { exact: true }),



    text_box_product_quality:page.locator('[name="quantity"]'),

    button_add_to_cart: page.getByText('Add to cart', { exact: true }), //button add to cart khi chinh so luong san pham


    check_so_luong:page.getByText(`'${number}'`, { exact: true }),// check hiển thị, đoạn này em chưa hiểu

// check box hien thi so luong san pham trong gio hang
    button_clear_gio_hang:page.locator(`//tr[.//a[text()='Blue Top']]//td[6]/a`),




  });  