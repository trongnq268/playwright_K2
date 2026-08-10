import { Page, Locator } from '@playwright/test';

export class CartLocators {
  constructor(private page: Page) {}

  get cartTable(): Locator { return this.page.locator('#cart_info_table'); }
  get cartItems(): Locator { return this.page.locator('#cart_info_table tbody tr'); }
  get proceedToCheckoutBtn(): Locator { return this.page.locator('a:has-text("Proceed To Checkout")'); }
  get registerLoginModalLink(): Locator { return this.page.locator('.modal-body a[href="/login"]'); }
  get deleteProductBtn(): Locator { return this.page.locator('.cart_quantity_delete'); }
  get emptyCartSpan(): Locator { return this.page.locator('#empty_cart'); }
  get cartItemNames(): Locator { return this.page.locator('#cart_info_table tbody tr .cart_description h4 a'); }
}
