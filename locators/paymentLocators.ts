import { Page } from '@playwright/test';

export const getPaymentLocators = (page: Page) => ({
  nameOnCardInput: page.locator('input[data-qa="name-on-card"]'),
  cardNumberInput: page.locator('input[data-qa="card-number"]'),
  cvcInput: page.locator('input[data-qa="cvc"]'),
  expiryMonthInput: page.locator('input[data-qa="expiry-month"]'),
  expiryYearInput: page.locator('input[data-qa="expiry-year"]'),
  payAndConfirmBtn: page.locator('button[data-qa="pay-button"]'),
  successMessage: page.locator('#success_message'),
  orderPlacedHeading: page.locator('h2[data-qa="order-placed"]'),
});
