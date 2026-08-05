import { Page } from "@playwright/test";

// Modal xuất hiện khi click "Proceed To Checkout" lúc chưa đăng nhập, yêu cầu Register/Login
export const getCheckoutModalLocators = (page: Page) => ({
  checkoutModal: page.locator('#checkoutModal'),
  registerLoginLink: page.locator('#checkoutModal .modal-content').getByRole('link', { name: 'Register / Login' }),
});

// Trang /checkout: Address Details + Review Your Order
export const getCheckoutPageLocators = (page: Page) => ({
  addressDetailsHeading: page.getByRole('heading', { name: 'Address Details', exact: true }),
  reviewOrderHeading: page.getByRole('heading', { name: 'Review Your Order', exact: true }),
  // Khoanh vùng đúng khối "Your delivery address" / "Your billing address" trước khi assert field bên trong
  deliveryAddress: page.locator('#address_delivery'),
  billingAddress: page.locator('#address_invoice'),
  commentInput: page.locator('textarea[name="message"]'),
  // Cũng là <a> không có href nên không có role "link"
  placeOrderBtn: page.getByText('Place Order', { exact: true }),
});

// Trang /payment
export const getPaymentPageLocators = (page: Page) => ({
  nameOnCardInput: page.locator('[data-qa="name-on-card"]'),
  cardNumberInput: page.locator('[data-qa="card-number"]'),
  cvcInput: page.locator('[data-qa="cvc"]'),
  expiryMonthInput: page.locator('[data-qa="expiry-month"]'),
  expiryYearInput: page.locator('[data-qa="expiry-year"]'),
  payBtn: page.locator('[data-qa="pay-button"]'),
  // "Your order has been placed successfully!" — có sẵn trong DOM của trang /payment (khoanh vùng
  // trong .payment-information theo đúng vị trí thật) nhưng bị ẩn vĩnh viễn qua CSS class "hide"
  // (display:none, đã xác nhận qua DevTools + mã nguồn main.js: không JS nào gỡ class này). Nút
  // "Pay and Confirm Order" submit form thường và điều hướng ngay sang /payment_done — nơi phần tử
  // này không còn tồn tại — nên chỉ có thể kiểm tra nó (tồn tại trong DOM, không phải hiển thị trên
  // màn hình) TRƯỚC khi click nút thanh toán.
  orderSuccessMessage: page.locator('.payment-information').locator('#success_message'),
});

// Trang /payment_done/<id> — xác nhận đặt hàng thành công
export const getOrderConfirmationLocators = (page: Page) => ({
  // Đã kiểm tra DOM thật: text thật là "Order Placed!" (CSS text-transform:uppercase hiển thị "ORDER PLACED!"),
  // KHÔNG phải "Your order has been placed successfully!" — chuỗi đó chỉ tồn tại trong 1 div ẩn (.hide)
  // ở trang /payment cũ, không bao giờ được hiển thị vì site điều hướng sang trang này sau khi thanh toán.
  orderPlacedText: page.getByText('Order Placed!', { exact: true }),
  continueBtn: page.getByRole('link', { name: 'Continue', exact: true }),
  // Nút tải hoá đơn — thực tế là <a href="/download_invoice/<id>">, click sẽ kích hoạt download thật
  // của trình duyệt (đã verify: Playwright bắt được qua page.waitForEvent('download'))
  downloadInvoiceBtn: page.getByText('Download Invoice', { exact: true }),
});
