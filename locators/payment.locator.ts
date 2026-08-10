import { Page, Locator } from '@playwright/test';

export class PaymentLocators {
  constructor(private page: Page) {}

  get nameOnCardInput(): Locator { return this.page.locator('input[data-qa="name-on-card"]'); }
  get cardNumberInput(): Locator { return this.page.locator('input[data-qa="card-number"]'); }
  get cvcInput(): Locator { return this.page.locator('input[data-qa="cvc"]'); }
  get expiryMonthInput(): Locator { return this.page.locator('input[data-qa="expiry-month"]'); }
  get expiryYearInput(): Locator { return this.page.locator('input[data-qa="expiry-year"]'); }
  get payButton(): Locator { return this.page.locator('button[data-qa="pay-button"]'); }
  get successMessage(): Locator { return this.page.locator('p:has-text("Your order has been placed successfully!")'); }
  get orderPlacedHeading(): Locator { return this.page.locator('[data-qa="order-placed"]'); }
  get downloadInvoiceBtn(): Locator { return this.page.locator('a:has-text("Download Invoice")'); }
  get continueBtn(): Locator { return this.page.locator('a[data-qa="continue-button"]'); }
}
