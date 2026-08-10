import { Page, Locator, expect } from '@playwright/test';

export class CategoryLocators {
  constructor(private page: Page) {}

  get categorySidebarHeader(): Locator { return this.page.locator('.left-sidebar h2:has-text("Category")'); }
  get womenCategoryBtn(): Locator { return this.page.locator('a[href="#Women"]'); }
  get womenDressSubCategoryLink(): Locator { return this.page.locator('#Women a[href="/category_products/1"]'); }
  get womenTopsSubCategoryLink(): Locator { return this.page.locator('#Women a[href="/category_products/2"]'); }
  get menCategoryBtn(): Locator { return this.page.locator('a[href="#Men"]'); }
  get menTshirtsSubCategoryLink(): Locator { return this.page.locator('#Men a[href="/category_products/3"]'); }
  get menJeansSubCategoryLink(): Locator { return this.page.locator('#Men a[href="/category_products/4"]'); }
  get categoryTitleHeader(): Locator { return this.page.locator('.features_items .title'); }

  async openWomenCategory(): Promise<void> {
    await this.womenCategoryBtn.scrollIntoViewIfNeeded();
    await this.womenCategoryBtn.click();
    await this.page.evaluate(() => {
      const el = document.querySelector('#Women');
      if (el) {
        el.classList.add('in');
        (el as HTMLElement).style.height = 'auto';
        (el as HTMLElement).style.display = 'block';
      }
    });
    await expect(this.womenDressSubCategoryLink).toBeVisible();
  }

  async openMenCategory(): Promise<void> {
    await this.menCategoryBtn.scrollIntoViewIfNeeded();
    await this.menCategoryBtn.click();
    await this.page.evaluate(() => {
      const el = document.querySelector('#Men');
      if (el) {
        el.classList.add('in');
        (el as HTMLElement).style.height = 'auto';
        (el as HTMLElement).style.display = 'block';
      }
    });
    await expect(this.menTshirtsSubCategoryLink).toBeVisible();
  }
}
