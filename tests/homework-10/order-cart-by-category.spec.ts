import { test, expect } from "@playwright/test";
import { getUI } from "../../locators/auth.locators";
import {
  baseNavigation,
  deleteAcc,
  fillPreSignup,
  loginUser,
  registerUser,
} from "../../helpers/authHelper";
import { ADDRESS_DATA, REGISTER_DATA } from "../../data/userData";
import {
  addMultiProductsToCart,
  addProductToCartWithQuantity,
  deleteItemFromCart,
  getCheckoutAddress,
  submitCreditCard,
  submitOrderCmt,
} from "../../helpers/cartHelper";
import {
  ORDER_MSG,
  PRODUCTS_LIST,
  SINGLE_PRODUCT,
  VALID_CREDIT_CARD,
} from "../../data/checkoutData";
import { getCartUI } from "../../locators/cart.locators";
import { getCheckoutUI } from "../../locators/checkout.locators";
import { formatUserInfoToCheckoutAddress } from "../../helpers/dataMappingHelper";
import { getProductUI } from "../../locators/product.locators";
import { MEN_CATEGORY, WOMEN_CATEGORY } from "../../data/categoryData";
import {
  addProductsFromSearchResults,
  searchByCategory,
} from "../../helpers/productSearchHelper";
import * as fs from "fs";
import * as path from "path";

test.describe("Order cart by category and save invoice file", () => {
  let ui: ReturnType<typeof getUI>;
  let cartUI: ReturnType<typeof getCartUI>;
  let checkoutUI: ReturnType<typeof getCheckoutUI>;
  let productUI: ReturnType<typeof getProductUI>;

  test.beforeEach("Initialize all UIs", async ({ page }) => {
    ui = getUI(page);
    cartUI = getCartUI(page);
    checkoutUI = getCheckoutUI(page);
    productUI = getProductUI(page);
    //open web
    await baseNavigation(page);

    //block ads
    await page.route(
      "**/*{google-analytics,googlesyndication,doubleclick,googleadservices,adservice}***",
      (route) => route.abort(),
    );

    //verify home page
    await expect(ui.navigation.homeSlide).toBeVisible();
    await ui.navigation.signupLink.click();

    //register new user and check username display after signup
    await fillPreSignup(page, REGISTER_DATA.name, REGISTER_DATA.email);
    await registerUser(page, REGISTER_DATA, ADDRESS_DATA);
    await ui.afterSignupUI.continueBtn.click();
    await expect(
      ui.navigation.loggedInUserText(REGISTER_DATA.name),
    ).toBeVisible();
  });

  test.afterEach("Delete Account", async ({ page }) => {
    await deleteAcc(page);
  });

  test("TC01: Place order: login before checkout", async ({ page }) => {
    //step 7-10
    await addMultiProductsToCart(page, PRODUCTS_LIST);
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeVisible();
    await cartUI.viewCartUI.checkoutBtn.click();
    await expect(
      checkoutUI.deliveryAddressUI.deliveryAddressHeading,
    ).toBeVisible();

    //step 11
    const actualDeliveryAddress = await getCheckoutAddress(
      page,
      "deliveryAddressUI",
    );
    const actualBillingAddress = await getCheckoutAddress(
      page,
      "billingAddressUI",
    );
    const expectedAddress = formatUserInfoToCheckoutAddress(
      REGISTER_DATA,
      ADDRESS_DATA,
    );
    expect(actualDeliveryAddress).toEqual(expectedAddress);
    expect(actualBillingAddress).toEqual(expectedAddress);

    //step 12
    await submitOrderCmt(page, ORDER_MSG);

    //step 13-18
    await submitCreditCard(page, VALID_CREDIT_CARD);

    //step 19
    await expect(checkoutUI.successOrderUI.successHeading).toBeVisible();
    await expect(checkoutUI.successOrderUI.successMsgText).toBeVisible();

    // //step 20
    // await deleteAcc(page);
  });

  test("TC02: Remove products from cart", async ({ page }) => {
    //step 4-5
    await addProductToCartWithQuantity(
      page,
      SINGLE_PRODUCT.productName,
      SINGLE_PRODUCT.productQty,
    );

    //step 6
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeEnabled();

    //step 7-8
    await deleteItemFromCart(page, SINGLE_PRODUCT.productName);
    const cartCount = await cartUI.viewCartUI.cartItemRow.count();
    expect(cartCount).toEqual(0);
  });

  test("TC03: View category products", async ({ page }) => {
    //step 3:
    await expect(productUI.categorySearchUI.categoryHeading).toBeVisible();

    //step 4-7
    await searchByCategory(
      page,
      WOMEN_CATEGORY.mainCategory,
      WOMEN_CATEGORY.subCategory[0],
    );
    await expect(
      productUI.categorySearchUI.resultTitle(WOMEN_CATEGORY.subCategory[0]),
    ).toBeVisible();

    await searchByCategory(
      page,
      MEN_CATEGORY.mainCategory,
      MEN_CATEGORY.subCategory[1],
    );
    await expect(
      productUI.categorySearchUI.resultTitle(MEN_CATEGORY.subCategory[1]),
    ).toBeVisible();
  });

  test("TC04: Search product and verify cart after login ", async ({
    page,
  }) => {
    const loginDetails = {
      email: REGISTER_DATA.email,
      password: REGISTER_DATA.password,
    };

    //step 3-4
    await ui.navigation.productsLink.click();
    await expect(productUI.productListUI.productsListHeading).toBeVisible();

    //step 5-9
    await addProductsFromSearchResults(page, "sleeves");
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeEnabled();
    const cartCountBefore = await cartUI.viewCartUI.cartItemRow.count();

    //step 10-12
    await ui.navigation.logoutLink.click();
    await loginUser(page, loginDetails);
    await ui.navigation.cartLink.click();
    const cartCountAfter = await cartUI.viewCartUI.cartItemRow.count();
    expect(cartCountAfter).toEqual(cartCountBefore);
  });

  test("TC05: Download invoice after purchasing order", async ({ page }) => {
    //step 4-11
    await addProductToCartWithQuantity(
      page,
      SINGLE_PRODUCT.productName,
      SINGLE_PRODUCT.productQty,
    );
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeEnabled();

    //step 13
    await cartUI.viewCartUI.checkoutBtn.click();

    //step 14: verify delivery and billing addresses
    const actualDeliveryAddress = await getCheckoutAddress(
      page,
      "deliveryAddressUI",
    );
    const actualBillingAddress = await getCheckoutAddress(
      page,
      "billingAddressUI",
    );
    const expectedAddress = formatUserInfoToCheckoutAddress(
      REGISTER_DATA,
      ADDRESS_DATA,
    );
    expect(actualDeliveryAddress).toEqual(expectedAddress);
    expect(actualBillingAddress).toEqual(expectedAddress);

    //step 15-22
    await submitOrderCmt(page, ORDER_MSG);
    await submitCreditCard(page, VALID_CREDIT_CARD);
    await expect(checkoutUI.successOrderUI.successHeading).toBeVisible();
    await expect(checkoutUI.successOrderUI.successMsgText).toBeVisible();

    //step 23
    // await checkoutUI.successOrderUI.downloadInvoiceBtn.click();
    // const downloadDir = path.join(process.cwd(), 'downloads'); 
  });
});
