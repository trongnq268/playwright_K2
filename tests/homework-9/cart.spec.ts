import { test, expect } from "@playwright/test";
import {
  baseNavigation,
  fillPreSignup,
  registerUser,
} from "../../helpers/authHelper";
import { getUI } from "../../locators/auth.locators";
import { getProductUI } from "../../locators/product.locators";
import { getCheckoutUI } from "../../locators/checkout.locators";
import {
  addFirstNProductsToCart,
  addProductToCartWithQuantity,
  countCartItems,
  deleteItemfromCart,
  getCartItemDetails,
  getCheckoutSummary,
  getProductInfo,
  submitCreditCard,
  submitOrderCmt,
} from "../../helpers/cartHelper";
import { getCartUI } from "../../locators/cart.locators";
import { ADDRESS_DATA, REGISTER_DATA } from "../../data/userData";
import { ORDER_MSG, VALID_CREDIT_CARD} from "../../data/checkoutData";

test.describe("Cart checkout flow", () => {
  let ui: ReturnType<typeof getUI>;
  let productUI: ReturnType<typeof getProductUI>;
  let cartUI: ReturnType<typeof getCartUI>;
  let checkoutUI: ReturnType<typeof getCheckoutUI>;

  const productIndices: number[] = [0, 1];

  test.beforeEach("Open and verify homepage", async ({ page }) => {
    ui = getUI(page);
    productUI = getProductUI(page);
    cartUI = getCartUI(page);
    checkoutUI = getCheckoutUI(page);
    await page.route(
      "**/*{google-analytics,googlesyndication,doubleclick,googleadservices,adservice}***",
      (route) => route.abort(),
    );
    await baseNavigation(page);
    await expect(ui.auth.homeSlide).toBeVisible();
  });

  test("TC01: Add first 2 products to cart", async ({ page }) => {
    //click Products on menu bar
    ui.auth.productsLink.click();

    const productsToAdd = await getProductInfo(page, productIndices);

    //add first 2 products to cart
    await addFirstNProductsToCart(page, productIndices);
    const cartItemsCount = await countCartItems(page);

    //verify correct number of products added
    expect(cartItemsCount).toEqual(productIndices.length);

    //verify info of added products in cart
    const cartItems = await getCartItemDetails(page);

    /**
     * function addFristNProductsToCart adds only 1 product each run, therefore:
     * quantity = 1
     * itemUnitPrice = totalItemPrice
     */
    for (let index = 0; index < cartItemsCount; index++) {
      const currentCartItemName = cartItems[index].itemName;
      const currentCartItemUnitPrice = cartItems[index].itemUnitPrice;
      const currentCartItemQty = cartItems[index].itemQuantity;
      const currentCartItemTotalPrice = cartItems[index].itemTotalPrice;

      expect(currentCartItemName).toBe(productsToAdd[index].productName);
      expect(currentCartItemUnitPrice).toEqual(productsToAdd[index].unitPrice);
      expect(currentCartItemQty).toEqual("1");
      expect(currentCartItemTotalPrice).toEqual(productsToAdd[index].unitPrice);
    }
  });

  test("TC02: Verify product quantity in cart", async ({ page }) => {
    const productIndex: number = 0;
    const productQty: number = 4;
    await addProductToCartWithQuantity(page, productIndex, productQty);
    const actualCartItemQty = await cartUI.viewCartUI.itemQty(productIndex).innerText();
    expect(productQty).toEqual(Number(actualCartItemQty));
  });

  test("TC03: Delete produtcs from cart", async ({ page }) => {
    const productIndices: number[] = [0, 1, 2];
    const products = await getProductInfo(page, productIndices);
    const productName = products[0].productName;

    const expectedCount = productIndices.length - 1;

    await addFirstNProductsToCart(page, productIndices);
    await expect(page).toHaveURL("https://automationexercise.com/view_cart");
    await expect(cartUI.viewCartUI.checkoutBtn).toBeVisible();

    await deleteItemfromCart(page, productName);
    const cartCountAfterDeleted = await countCartItems(page);
    expect(cartCountAfterDeleted).toBe(expectedCount);
  });

  test("TC04: Place order and register while checkout", async ({ page }) => {
    addFirstNProductsToCart(page, productIndices);
    await expect(productUI.addedModalUI.productAddedModal).toBeHidden();

    // await expect(cartUI.viewCart.checkoutBtn).toBeVisible();
    await cartUI.viewCartUI.checkoutBtn.click();
    await expect(cartUI.checkoutModalUI.modal).toBeVisible();

    await cartUI.checkoutModalUI.loginLink.click();
    await fillPreSignup(page, REGISTER_DATA.name, REGISTER_DATA.email);
    await registerUser(page, REGISTER_DATA, ADDRESS_DATA);
    await ui.afterSignupUI.continueBtn.click();

    await expect(ui.auth.loggedInUserText(REGISTER_DATA.name)).toBeVisible();
    await ui.auth.cartLink.click();

    await cartUI.viewCartUI.checkoutBtn.click();
    const orderSummary = await getCheckoutSummary(page);
    console.log(orderSummary);
    //submit comment
    await submitOrderCmt(page, ORDER_MSG);
    //submit credit card 
    await submitCreditCard(page, VALID_CREDIT_CARD);
    //verify succes order message
    await expect(checkoutUI.successOrderUI.successHeading).toBeVisible(); 
    await expect(checkoutUI.successOrderUI.successMsgText).toBeVisible();
    await checkoutUI.successOrderUI.continueBtn.click();
    //delete account
    await ui.auth.deleteAccLink.click(); 
    await expect(ui.deleteAccUI.deleteHeading).toBeVisible();
    await ui.deleteAccUI.continueBtn.click()
  });

  test("TC05: Verify checkout address", async () => {});
});
