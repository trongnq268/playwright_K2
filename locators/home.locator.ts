import { Page, Locator } from '@playwright/test';

export class HomeLocators {
  constructor(private page: Page) {}

  get headerLogo(): Locator { return this.page.locator('header#header .logo a img'); }
  get homeBanner(): Locator { return this.page.locator('#slider-carousel'); }
  get signupLoginLink(): Locator { return this.page.locator('header#header a[href="/login"]'); }
  get cartLink(): Locator { return this.page.locator('header#header a[href="/view_cart"]'); }
  get deleteAccountLink(): Locator { return this.page.locator('a[href="/delete_account"]'); }
  get loggedInAsText(): Locator { return this.page.locator('header#header li:has-text("Logged in as")'); }
  get productsLink(): Locator { return this.page.locator('a[href="/products"]'); }
  get firstProductAddToCartBtn(): Locator { return this.page.locator('(//div[@class="product-image-wrapper"]//a[contains(@class, "add-to-cart")])[1]'); }
  get continueShoppingBtn(): Locator { return this.page.locator('button:has-text("Continue Shopping")'); }
  get viewCartModalBtn(): Locator { return this.page.locator('.modal-content a[href="/view_cart"]'); }
}
