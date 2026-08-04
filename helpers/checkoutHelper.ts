import { Page, expect } from '@playwright/test';
import { getCart } from '../locators/productOrderLocator';
import { getCheckoutModalLocators, getCheckoutPageLocators, getPaymentPageLocators } from '../locators/checkoutLocator';
import { IOrderNote, IOrderCard } from '../types/payment_type';

// Click "Proceed To Checkout" trên trang giỏ hàng
export const proceedToCheckout = async(page: Page) => {
    const cart = getCart(page);
    // "Proceed To Checkout" là <a> không có href, chỉ hoạt động nhờ JS gắn event handler.
    // Nếu click ngay sau khi vừa vào /view_cart, handler đôi lúc chưa kịp bind -> click không có
    // tác dụng, modal/trang checkout không hiện. Đợi networkidle để chắc script đã chạy xong.
    await page.waitForLoadState('networkidle');
    await cart.proceedToCheckoutBtn.click();
};

// Khi chưa đăng nhập, modal checkout luôn hiện ra yêu cầu đăng ký/đăng nhập — click "Register / Login"
export const openRegisterFromCheckoutModal = async(page: Page) => {
    const modal = getCheckoutModalLocators(page);
    await expect(modal.checkoutModal).toBeVisible();
    await modal.registerLoginLink.click();
};

// Nhập comment và click "Place Order" trên trang checkout
export const placeOrderWithComment = async(page: Page, note: IOrderNote) => {
    const checkout = getCheckoutPageLocators(page);
    await checkout.commentInput.fill(note.note);
    await checkout.placeOrderBtn.click();
};

// Nhập thông tin thanh toán và click "Pay and Confirm Order"
export const fillPaymentInformation = async(page: Page, payment: IOrderCard) => {
    const paymentUI = getPaymentPageLocators(page);
    await paymentUI.nameOnCardInput.fill(payment.nameOnCard);
    await paymentUI.cardNumberInput.fill(payment.cardNumber);
    await paymentUI.cvcInput.fill(String(payment.cvc));
    await paymentUI.expiryMonthInput.fill(String(payment.monthExp));
    await paymentUI.expiryYearInput.fill(String(payment.yearExp));
    await paymentUI.payBtn.click();
};
