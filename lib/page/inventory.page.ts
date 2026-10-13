import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  readonly headerTitle: Locator;
  readonly appLogo: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = page.locator('[data-test="title"]');
    this.appLogo = page.locator('.app_logo');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  /**
   * Lấy locator của một khối sản phẩm dựa theo tên sản phẩm
   */
  getProductItem(productName: string): Locator {
    return this.page.locator('[data-test="inventory-item"]').filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }),
    });
  }

  /**
   * Thêm sản phẩm vào giỏ hàng bằng cách click nút 'Add to cart' của sản phẩm đó
   */
  async addProductToCart(productName: string): Promise<void> {
    const productItem = this.getProductItem(productName);
    await productItem.getByRole('button', { name: 'Add to cart' }).click();
  }

  /**
   * Click vào icon giỏ hàng
   */
  async clickCartIcon(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Lấy số lượng hiển thị trên badge icon giỏ hàng
   */
  async getCartBadgeCount(): Promise<number> {
    const text = await this.shoppingCartBadge.textContent();
    return text ? parseInt(text, 10) : 0;
  }
}
