import { Page } from '@playwright/test';
import { getAuthLocators } from './authLocators';
import { getCheckoutLocators } from './checkoutLocators';
import { getPaymentLocators } from './paymentLocators';

export const getUI = (page: Page) => ({
  homePage: getHomePageLocators(page),
  productsPage: getProductsPageLocators(page),
  productDetailPage: getProductDetailPageLocators(page),
  cartModal: getCartModalLocators(page),
  cartPage: getCartPageLocators(page),
  authPage: getAuthLocators(page),
  checkoutPage: getCheckoutLocators(page),
  paymentPage: getPaymentLocators(page),
});

export const getHomePageLocators = (page: Page) => ({
  homeSlide: page.locator('#slider-carousel'),
  productsBtn: page.locator('.shop-menu a[href="/products"]'),
  cartBtn: page.locator('.shop-menu a[href="/view_cart"]'),
  signupLoginBtn: page.locator('.shop-menu a[href="/login"]'),
  viewProductBtn: (index: number = 0) => page.locator('a[href^="/product_details"]').nth(index),
});

export const getProductsPageLocators = (page: Page) => ({
  productCard: (index: number) => page.locator('.single-products').nth(index),
  addToCartBtn: (index: number) => page.locator('.single-products').nth(index).locator('.add-to-cart').first(),
  viewProductBtn: (index: number = 0) => page.locator('a[href^="/product_details"]').nth(index),
});

export const getProductDetailPageLocators = (page: Page) => ({
  productInformation: page.locator('.product-information'),
  quantityInput: page.locator('#quantity'),
  addToCartBtn: page.locator('button.cart'),
});

export const getCartModalLocators = (page: Page) => ({
  modal: page.locator('#cartModal'),
  continueShoppingBtn: page.getByRole('button', { name: 'Continue Shopping' }),
  viewCartBtn: page.getByRole('link', { name: 'View Cart' }),
});

export const getCartPageLocators = (page: Page) => ({
  cartTable: page.locator('#cart_info_table'),
  cartRows: page.locator('#cart_info_table tbody tr'),
  getRowDetails: (rowLocator: ReturnType<Page['locator']>) => ({
    title: rowLocator.locator('.cart_description h4'),
    price: rowLocator.locator('.cart_price p'),
    quantity: rowLocator.locator('.cart_quantity button'),
    total: rowLocator.locator('.cart_total p'),
    deleteBtn: rowLocator.locator('.cart_quantity_delete'),
  }),
  deleteBtn: (index: number = 0) => page.locator('.cart_quantity_delete').nth(index),
  emptyCartMessage: page.locator('#empty_cart'),
});