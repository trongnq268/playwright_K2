import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly headerTitle: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Lấy danh sách tên tất cả sản phẩm đang có trong giỏ hàng
   */
  async getItemNames(): Promise<string[]> {
    return this.cartItemNames.allTextContents();
  }

  /**
   * Lấy tổng số lượng item đang có trong giỏ hàng
   */
  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /**
   * Click nút 'Checkout'
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
