import { Page, expect, Download } from '@playwright/test';
import { getCart } from '../locators/productOrderLocator';
import { getCheckoutModalLocators, getCheckoutPageLocators, getPaymentPageLocators, getOrderConfirmationLocators } from '../locators/checkoutLocator';
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

// Chỉ điền các trường thanh toán, không click nút Pay — tách riêng để có thể kiểm tra DOM của trang
// /payment (vd phần tử ẩn #success_message) trước khi bấm nút khiến trang điều hướng đi nơi khác
export const fillPaymentFields = async(page: Page, payment: IOrderCard) => {
    const paymentUI = getPaymentPageLocators(page);
    await paymentUI.nameOnCardInput.fill(payment.nameOnCard);
    await paymentUI.cardNumberInput.fill(payment.cardNumber);
    await paymentUI.cvcInput.fill(String(payment.cvc));
    await paymentUI.expiryMonthInput.fill(String(payment.monthExp));
    await paymentUI.expiryYearInput.fill(String(payment.yearExp));
};

// Nhập thông tin thanh toán và click "Pay and Confirm Order"
export const fillPaymentInformation = async(page: Page, payment: IOrderCard) => {
    await fillPaymentFields(page, payment);
    await getPaymentPageLocators(page).payBtn.click();
};

// Click "Download Invoice" và trả về Download để test tự assert (giữ đúng convention: helper không
// chứa assertion). Đây là download thật qua giao diện, không phải gọi trực tiếp URL/API.
export const downloadInvoice = async(page: Page): Promise<Download> => {
    const confirmation = getOrderConfirmationLocators(page);
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        confirmation.downloadInvoiceBtn.click(),
    ]);
    return download;
};
