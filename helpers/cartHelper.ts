import { expect, Page } from "@playwright/test";
import { getCartUI } from "../locators/cart.locators";
import { getProductUI } from "../locators/product.locators";
import { getCheckoutUI } from "../locators/checkout.locators";
import * as CheckoutTypes from "../types/checkout.interface";

import { IAddress, IUserRegister } from "../types/user.interface";

export interface product {
  productName: string;
  unitPrice: string;
}

export const addMultiProductsToCart = async (page: Page, products: CheckoutTypes.IProduct[]) => {
  const producUI = getProductUI(page);
  for(let i = 0; i < products.length; i++){
    let lastProduct = products.length - 1; 
    const targetProduct = producUI.productListUI.featureProductCard(products[i].productName); 
    const targetBtn = producUI.productListUI.addCartHoverBtn(products[i].productName); 
    await targetProduct.hover();
    await targetBtn.click();
    if (i === lastProduct){
      await producUI.addedModalUI.viewCartLink.click();
    }else{
      await producUI.addedModalUI.continueBtn.click();
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
  await productUI.productDetailUI.addCartBtn.click();
  await productUI.addedModalUI.viewCartLink.click();
};

export const countCartItems = async (page: Page) => {
  const cartUI = getCartUI(page);
  // await cartUI.viewCartUI.cartTableHeader.waitFor({ state: "visible" });
  const cartCount = await cartUI.viewCartUI.cartItemRow.count();
  return cartCount;
};

export const getCartItemDetails = async (page: Page) => {
  const cartUI = getCartUI(page);
  const cartCount = await cartUI.viewCartUI.cartItemRow.count();
  let cartItemList: CheckoutTypes.IProduct[] = [];

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

export const deleteItemfromCart = async (page: Page, productName: string) => {
  const cartUI = getCartUI(page);
  await cartUI.viewCartUI.deleteBtn(productName).click();
  await cartUI.viewCartUI.rowToDelete(productName).waitFor({ state: "detached" });
};

export const convertPriceText = (
  priceText: string,
): number => {
  let price: number;
  let priceString = priceText.replace("Rs. ", "").trim();
  return (price = Number(priceString));
};

export const getCheckoutSummary = async (
  page: Page,
): Promise<CheckoutTypes.ICartSummary> => {
  const checkoutUI = getCheckoutUI(page);
  await checkoutUI.reviewOrderUI.cartTblHeader.waitFor({ state: "visible" });
  const rowCount = await checkoutUI.reviewOrderUI.productRow.count();
  const totalAmount = await checkoutUI.reviewOrderUI.totalAmount.innerText();
  let productDetails: CheckoutTypes.IProduct[] = [];
  let orderSummary: CheckoutTypes.ICartSummary = {
    products: productDetails,
    totalAmt: totalAmount,
  };

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
  return orderSummary;
};

export const getDeliveryAddress = async (
  page: Page,
): Promise<CheckoutTypes.IDeliveryAddress> => {
  const checkoutUI = getCheckoutUI(page);
  let deliveryAddress: CheckoutTypes.IDeliveryAddress;

  deliveryAddress = {
    fullName: await checkoutUI.deliveryAddressUI.fullName.innerText(),
    company: await checkoutUI.deliveryAddressUI.company.innerText(),
    addressLine1: await checkoutUI.deliveryAddressUI.addressLine1.innerText(),
    addressLine2: await checkoutUI.deliveryAddressUI.addressLine2.innerText(),
    country: await checkoutUI.deliveryAddressUI.country.innerText(),
    phone: await checkoutUI.deliveryAddressUI.phone.innerText(),
  };

  return deliveryAddress;
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

export const formatUserInfoToCheckoutAddress = (
  userInfo: IUserRegister,
  userAddress: IAddress,
): CheckoutTypes.IDeliveryAddress => {
  let formattedDeliveryAddress: CheckoutTypes.IDeliveryAddress;

  formattedDeliveryAddress = {
    fullName: `Mr. ${userInfo.firstName} ${userInfo.lastName}`,
    company: `${userAddress.company}`,
    addressLine1: `${userAddress.address1}`,
    addressLine2: `${userAddress.city} ${userAddress.state} ${userAddress.zipcode}`,
    country: `${userAddress.country}`,
    phone: `${userInfo.phone}`,
  };

  return formattedDeliveryAddress;
};
