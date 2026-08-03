import { expect, Page } from "@playwright/test";
import { getCartUI } from "../locators/cart.locators";
import { getProductUI } from "../locators/product.locators";
import { getCheckoutUI } from "../locators/checkout.locators";
import * as CheckoutTypes from "../types/checkout.interface";

export const addMultiProductsToCart = async (
  page: Page,
  products: CheckoutTypes.IProduct[],
) => {
  const productUI = getProductUI(page);
  const lastProduct = products.length - 1;

  for (let i = 0; i < products.length; i++) {
    const targetProduct = productUI.productListUI.featureProductCard(
      products[i].productName,
    );
    const targetBtn = productUI.productListUI.addCartHoverBtn(
      products[i].productName,
    );
    await targetProduct.hover();
    await targetBtn.click();
    if (i === lastProduct) {
      await productUI.addedModalUI.viewCartLink.click();
    } else {
      await productUI.addedModalUI.continueBtn.click();
    }
  }
};

export const addProductToCartWithQuantity = async (
  page: Page,
  productName: string,
  quantity: number,
) => {
  const productUI = getProductUI(page);
  await productUI.productListUI.viewProductLink(productName).click();
  await productUI.productDetailUI.quantityInput.fill(`${quantity}`);
  await expect(productUI.productDetailUI.addCartBtn).toBeEnabled(); 
  await productUI.productDetailUI.addCartBtn.click();
  await productUI.addedModalUI.viewCartLink.click();
};

export const getCartItemDetails = async (page: Page) => {
  const cartUI = getCartUI(page);
  const cartCount = await cartUI.viewCartUI.cartItemRow.count();
  let cartItemList: CheckoutTypes.ICartItem[] = [];

  for (let item = 0; item < cartCount; item++) {
    cartItemList[item] = {
      productName: await cartUI.viewCartUI.itemName(item).innerText(),
      productUnitPrice: await cartUI.viewCartUI.itemUnitPrice(item).innerText(),
      productQty: await cartUI.viewCartUI.itemQty(item).innerText(),
      productTotalPrice: await cartUI.viewCartUI
        .totalPricePerItem(item)
        .innerText(),
    };
  }
  return cartItemList;
};

export const deleteItemFromCart = async (page: Page, productName: string) => {
  const cartUI = getCartUI(page);
  await cartUI.viewCartUI.deleteBtn(productName).click();
  await expect(cartUI.viewCartUI.rowToDelete(productName)).toBeHidden({timeout:10000});
};

export const getCheckoutSummary = async (
  page: Page,
): Promise<CheckoutTypes.ICartSummary> => {
  const checkoutUI = getCheckoutUI(page);
  const rowCount = await checkoutUI.reviewOrderUI.productRow.count();
  const totalAmount = await checkoutUI.reviewOrderUI.totalAmount.innerText();
  let productDetails: CheckoutTypes.ICartItem[] = [];

  for (let position = 0; position < rowCount; position++) {
    const productDetail = {
      productName: await checkoutUI.reviewOrderUI
        .productName(position)
        .innerText(),
      productUnitPrice: await checkoutUI.reviewOrderUI
        .productUnitPrice(position)
        .innerText(),
      productQty: await checkoutUI.reviewOrderUI
        .productQty(position)
        .innerText(),
      productTotalPrice: await checkoutUI.reviewOrderUI
        .productTotalPrice(position)
        .innerText(),
    };
    productDetails.push(productDetail);
  }
  return {
    products: productDetails,
    totalOrderAmt: totalAmount,
  };
};

export const getCheckoutAddress = async (
  page: Page,
  addressUI: CheckoutTypes.AddressUI,
): Promise<CheckoutTypes.IDeliveryAddress> => {

  const checkoutUI = getCheckoutUI(page);
  const targetUI = checkoutUI[addressUI]; 
  return {
    fullName: await targetUI.fullName.innerText(),
    company: await targetUI.company.innerText(),
    addressLine1: await targetUI.addressLine1.innerText(),
    addressLine2: await targetUI.addressLine2.innerText(),
    country: await targetUI.country.innerText(),
    phone: await targetUI.phone.innerText(),
  };
};

export const submitOrderCmt = async (page: Page, msg: string) => {
  const checkoutUI = getCheckoutUI(page);
  await checkoutUI.commentFormUI.msgTextbox.fill(msg);
  await checkoutUI.commentFormUI.placeOrderBtn.click();
};

export const submitCreditCard = async (
  page: Page,
  card: CheckoutTypes.ICreditCard,
) => {
  const checkoutUI = getCheckoutUI(page);
  await checkoutUI.paymentFormUI.cardNameInput.fill(card.cardName);
  await checkoutUI.paymentFormUI.cardNumberInput.fill(card.cardNumber);
  await checkoutUI.paymentFormUI.cvvInput.fill(card.cvv);
  await checkoutUI.paymentFormUI.expMonthInput.fill(card.expMonth);
  await checkoutUI.paymentFormUI.expYearInput.fill(card.expYear);
  await checkoutUI.paymentFormUI.confirmBtn.click();
};
