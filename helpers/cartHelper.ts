import { expect, Page } from "@playwright/test";
import { getCartLocators } from "../locators/cart.locators";
import { getProductUI } from "../locators/product.locators";
import {
  CartItem,
  IProductSummary,
  IOrderSummary,
  ICreditCard,
} from "../types/checkout.interface";
import {
  getCheckoutUI,
  getOrderCmtLocators,
  getPaymentFormLocators,
} from "../locators/checkout.locators";

export interface product {
  productName: string;
  unitPrice: string;
}

export const getProductInfo = async (
  page: Page,
  productIndices: number[],
): Promise<product[]> => {
  const productUI = getProductUI(page);
  let productList: product[] = [];

  for (const index of productIndices) {
    productList[index] = {
      productName: await productUI.productList.productName(index).innerText(),
      unitPrice: await productUI.productList.productPrice(index).innerText(),
    };
  }
  return productList;
};

export const addFirstNProductsToCart = async (
  page: Page,
  productIndices: number[],
) => {
  const producUI = getProductUI(page);
  let targetBtn;
  let targetProduct;

  for (let index = 0; index < productIndices.length; index++) {
    let lastProduct = productIndices.length - 1;

    targetProduct = producUI.productList.productCard(index);
    targetBtn = producUI.productList.addCartHoverBtn(index);
    await targetProduct.hover();
    await expect(targetBtn).toBeVisible();
    await targetBtn.click();

    if (index === lastProduct) {
      await producUI.addedModal.viewCartLink.click();
    } else {
      await producUI.addedModal.continueBtn.click();
      await expect(producUI.addedModal.productAddedModal).toBeHidden();
    }
  }
};

export const addProductToCartWithQuantity = async (
  page: Page,
  productIndex: number,
  quantity: number,
) => {
  const productUI = getProductUI(page);
  await productUI.productList.viewProductLink(productIndex).click();
  await productUI.productDetail.quantityInput.fill(`${quantity}`);
  await productUI.productDetail.addCartBtn.click();
  await productUI.addedModal.viewCartLink.click();
};

export const countCartItems = async (page: Page) => {
  const cartUI = getCartLocators(page);
  await cartUI.cartTableHeader.waitFor({ state: "visible" });
  const cartCount = await cartUI.cartItemRow.count();
  return cartCount;
};

export const getCartItemDetails = async (page: Page) => {
  const cartUI = getCartLocators(page);
  const itemsCount = await countCartItems(page);
  let cartItemList: CartItem[] = [];

  for (let item = 0; item < itemsCount; item++) {
    cartItemList[item] = {
      itemName: await cartUI.itemName(item).innerText(),
      itemUnitPrice: await cartUI.itemUnitPrice(item).innerText(),
      itemQuantity: await cartUI.itemQty(item).innerText(),
      itemTotalPrice: await cartUI.totalPricePerItem(item).innerText(),
    };
  }
  return cartItemList;
};

export const deleteItemfromCart = async (page: Page, productName: string) => {
  const cartUI = getCartLocators(page);
  const rowToDelete = cartUI.cartItemRow.filter({
    has: page
      .locator(".cart_description h4")
      .getByText(productName, { exact: true }),
  });
  const deleteButton = rowToDelete.locator(".cart_quantity_delete");
  await deleteButton.click();
  await rowToDelete.waitFor({ state: "detached" });
};

export const convertPriceText = async (
  page: Page,
  productIndex: number,
): Promise<number> => {
  const productUI = getProductUI(page);
  let price: number;
  let priceText = await productUI.productList
    .productPrice(productIndex)
    .innerText();
  let priceString = priceText.replace("Rs. ", "").trim();
  return (price = Number(priceString));
};

export const getCheckoutSummary = async (
  page: Page,
): Promise<IOrderSummary> => {
  const checkoutUI = getCheckoutUI(page);
  await checkoutUI.reviewOrderUI.cartTblHeader.waitFor({ state: "visible" });
  const rowCount = await checkoutUI.reviewOrderUI.productRow.count();
  const totalAmount = await checkoutUI.reviewOrderUI.totalAmount.innerText();
  let productSummary: IProductSummary[] = [];
  let orderSummary: IOrderSummary = {
    products: productSummary,
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
    productSummary.push(productDetail);
  }
  return orderSummary;
};

export const submitOrderCmt = async (page: Page, msg: string) => {
  const orderCmtFormUI = getOrderCmtLocators(page);
  await orderCmtFormUI.msgTextbox.fill(msg);
  await orderCmtFormUI.placeOrderBtn.click();
};

export const submitCreditCard = async (page: Page, card: ICreditCard) => {
  const paymentFormUI = getPaymentFormLocators(page);
  await paymentFormUI.cardNameInput.fill(card.cardName);
  await paymentFormUI.cardNumberInput.fill(card.cardNumber);
  await paymentFormUI.cvvInput.fill(card.cvv);
  await paymentFormUI.expMonthInput.fill(card.expMonth);
  await paymentFormUI.expYearInput.fill(card.expYear);
  await paymentFormUI.confirmBtn.click();
};

