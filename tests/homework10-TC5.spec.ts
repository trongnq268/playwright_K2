import { test, expect } from '@playwright/test';
import { generateRandomUser, samplePaymentDetails, sampleOrderComment } from '../data/testData';
import { fillSignupAndCreateAccount } from '../helpers/auth.helper';
import { navigateToHomePage } from '../helpers/navigation.helper';
import { HomeLocators } from '../locators/home.locator';
import { AuthLocators } from '../locators/auth.locator';
import { CartLocators } from '../locators/cart.locator';
import { CheckoutLocators } from '../locators/checkout.locator';
import { PaymentLocators } from '../locators/payment.locator';

test.describe('Test Case 5: Download Invoice after Purchase Order', () => {
  const testUser = generateRandomUser();

  test('Download Invoice after Purchase Order successfully', async ({ page }) => {
    test.setTimeout(60000);

    const homeLocators = new HomeLocators(page);
    const authLocators = new AuthLocators(page);
    const cartLocators = new CartLocators(page);
    const checkoutLocators = new CheckoutLocators(page);
    const paymentLocators = new PaymentLocators(page);

    // Step 1 & 2: Launch browser and navigate to URL
    await navigateToHomePage(page);

    // Step 3: Verify home page is visible successfully
    await expect(homeLocators.homeBanner).toBeVisible();

    // Step 4: Add products to cart
    await homeLocators.firstProductAddToCartBtn.click();
    await homeLocators.continueShoppingBtn.click();

    // Step 5: Click 'Cart' button
    await homeLocators.cartLink.click();

    // Step 6: Verify cart page is displayed
    await expect(page).toHaveURL(/.*view_cart/);
    await expect(cartLocators.cartTable).toBeVisible();

    // Step 7: Click 'Proceed To Checkout'
    await cartLocators.proceedToCheckoutBtn.click();

    // Step 8: Click 'Register / Login' button in modal
    await cartLocators.registerLoginModalLink.or(page.locator('a:has-text("Register / Login")')).click();

    // Step 9 & 10: Fill all details in Signup, create account, verify 'ACCOUNT CREATED!' and click 'Continue'
    await fillSignupAndCreateAccount(page, testUser);

    // Step 11: Verify 'Logged in as username' at top
    await expect(homeLocators.loggedInAsText).toBeVisible();
    await expect(homeLocators.loggedInAsText).toContainText(testUser.name);

    // Step 12: Click 'Cart' button
    await homeLocators.cartLink.click();

    // Step 13: Click 'Proceed To Checkout' button
    await cartLocators.proceedToCheckoutBtn.click();

    // Step 14: Verify Address Details and Review Your Order
    await expect(checkoutLocators.deliveryAddressSection).toBeVisible();
    await expect(checkoutLocators.orderReviewSection).toBeVisible();

    // Step 15: Enter description in comment text area and click 'Place Order'
    await checkoutLocators.commentTextArea.fill(sampleOrderComment);
    await checkoutLocators.placeOrderBtn.click();

    // Step 16: Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await paymentLocators.nameOnCardInput.fill(samplePaymentDetails.nameOnCard);
    await paymentLocators.cardNumberInput.fill(samplePaymentDetails.cardNumber);
    await paymentLocators.cvcInput.fill(samplePaymentDetails.cvc);
    await paymentLocators.expiryMonthInput.fill(samplePaymentDetails.expiryMonth);
    await paymentLocators.expiryYearInput.fill(samplePaymentDetails.expiryYear);

    // Step 17: Click 'Pay and Confirm Order' button
    await paymentLocators.payButton.click();

    // Step 18: Verify success message 'Your order has been placed successfully!'
    await expect(
      paymentLocators.successMessage.or(paymentLocators.orderPlacedHeading)
    ).toBeVisible({ timeout: 10000 });

    // Step 19: Click 'Download Invoice' button and verify invoice is downloaded successfully
    const downloadPromise = page.waitForEvent('download');
    await paymentLocators.downloadInvoiceBtn.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBeTruthy();

    // Step 20: Click 'Continue' button
    await paymentLocators.continueBtn.click();

    // Step 21: Click 'Delete Account' button
    await homeLocators.deleteAccountLink.click();

    // Step 22: Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(authLocators.accountDeletedHeader).toBeVisible();
    await authLocators.continueBtn.click();
  });
});
