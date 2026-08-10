import { test, expect } from '@playwright/test';
import { generateRandomUser } from '../data/testData';
import { registerNewUser } from '../helpers/auth.helper';
import { navigateToHomePage } from '../helpers/navigation.helper';
import { HomeLocators } from '../locators/home.locator';
import { AuthLocators } from '../locators/auth.locator';
import { CartLocators } from '../locators/cart.locator';
import { ProductLocators } from '../locators/product.locator';

test.describe('Test Case 4: Search Products and Verify Cart After Login', () => {
  const testUser = generateRandomUser();

  test.beforeEach(async ({ browser }) => {
    test.setTimeout(60000);
    // Pre-register user so login step can execute cleanly
    const page = await browser.newPage();
    await registerNewUser(page, testUser);
    await page.close();
  });

  test('Search Products and Verify Cart After Login', async ({ page }) => {
    const homeLocators = new HomeLocators(page);
    const authLocators = new AuthLocators(page);
    const cartLocators = new CartLocators(page);
    const productLocators = new ProductLocators(page);

    const searchKeyword = 'dress';

    // Step 1 & 2: Launch browser and navigate to URL
    await navigateToHomePage(page);

    // Step 3: Click 'Products' button
    await homeLocators.productsLink.click();

    // Step 4: Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page).toHaveURL(/.*products/);
    await expect(productLocators.allProductsHeader).toBeVisible();

    // Step 5: Enter product name in search input and click search button
    await productLocators.searchInput.fill(searchKeyword);
    await productLocators.searchBtn.click();

    // Step 6: Verify 'SEARCHED PRODUCTS' is visible
    await expect(productLocators.searchedProductsHeader).toBeVisible();
    await expect(productLocators.searchedProductsHeader).toHaveText(/SEARCHED PRODUCTS/i);

    // Step 7: Verify all the products related to search are visible
    const productCount = await productLocators.productCards.count();
    expect(productCount).toBeGreaterThan(0);
    for (let i = 0; i < productCount; i++) {
      await expect(productLocators.productCards.nth(i)).toBeVisible();
    }

    // Step 8: Add those products to cart
    const addToCartBtns = productLocators.addToCartBtns;
    const btnCount = await addToCartBtns.count();
    expect(btnCount).toBeGreaterThan(0);

    for (let i = 0; i < btnCount; i++) {
      await addToCartBtns.nth(i).click({ force: true });
      await expect(homeLocators.continueShoppingBtn).toBeVisible();
      await homeLocators.continueShoppingBtn.click();
    }

    // Step 9: Click 'Cart' button and verify that products appear in cart
    await homeLocators.cartLink.click();
    await expect(page).toHaveURL(/.*view_cart/);
    await expect(cartLocators.cartTable).toBeVisible();
    const cartItemsCountBeforeLogin = await cartLocators.cartItems.count();
    expect(cartItemsCountBeforeLogin).toBeGreaterThan(0);

    // Step 10: Click 'Signup / Login' button and submit login details
    await homeLocators.signupLoginLink.click();
    await authLocators.loginEmailInput.fill(testUser.email);
    await authLocators.loginPasswordInput.fill(testUser.password);
    await authLocators.loginBtn.click();

    // Verify logged in as username
    await expect(homeLocators.loggedInAsText).toBeVisible();
    await expect(homeLocators.loggedInAsText).toContainText(testUser.name);

    // Step 11: Again, go to Cart page
    await homeLocators.cartLink.click();
    await expect(page).toHaveURL(/.*view_cart/);

    // Step 12: Verify that those products are visible in cart after login
    await expect(cartLocators.cartTable).toBeVisible();
    const cartItemsCountAfterLogin = await cartLocators.cartItems.count();
    expect(cartItemsCountAfterLogin).toBe(cartItemsCountBeforeLogin);
  });
});
