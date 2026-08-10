import { Page, expect } from '@playwright/test';
import { getUI } from '../locators/productsLocators';

/**
 * Xử lý quảng cáo Google Vignette nếu URL bị chèn `#google_vignette`.
 */
export async function handleGoogleAds(page: Page, targetUrl?: string) {
  if (page.url().includes('#google_vignette')) {
    if (targetUrl) {
      await page.goto(targetUrl);
    } else {
      const cleanUrl = page.url().split('#')[0];
      await page.goto(cleanUrl);
    }
  }
}

/**
 * Thực hiện điều hướng an toàn qua Click menu hoặc Direct Navigation, kèm xử lý quảng cáo Google.
 */
export async function safeNavigate(page: Page, targetPath: string, clickAction?: () => Promise<void>) {
  if (clickAction) {
    try {
      await clickAction();
    } catch {
      await page.goto(targetPath);
    }
  } else {
    await page.goto(targetPath);
  }

  await handleGoogleAds(page, targetPath);

  const cleanPath = targetPath.replace(/^\//, '');
  if (cleanPath && !page.url().includes(cleanPath)) {
    await page.goto(targetPath);
  }
}

/**
 * Điều hướng tới trang chủ và xác nhận hiển thị thành công.
 */
export async function navigateToHomePage(page: Page) {
  const ui = getUI(page);
  await page.goto('/');
  await expect(ui.homePage.homeSlide).toBeVisible();
}

/**
 * Click menu Products và điều hướng tới trang sản phẩm.
 */
export async function navigateToProductsPage(page: Page) {
  const ui = getUI(page);
  await safeNavigate(page, '/products', async () => {
    await ui.homePage.productsBtn.click({ timeout: 5000 });
  });
  await expect(page).toHaveURL(/.*products/);
}

/**
 * Click View Product của sản phẩm theo chỉ mục và chuyển tới trang chi tiết sản phẩm.
 */
export async function viewProductDetails(page: Page, index: number = 0) {
  const ui = getUI(page);
  const viewBtn = ui.homePage.viewProductBtn(index);
  const href = await viewBtn.getAttribute('href');
  await viewBtn.click();
  if (href) {
    await handleGoogleAds(page, href);
  } else {
    await handleGoogleAds(page);
  }
  await expect(page).toHaveURL(/.*product_details/);
}

/**
 * Hover sản phẩm theo chỉ mục (0-indexed) và click Add to cart.
 */
export async function addProductToCartByIndex(page: Page, index: number) {
  const ui = getUI(page);

  const productCard = ui.productsPage.productCard(index);
  await productCard.scrollIntoViewIfNeeded();
  await productCard.hover();
  const addToCartBtn = ui.productsPage.addToCartBtn(index);
  await addToCartBtn.scrollIntoViewIfNeeded();
  await addToCartBtn.click();
  await expect(ui.cartModal.modal).toBeVisible();
}

/**
 * Click menu Cart và điều hướng tới trang Giỏ hàng.
 */
export async function navigateToCartPage(page: Page) {
  const ui = getUI(page);
  await safeNavigate(page, '/view_cart', async () => {
    await ui.homePage.cartBtn.click({ timeout: 5000 });
  });
  await expect(page).toHaveURL(/.*view_cart/);
}

/**
 * Thêm sản phẩm theo chỉ mục vào giỏ hàng và điều hướng đến trang Giỏ hàng.
 */
export async function addProductToCartAndGoToCart(page: Page, index: number = 0) {
  const ui = getUI(page);
  await navigateToProductsPage(page);
  await addProductToCartByIndex(page, index);
  await ui.cartModal.continueShoppingBtn.click();
  await navigateToCartPage(page);
}

/**
 * Xác nhận thông tin sản phẩm trong trang Giỏ hàng.
 */
export async function verifyCartRow(
  page: Page,
  rowIndex: number,
  expected: { title: string; price: string; quantity: string; total: string }
) {
  const ui = getUI(page);
  const row = ui.cartPage.cartRows.nth(rowIndex);
  const details = ui.cartPage.getRowDetails(row);

  await expect(details.title).toHaveText(expected.title);
  await expect(details.price).toHaveText(expected.price);
  await expect(details.quantity).toHaveText(expected.quantity);
  await expect(details.total).toHaveText(expected.total);
}

