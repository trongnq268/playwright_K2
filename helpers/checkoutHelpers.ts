import { Page, expect } from '@playwright/test';
import { getUI } from '../locators/productsLocators';
import { UserSignupInfo } from '../types/user.interface';
import { PaymentInfo } from '../types/payment.interface';
import { handleGoogleAds, safeNavigate } from './productsHelpers';

/**
 * Click nút Proceed To Checkout ở trang Giỏ hàng.
 */
export async function proceedToCheckout(page: Page) {
  const ui = getUI(page);
  await ui.checkoutPage.proceedToCheckoutBtn.scrollIntoViewIfNeeded();
  await ui.checkoutPage.proceedToCheckoutBtn.click();
}

/**
 * Click nút Register / Login từ Modal checkout.
 */
export async function clickRegisterLoginFromCheckoutModal(page: Page) {
  const ui = getUI(page);
  await expect(ui.checkoutPage.checkoutModal).toBeVisible();
  await safeNavigate(page, '/login', async () => {
    await ui.checkoutPage.registerLoginModalBtn.click({ timeout: 5000 });
  });
  await expect(page).toHaveURL(/.*login/);
}

/**
 * Xác nhận thông tin địa chỉ giao hàng và địa chỉ thanh toán ở trang Checkout.
 */
export async function verifyAddressDetails(page: Page, user: UserSignupInfo) {
  const ui = getUI(page);

  // Delivery Address
  await expect(ui.checkoutPage.addressDelivery).toContainText(`${user.firstName} ${user.lastName}`);
  await expect(ui.checkoutPage.addressDelivery).toContainText(user.address1);
  await expect(ui.checkoutPage.addressDelivery).toContainText(user.city);
  await expect(ui.checkoutPage.addressDelivery).toContainText(user.state);
  await expect(ui.checkoutPage.addressDelivery).toContainText(user.zipcode);
  await expect(ui.checkoutPage.addressDelivery).toContainText(user.mobileNumber);

  // Invoice Address (Billing Address)
  await expect(ui.checkoutPage.addressInvoice).toContainText(`${user.firstName} ${user.lastName}`);
  await expect(ui.checkoutPage.addressInvoice).toContainText(user.address1);
  await expect(ui.checkoutPage.addressInvoice).toContainText(user.city);
  await expect(ui.checkoutPage.addressInvoice).toContainText(user.state);
  await expect(ui.checkoutPage.addressInvoice).toContainText(user.zipcode);
  await expect(ui.checkoutPage.addressInvoice).toContainText(user.mobileNumber);
}

/**
 * Nhập comment vào ô ghi chú và click Place Order.
 */
export async function enterCommentAndPlaceOrder(page: Page, comment: string) {
  const ui = getUI(page);
  await ui.checkoutPage.commentTextArea.scrollIntoViewIfNeeded();
  await ui.checkoutPage.commentTextArea.fill(comment);
  await ui.checkoutPage.placeOrderBtn.click();
  await handleGoogleAds(page, '/payment');
  await expect(page).toHaveURL(/.*payment/);
}

/**
 * Nhập thông tin thanh toán thẻ ngân hàng và click Pay and Confirm Order.
 */
export async function fillPaymentDetailsAndConfirm(page: Page, payment: PaymentInfo) {
  const ui = getUI(page);
  await ui.paymentPage.nameOnCardInput.fill(payment.nameOnCard);
  await ui.paymentPage.cardNumberInput.fill(payment.cardNumber);
  await ui.paymentPage.cvcInput.fill(payment.cvc);
  await ui.paymentPage.expiryMonthInput.fill(payment.expiryMonth);
  await ui.paymentPage.expiryYearInput.fill(payment.expiryYear);
  await ui.paymentPage.payAndConfirmBtn.click();
}

/**
 * Xác nhận thông báo đặt hàng thành công.
 */
export async function verifyOrderSuccess(page: Page) {
  const ui = getUI(page);
  await expect(
    page.locator('#success_message').or(ui.paymentPage.orderPlacedHeading).or(page.locator('text=Your order has been placed successfully!'))
  ).toBeVisible();
}

