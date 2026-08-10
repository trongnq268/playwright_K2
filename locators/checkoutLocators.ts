import { Page } from '@playwright/test';

export const getCheckoutLocators = (page: Page) => ({
  // Cart Page - Checkout trigger
  proceedToCheckoutBtn: page.locator('a.btn.btn-default.check_out'),

  // Checkout Modal (when not logged in)
  checkoutModal: page.locator('#checkoutModal'),
  registerLoginModalBtn: page.locator('#checkoutModal a[href="/login"]'),

  // Checkout Page (/checkout)
  addressDelivery: page.locator('#address_delivery'),
  addressInvoice: page.locator('#address_invoice'),
  reviewOrderSection: page.locator('#cart_info'),
  commentTextArea: page.locator('textarea[name="message"]'),
  placeOrderBtn: page.locator('a[href="/payment"]'),
});
