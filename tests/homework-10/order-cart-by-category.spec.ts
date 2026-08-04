import { test, expect } from "@playwright/test";
import * as authHelper from "../../helpers/authHelper";
import * as downloadHelper from "../../helpers/downloadHelper";
import * as cartHelper from "../../helpers/cartHelper";
import * as searchHelper from "../../helpers/productSearchHelper";
import { formatUserInfoToCheckoutAddress } from "../../helpers/dataMappingHelper";
import { getUI } from "../../locators/auth.locators";
import { getCartUI } from "../../locators/cart.locators";
import { getCheckoutUI } from "../../locators/checkout.locators";
import { getProductUI } from "../../locators/product.locators";
import { CATEGORIES } from "../../data/categoryData";
import { ADDRESS_DATA, REGISTER_DATA } from "../../data/userData";
import * as checkoutData from "../../data/checkoutData";

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

    //block ads
    await authHelper.blockGoogleAds(page);

    //open web
    await authHelper.baseNavigation(page);

    //verify home page
    await expect(ui.navigation.homeSlide).toBeVisible();
    await ui.navigation.signupLink.click();

    //register new user and check username display after signup
    await authHelper.fillPreSignup(
      page,
      REGISTER_DATA.name,
      REGISTER_DATA.email,
    );
    await authHelper.registerUser(page, REGISTER_DATA, ADDRESS_DATA);
    await ui.afterSignupUI.continueBtn.click();
    await expect(
      ui.navigation.loggedInUserText(REGISTER_DATA.name),
    ).toBeVisible();
  });

  test.afterEach("Delete Account", async ({ page }) => {
    await authHelper.deleteAcc(page);
  });

  test("TC01: Place order: login before checkout", async ({ page }) => {
    //step 7-10
    await cartHelper.addMultiProductsToCart(page, checkoutData.PRODUCTS_LIST);
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeEnabled();
    await cartUI.viewCartUI.checkoutBtn.click();
    await expect(
      checkoutUI.deliveryAddressUI.deliveryAddressHeading,
    ).toBeVisible();

    //step 11
    const actualDeliveryAddress = await cartHelper.getCheckoutAddress(
      page,
      "deliveryAddressUI",
    );
    const actualBillingAddress = await cartHelper.getCheckoutAddress(
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
    await cartHelper.submitOrderCmt(page, checkoutData.ORDER_MSG);

    //step 13-18
    await cartHelper.submitCreditCard(page, checkoutData.VALID_CREDIT_CARD);

    //step 19
    await expect(checkoutUI.successOrderUI.successHeading).toBeVisible();
    await expect(checkoutUI.successOrderUI.successMsgText).toBeVisible();
  });

  test("TC02: Remove products from cart", async ({ page }) => {
    //step 4-5
    await cartHelper.addProductToCartWithQuantity(
      page,
      checkoutData.SINGLE_PRODUCT.productName,
      checkoutData.SINGLE_PRODUCT.productQty,
    );

    //step 6
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeEnabled();

    //step 7-8
    await cartHelper.deleteItemFromCart(
      page,
      checkoutData.SINGLE_PRODUCT.productName,
    );
    const cartCount = await cartUI.viewCartUI.cartItemRow.count();
    expect(cartCount).toEqual(0);
  });

  test("TC03: View category products", async ({ page }) => {
    //step 3
    await expect(productUI.categorySearchUI.categoryHeading).toBeVisible();

    //step 4-7
    for (const { mainCategory, subCategory } of CATEGORIES) {
      for (const sub of subCategory) {
        await searchHelper.searchByCategory(page, mainCategory, sub);
        await expect(productUI.categorySearchUI.resultTitle(sub)).toBeVisible();
      }
    }
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
    await searchHelper.addProductsFromSearchResults(page, "sleeves");
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeEnabled();
    const cartCountBefore = await cartUI.viewCartUI.cartItemRow.count();

    //step 10-12
    await ui.navigation.logoutLink.click();
    await authHelper.loginUser(page, loginDetails);
    await ui.navigation.cartLink.click();
    const cartCountAfter = await cartUI.viewCartUI.cartItemRow.count();
    expect(cartCountAfter).toEqual(cartCountBefore);
  });

  test("TC05: Download invoice after purchasing order", async ({ page }) => {
    //step 4-11
    await cartHelper.addProductToCartWithQuantity(
      page,
      checkoutData.SINGLE_PRODUCT.productName,
      checkoutData.SINGLE_PRODUCT.productQty,
    );
    await expect(cartUI.breadcrumb).toBeVisible();
    await expect(cartUI.viewCartUI.checkoutBtn).toBeEnabled();

    //step 13
    await cartUI.viewCartUI.checkoutBtn.click();

    //step 14: verify delivery and billing addresses
    const actualDeliveryAddress = await cartHelper.getCheckoutAddress(
      page,
      "deliveryAddressUI",
    );
    const actualBillingAddress = await cartHelper.getCheckoutAddress(
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
    await cartHelper.submitOrderCmt(page, checkoutData.ORDER_MSG);
    await cartHelper.submitCreditCard(page, checkoutData.VALID_CREDIT_CARD);
    await expect(checkoutUI.successOrderUI.successHeading).toBeVisible();
    await expect(checkoutUI.successOrderUI.successMsgText).toBeVisible();

    //step 23
    //download file
    const invoiceDownload = await downloadHelper.downloadFile(
      page,
      checkoutUI.successOrderUI.downloadInvoiceBtn,
    );

    //check downloaded file is correct

    await downloadHelper.verifyDownloadedFile(invoiceDownload);
    console.log(invoiceDownload.filePath);
    downloadHelper.deleteDownloadedFileAfterRun(invoiceDownload);
  });
});
