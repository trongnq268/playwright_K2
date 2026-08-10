import { test, expect } from '@playwright/test';
import { generateRandomUser, samplePaymentDetails, sampleOrderComment } from '../data/testData';
import { registerNewUser } from '../helpers/auth.helper';
import { navigateToHomePage } from '../helpers/navigation.helper';
import { HomeLocators } from '../locators/home.locator';
import { AuthLocators } from '../locators/auth.locator';
import { CartLocators } from '../locators/cart.locator';
import { CheckoutLocators } from '../locators/checkout.locator';
import { PaymentLocators } from '../locators/payment.locator';

test.describe('Test Case 1: Place Order: Login before Checkout', () => {
  const testUser = generateRandomUser();

  test.beforeEach(async ({ browser }) => {
    test.setTimeout(60000);
    // Pre-register user so login step in Test Case 1 can execute cleanly
    const page = await browser.newPage();
    await registerNewUser(page, testUser);
    await page.close();
  });

  test('Place Order - Login before Checkout', async ({ page }) => {
    const homeLocators = new HomeLocators(page);
    const authLocators = new AuthLocators(page);
    const cartLocators = new CartLocators(page);
    const checkoutLocators = new CheckoutLocators(page);
    const paymentLocators = new PaymentLocators(page);

    // Step 1 & 2: Launch browser and navigate to URL
    await navigateToHomePage(page);

    // Step 3: Verify home page is visible successfully (check banner)
    await expect(homeLocators.homeBanner).toBeVisible();

    // Step 4: Click 'Signup / Login' button
    await homeLocators.signupLoginLink.click();

    // Step 5: Fill email, password and click 'Login' button
    await authLocators.loginEmailInput.fill(testUser.email);
    await authLocators.loginPasswordInput.fill(testUser.password);
    await authLocators.loginBtn.click();

    // Step 6: Verify 'Logged in as username' is visible
    await expect(homeLocators.loggedInAsText).toBeVisible();
    await expect(homeLocators.loggedInAsText).toContainText(testUser.name);

    // Step 7: Add products to cart
    await homeLocators.firstProductAddToCartBtn.click();
    // Dismiss modal or click continue shopping / view cart
    await homeLocators.continueShoppingBtn.click();

    // Step 8: Click 'Cart' button
    await homeLocators.cartLink.click();

    // Step 9: Verify that cart page is displayed
    await expect(page).toHaveURL(/.*view_cart/);
    await expect(cartLocators.cartTable).toBeVisible();

    // Step 10: Click 'Proceed To Checkout'
    await cartLocators.proceedToCheckoutBtn.click();

    // Step 11: Verify Address Details and Review Your Order
    await expect(checkoutLocators.deliveryAddressSection).toBeVisible();
    await expect(checkoutLocators.orderReviewSection).toBeVisible();

    // Step 12: Enter description in comment text area and click 'Place Order'
    await checkoutLocators.commentTextArea.fill(sampleOrderComment);
    await checkoutLocators.placeOrderBtn.click();

    // Step 13: Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await paymentLocators.nameOnCardInput.fill(samplePaymentDetails.nameOnCard);
    await paymentLocators.cardNumberInput.fill(samplePaymentDetails.cardNumber);
    await paymentLocators.cvcInput.fill(samplePaymentDetails.cvc);
    await paymentLocators.expiryMonthInput.fill(samplePaymentDetails.expiryMonth);
    await paymentLocators.expiryYearInput.fill(samplePaymentDetails.expiryYear);

    // Step 14: Click 'Pay and Confirm Order' button
    await paymentLocators.payButton.click();

    // Step 15: Verify success message 'Your order has been placed successfully!'
    await expect(
      paymentLocators.successMessage.or(paymentLocators.orderPlacedHeading)
    ).toBeVisible({ timeout: 10000 });

    // Step 16: Click 'Delete Account' button
    await homeLocators.deleteAccountLink.click();

    // Step 17: Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(authLocators.accountDeletedHeader).toBeVisible();
    await authLocators.continueBtn.click();
  });
});
