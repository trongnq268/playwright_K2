import { Page } from "@playwright/test";

export const getCheckoutUI = (page: Page) => ({
  deliveryAddressUI: getDeliveryAddressLocators(page),
  reviewOrderUI: getReviewOrderLocators(page),
  commentFormUI: getOrderCmtLocators(page),
  paymentFormUI: getPaymentFormLocators(page),
  successOrderUI: getSuccessOrderLocators(page),
});

export const getDeliveryAddressLocators = (page: Page) => {
  const address = page.locator("#address_delivery");
  return {
    deliveryAddressHeading: page.getByText("Your delivery address"),
    fullName: address.locator("li.address_firstname"),
    company: address.locator("li.address_address1:not(:empty)").nth(0),
    addressLine1: address.locator("li.address_address1:not(:empty)").nth(1),
    addressLine2: address.locator("li.address_city"),
    country: address.locator("li.address_country_name"),
    phone: address.locator("li.address_phone"),
  };
};

export const getReviewOrderLocators = (page: Page) => {
  const allCartRow = page.locator("#cart_info .table tbody tr");
  const productRow = page.locator('#cart_info .table tbody tr[id^="product-"]');

  return {
    cartTblHeader: page.locator("#cart_info .table thead"),
    allCartRow: allCartRow,
    productRow: productRow,
    productName: (productPosition: number) =>
      productRow.nth(productPosition).locator(".cart_description h4 a"),
    productUnitPrice: (productPosition: number) =>
      productRow.nth(productPosition).locator(".cart_price p"),
    productQty: (productPosition: number) =>
      productRow.nth(productPosition).locator(".cart_quantity button"),
    productTotalPrice: (productPosition: number) =>
      productRow.nth(productPosition).locator(".cart_total_price"),
    totalAmount: allCartRow
      .filter({ hasText: "Total Amount" })
      .locator(".cart_total_price"),
  };
};

export const getOrderCmtLocators = (page: Page) => ({
  msgTextbox: page.locator('#ordermsg textarea[name="message"]'),
  placeOrderBtn: page.getByRole("link", { name: "Place Order" }),
});

export const getPaymentFormLocators = (page: Page) => ({
  cardNameInput: page.locator('#payment-form input[name="name_on_card"]'),
  cardNumberInput: page.locator('#payment-form input[name="card_number"]'),
  cvvInput: page.locator('#payment-form input[name="cvc"]'),
  expMonthInput: page.locator('#payment-form input[name="expiry_month"]'),
  expYearInput: page.locator('#payment-form input[name="expiry_year"]'),
  confirmBtn: page.getByRole("button", { name: "Pay and Confirm Order" }),
});

export const getSuccessOrderLocators = (page: Page) => ({
  successHeading: page.getByText("Order Placed!"),
  successMsgText: page.getByText(
    "Congratulations! Your order has been confirmed!",
  ),
  continueBtn: page.getByRole("link", { name: "Continue" }),
});
