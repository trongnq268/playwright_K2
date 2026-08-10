import { Page, Locator } from '@playwright/test';

export class ProductLocators {
  constructor(private page: Page) { }

  get allProductsHeader(): Locator { return this.page.locator('.features_items h2.title'); }
  get searchInput(): Locator { return this.page.locator('#search_product'); }
  get searchBtn(): Locator { return this.page.locator('#submit_search'); }
  get searchedProductsHeader(): Locator { return this.page.locator('.features_items h2.title'); }
  get productCards(): Locator { return this.page.locator('.features_items .col-sm-4'); }
  get productNames(): Locator { return this.page.locator('.features_items .productinfo p'); }
  get addToCartBtns(): Locator { return this.page.locator('.features_items .productinfo a.add-to-cart'); }
}
