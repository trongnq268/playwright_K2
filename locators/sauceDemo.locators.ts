import { Page } from "@playwright/test";

export const getSauceDemoUI = (page: Page) => ({
  navigation: getNavigationLocators(page),
  loginUI: getLoginLocators(page),
  productUI: getProductListLocators(page),
  cartUI: getCartLocators(page),
});

export const getNavigationLocators = (page: Page) => ({
  cartLink: page.locator('[data-test="shopping-cart-link"]'),
  menuIcon: page.getByRole('button', {name: 'Open Menu'}), 
  logoutLink: page.getByRole('link', { name: 'Logout' })
});

export const getLoginLocators = (page: Page) => ({
  loginBox: page.locator('.login-box'), 
  usernameInput: page.getByPlaceholder("Username"),
  passwordInput: page.getByPlaceholder("Password"),
  loginBtn: page.getByRole("button", { name: "Login" }),
});

export const getProductListLocators = (page: Page) => ({
  pageTitle: page.getByText("Swag Labs", { exact: true }),
  productName: (name: string) =>
    page.locator('[data-test="inventory-item-name"]').getByText(name),
  addToCartBtn: (name: string) =>
    page.locator(
      `[data-test="add-to-cart-${name.toLowerCase().replace(/\s+/g, "-")}"]`,
    ),
});

export const getCartLocators = (page: Page) => ({
  cartItemName: page.locator('[data-test="inventory-item-name"]'),
});
