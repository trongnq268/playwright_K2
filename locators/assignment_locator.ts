import { Page } from '@playwright/test';
import {Data, Product} from '../type/asssignment_data';

export const Locator_assigment= (page: Page) => ({
    Go_to_url:'https://www.saucedemo.com',


    text_box_username:page.locator('[data-test="username"]'),
    text_box_password:page.locator('[data-test="password"]'),
    button_login:page.locator('[data-test="login-button"]'),

    logo_page:page.locator('.app_logo'),

    sauce_labs_backpack_product:page.locator(`[data-test="add-to-cart-${Product[0].product_01}"]`),
    sauce_labs_bike_bikelight:page.locator(`[data-test="add-to-cart-${Product[1].product_02}"]`),

    icon_cart:page.locator('.shopping_cart_link'),

    button_checkout:page.locator('[data-test="checkout"]'),

    button_remove_sauce_labs_backpack_product:page.locator(`[data-test="remove-${Product[0].product_01}"]`),
    button_remove_sauce_labs_bike_light:page.locator(`[data-test="remove-${Product[1].product_02}"]`),





    verify_product_sauce_labs_backpack_product: page.locator(`//div[normalize-space()= '${Product[0].name_product_01}']`),
    // page.locator(`//div[normalize-space()='Sauce Labs Backpack']`)
    verify_product_sauce_labs_bike_light: page.locator(`//div[normalize-space()= '${Product[1].name_product_02}']`),

});  