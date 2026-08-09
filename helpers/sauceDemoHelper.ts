import { Page } from "@playwright/test";
import { getSauceDemoUI } from "../locators/sauceDemo.locators";

export const loginSauceDemoUser = async (
  page: Page,
  username: string,
  password: string,
) => {
  const ui = getSauceDemoUI(page);
  await ui.loginUI.usernameInput.fill(username);
  await ui.loginUI.passwordInput.fill(password);
  await ui.loginUI.loginBtn.click();
  await page.waitForURL("**/inventory.html");
};

export const addProductToCart = async (page: Page, productName: string) => {
  const ui = getSauceDemoUI(page);
  await ui.productUI.addToCartBtn(productName).click();
};

export const logoutUser = async (page: Page) => {
  const ui = getSauceDemoUI(page);
  await ui.navigation.menuIcon.click();
  await ui.navigation.logoutLink.click();
  await page.waitForLoadState("domcontentloaded");
};
