import { Page } from "@playwright/test";

export const getCartUI = (page: Page) => ({
  viewCartUI: getCartLocators(page), 
  checkoutModalUI: getCheckoutModalLocators(page)
})

export const getCartLocators = (page: Page) => {
  const cartItemRow = page.locator("#cart_info_table tbody tr");
  return {
    cartTableHeader: page.locator("#cart_info_table thead"),
    cartItemRow: cartItemRow,
    itemName: (itemOrder: number) =>
      cartItemRow.nth(itemOrder).locator(".cart_description h4"),
    itemUnitPrice: (itemOrder: number) =>
      cartItemRow.nth(itemOrder).locator(".cart_price p"),
    itemQty: (itemOrder: number) =>
      cartItemRow.nth(itemOrder).locator(".cart_quantity button"),
    totalPricePerItem: (itemOrder: number) =>
      cartItemRow.nth(itemOrder).locator(".cart_total_price"),
    deleteBtn: (itemOrder: number) => cartItemRow.nth(itemOrder).locator(".cart_quantity_delete"), 
    checkoutBtn: page.locator('a.check_out').getByText('Proceed To Checkout')
  };
};

export const getCheckoutModalLocators = (page: Page) => ({
  modal: page.locator('#checkoutModal .modal-content'),
  loginLink: page.getByRole('link', { name: 'Register / Login' })
})