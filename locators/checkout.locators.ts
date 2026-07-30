import { Page } from "@playwright/test";

export const getCheckoutUI = (page: Page) => ({
  deliveryAddressUI: getDeliveryAddressLocators(page),
  reviewOrderUI: getReviewOrderLocators(page),
  commentFormUI: getOrderCmtLocators(page), 
  paymentFormUI: getPaymentFormLocators(page), 
  successOrderUI: getSuccessOrderLocators(page)
});

export const getDeliveryAddressLocators = (page: Page) => {
  const adress = page.locator(
    "#address_delivery .address_address1.address_address2",
  );
  return {
    deliveryAdressHeading: page.getByText("Your delivery address"),
    fullName: page.locator(
      "#address_delivery .address_firstname.address_lastname",
    ),
    company: (index: number) => adress.nth(index),
    street: (index: number) => adress.nth(index),
    state: (index: number) => adress.nth(index),
    country: (index: number) => adress.nth(index),
    phone: (index: number) => adress.nth(index),
  };
};

export const getReviewOrderLocators = (page: Page) => {
  const allCartRow = page.locator("#cart_info .table tbody tr");
  const productRow = page.locator('#cart_info .table tbody tr[id^="product-"]');

  return {
    cartTblHeader: page.locator('#cart_info .table thead'),
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
    placeOrderBtn: page.getByRole("link", {name: 'Place Order'})
  })

  export const getPaymentFormLocators = (page: Page) => ({
    cardNameInput: page.locator('#payment-form input[name="name_on_card"]'), 
    cardNumberInput: page.locator('#payment-form input[name="card_number"]'), 
    cvvInput: page.locator('#payment-form input[name="cvc"]'), 
    expMonthInput: page.locator('#payment-form input[name="expiry_month"]'), 
    expYearInput: page.locator('#payment-form input[name="expiry_year"]'), 
    confirmBtn: page.getByRole('button', {name: 'Pay and Confirm Order'})
  })

  export const getSuccessOrderLocators = (page: Page) =>({
    successHeading: page.getByText('Order Placed!'),
    successMsgText: page.getByText('Congratulations! Your order has been confirmed!'), 
    continueBtn: page.getByRole('link', {name: "Continue"}), 
  })