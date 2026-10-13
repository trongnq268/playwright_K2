import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../page/login.page';
import { InventoryPage } from '../page/inventory.page';
import { CartPage } from '../page/cart.page';
import { CheckoutPage } from '../page/checkout.page';

type PagesFixture = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = baseTest.extend<PagesFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect } from '@playwright/test';
