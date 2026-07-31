import { test, expect } from "@playwright/test";
import {
  baseNavigation,
  fillPreSignup,
  registerUser,
} from "../../helpers/authHelper";
import { getUI } from "../../locators/auth.locators";
import { getProductUI } from "../../locators/product.locators";
import { getCheckoutUI } from "../../locators/checkout.locators";
import { getCartUI } from "../../locators/cart.locators";
import * as cartHelper from "../../helpers/cartHelper";
import { ADDRESS_DATA, REGISTER_DATA } from "../../data/userData";
import * as checkoutData from "../../data/checkoutData";

test.describe("Cart checkout flow", () => {
  let ui: ReturnType<typeof getUI>;
  let cartUI: ReturnType<typeof getCartUI>;
  let checkoutUI: ReturnType<typeof getCheckoutUI>;

  const registerDetails = {
    userInfo: REGISTER_DATA,
    userAddress: ADDRESS_DATA,
  };

  test.beforeEach("Open and verify homepage", async ({ page }) => {
    ui = getUI(page);
    cartUI = getCartUI(page);
    checkoutUI = getCheckoutUI(page);
    await page.route(
      "**/*{google-analytics,googlesyndication,doubleclick,googleadservices,adservice}***",
      (route) => route.abort(),
    );
    await baseNavigation(page);
    await expect(ui.navigation.homeSlide).toBeVisible();
  });

  test("TC01: Add first 2 products to cart", async ({ page }) => {
    //Step 4: click Products on menu bar
    await ui.navigation.productsLink.click();

    //Step 5-8: add first 2 products to cart
    await cartHelper.addMultiProductsToCart(page, checkoutData.PRODUCTS_LIST);

    //Step 9-10: verify correct products added
    const cartCount = await cartUI.viewCartUI.cartItemRow.count();
    expect(cartCount).toEqual(checkoutData.PRODUCTS_LIST.length);
    const cartItems = await cartHelper.getCartItemDetails(page);
    expect(cartItems).toEqual(checkoutData.PRODUCTS_LIST);
  });

  test("TC02: Verify product quantity in cart", async ({ page }) => {
    const productName = checkoutData.PRODUCTS_LIST[0].productName;
    const productQty = 4;

    //step 4-8: view specific product, increase quantity and add to cart
    await cartHelper.addProductToCartWithQuantity(page, productName, productQty);

    //step 9: verify product quantity in cart
    const cartItemQty = await cartUI.viewCartUI.itemQty(0).innerText();
    expect(cartItemQty).toEqual(`${productQty}`);
  });

  test("TC03: Delete produtcs from cart", async ({ page }) => {
    const productName = checkoutData.PRODUCTS_LIST[0].productName;
  
    //step 4-5: add products to cart
    await cartHelper.addMultiProductsToCart(page, checkoutData.PRODUCTS_LIST);
    const cartCountBefore = checkoutData.PRODUCTS_LIST.length;
    const expectedCount = cartCountBefore - 1;

    //step 6
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeVisible();

    //step 7: delete product from cart
    await cartHelper.deleteItemfromCart(page, productName);
    const cartCountAfter = await cartUI.viewCartUI.cartItemRow.count();
    expect(cartCountAfter).toBe(expectedCount);
  });

  test("TC04: Place order and register while checkout", async ({ page }) => {
    //step 4-5: add products to cart
    cartHelper.addMultiProductsToCart(page, checkoutData.PRODUCTS_LIST);
   
    //step 6-8
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeVisible();
    await cartUI.viewCartUI.checkoutBtn.click();
    
    // await cartUI.checkoutModalUI.modal.waitFor({ state: "visible" });
    await cartUI.checkoutModalUI.loginLink.click();
    
    //step 9-12: register new user then click cart link
    await fillPreSignup(
      page,
      registerDetails.userInfo.name,
      registerDetails.userInfo.email,
    );
    await registerUser(
      page,
      registerDetails.userInfo,
      registerDetails.userAddress,
    );
    await ui.afterSignupUI.continueBtn.click();
    await expect(
      ui.navigation.loggedInUserText(REGISTER_DATA.name),
    ).toBeVisible();
    await ui.navigation.cartLink.click();
    
    //step 13
    await cartUI.viewCartUI.checkoutBtn.click();
    
    //step 14: verify order summary and delivery address
    const orderSummary = await cartHelper.getCheckoutSummary(page);
    const addressReview = await cartHelper.getDeliveryAddress(page);
    const expectedProducts = checkoutData.PRODUCTS_LIST;
    let expectedTotalAmt = checkoutData.PRODUCTS_LIST.reduce((total, product) => {
      return total + Number(cartHelper.convertPriceText(product.productTotalPrice))
    }, 0)

    const expectedDeliveryAddress = cartHelper.formatUserInfoToCheckoutAddress(
      registerDetails.userInfo,
      registerDetails.userAddress,
    );
   
    expect(orderSummary.products).toEqual(expectedProducts);
    expect(orderSummary.totalAmt).toEqual(`Rs. ${expectedTotalAmt}`);
    expect(addressReview).toEqual(expectedDeliveryAddress);

    //step 15: submit comment
    await cartHelper.submitOrderCmt(page, checkoutData.ORDER_MSG);
    
    //step 16-18: submit credit card
    await cartHelper.submitCreditCard(page, checkoutData.VALID_CREDIT_CARD);
    //verify success order message
    await expect(checkoutUI.successOrderUI.successHeading).toBeVisible();
    await expect(checkoutUI.successOrderUI.successMsgText).toBeVisible();
    await checkoutUI.successOrderUI.continueBtn.click();
    
    //step 19-20: delete account
    await ui.navigation.deleteAccLink.click();
    await expect(ui.deleteAccUI.deleteHeading).toBeVisible();
    await ui.deleteAccUI.continueBtn.click();
  });

  test("TC05: Verify checkout address", async ({ page }) => {
    //step 4: open signup link
    await ui.navigation.signupLink.click();
    
    //step 5-7: register new user
    await fillPreSignup(
      page,
      registerDetails.userInfo.name,
      registerDetails.userInfo.email,
    );
    await registerUser(
      page,
      registerDetails.userInfo,
      registerDetails.userAddress,
    );
    //verify user created and correct username on menu bar
    expect(ui.afterSignupUI.signupSuccessHeading).toBeVisible();
    await ui.afterSignupUI.continueBtn.click();
    expect(
      ui.navigation.loggedInUserText(registerDetails.userInfo.name),
    ).toBeVisible();

    //step 8-10: add products to cart and click checkout
    const qty = 5;
    await cartHelper.addProductToCartWithQuantity(
      page,
      checkoutData.PRODUCTS_LIST[0].productName,
      qty,
    );
  });
});
