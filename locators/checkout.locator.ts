import { Page, Locator } from '@playwright/test';

export class CheckoutLocators {
  constructor(private page: Page) {}

  get deliveryAddressSection(): Locator { return this.page.locator('#address_delivery'); }
  get invoiceAddressSection(): Locator { return this.page.locator('#address_invoice'); }
  get orderReviewSection(): Locator { return this.page.locator('#cart_info'); }
  get commentTextArea(): Locator { return this.page.locator('textarea[name="message"]'); }
  get placeOrderBtn(): Locator { return this.page.locator('a[href="/payment"]'); }
}
