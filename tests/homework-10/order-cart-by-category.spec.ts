import { test, expect } from "@playwright/test";
import { getUI } from "../../locators/auth.locators";
import {
  baseNavigation,
  deleteAcc,
  fillPreSignup,
  registerUser,
} from "../../helpers/authHelper";
import { ADDRESS_DATA, REGISTER_DATA } from "../../data/userData";
import {
  addMultiProductsToCart,
  addProductToCartWithQuantity,
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

test.describe("Order cart by category and save invoice file", () => {
  let ui: ReturnType<typeof getUI>;
  let cartUI: ReturnType<typeof getCartUI>;
  let checkoutUI: ReturnType<typeof getCheckoutUI>;

  test.beforeEach("Initialize all UIs", async ({ page }) => {
    ui = getUI(page);
    cartUI = getCartUI(page);
    checkoutUI = getCheckoutUI(page);
    await baseNavigation(page);
    await page.route(
      "**/*{google-analytics,googlesyndication,doubleclick,googleadservices,adservice}***",
      (route) => route.abort(),
    );
    await expect(ui.navigation.homeSlide).toBeVisible();
    await ui.navigation.signupLink.click();
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

  test("TC02: Remove products from cart", async ({page}) => {
    await addProductToCartWithQuantity(page, SINGLE_PRODUCT.productName, SINGLE_PRODUCT.productQty)
  });

  test("TC03: View category products", async () => {});

  test("TC04: Search product and verify cart after login ", async () => {});

  test("TC05: Download invoice after purchasing order", async () => {});
});
