import { test, expect } from '@playwright/test';
import { navigateToHomePage } from '../helpers/navigation.helper';
import { HomeLocators } from '../locators/home.locator';
import { CartLocators } from '../locators/cart.locator';

test.describe('Test Case 2: Remove Products From Cart', () => {
  test('Remove product from cart successfully', async ({ page }) => {
    const homeLocators = new HomeLocators(page);
    const cartLocators = new CartLocators(page);

    // Step 1 & 2: Launch browser and navigate to URL
    await navigateToHomePage(page);

    // Step 3: Verify home page is visible successfully
    await expect(homeLocators.homeBanner).toBeVisible();

    // Step 4: Add product to cart
    await homeLocators.firstProductAddToCartBtn.click();
    await homeLocators.continueShoppingBtn.click();

    // Step 5: Click 'Cart' button
    await homeLocators.cartLink.click();

    // Step 6: Verify cart page is displayed
    await expect(page).toHaveURL(/.*view_cart/);
    await expect(cartLocators.cartTable).toBeVisible();

    // Step 7: Click 'X' button corresponding to product
    await cartLocators.deleteProductBtn.first().click();

    // Step 8: Verify product is removed from cart
    await expect(cartLocators.emptyCartSpan).toBeVisible({ timeout: 10000 });
    await expect(cartLocators.cartItems).toHaveCount(0);
  });
});
