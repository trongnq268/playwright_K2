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
});

// Trang /payment_done/<id> — xác nhận đặt hàng thành công
export const getOrderConfirmationLocators = (page: Page) => ({
  // Đã kiểm tra DOM thật: text thật là "Order Placed!" (CSS text-transform:uppercase hiển thị "ORDER PLACED!"),
  // KHÔNG phải "Your order has been placed successfully!" — chuỗi đó chỉ tồn tại trong 1 div ẩn (.hide)
  // ở trang /payment cũ, không bao giờ được hiển thị vì site điều hướng sang trang này sau khi thanh toán.
  orderPlacedText: page.getByText('Order Placed!', { exact: true }),
  continueBtn: page.getByRole('link', { name: 'Continue', exact: true }),
});
