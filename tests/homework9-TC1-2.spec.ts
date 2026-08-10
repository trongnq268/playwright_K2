import { test, expect } from '@playwright/test';
import { getUI } from '../locators/productsLocators';
import {
  navigateToHomePage,
  navigateToProductsPage,
  addProductToCartByIndex,
  verifyCartRow,
  viewProductDetails,
} from '../helpers/productsHelpers';

test.describe('Test suite 1: Thêm & Xác nhận số lượng sản phẩm trong Giỏ hàng', () => {
  test.beforeEach(async ({ page }) => {
    // 1, 2 & 3. Mở trình duyệt, điều hướng đến url 'http://automationexercise.com' và xác nhận trang chủ hiển thị thành công
    await navigateToHomePage(page);
  });

  test('Test Case 1: Thêm sản phẩm vào Giỏ hàng', async ({ page }) => {
    const ui = getUI(page);

    // 4. Click nút 'Products' và xác nhận chuyển sang trang sản phẩm
    await navigateToProductsPage(page);

    // 5. Di chuột (hover) qua sản phẩm thứ nhất và click 'Add to cart'
    await addProductToCartByIndex(page, 0);

    // 6. Click nút 'Continue Shopping'
    await ui.cartModal.continueShoppingBtn.click();

    // 7. Di chuột (hover) qua sản phẩm thứ hai và click 'Add to cart'
    await addProductToCartByIndex(page, 1);

    // 8. Click nút 'View Cart' và xác nhận điều hướng đến trang Giỏ hàng
    await ui.cartModal.viewCartBtn.click();
    await expect(page).toHaveURL(/.*view_cart/);

    // 9. Xác nhận cả hai sản phẩm đã được thêm vào Giỏ hàng
    await expect(ui.cartPage.cartRows).toHaveCount(2);

    // 10. Xác nhận giá, số lượng và tổng tiền của từng sản phẩm
    await verifyCartRow(page, 0, {
      title: 'Blue Top',
      price: 'Rs. 500',
      quantity: '1',
      total: 'Rs. 500',
    });

    await verifyCartRow(page, 1, {
      title: 'Men Tshirt',
      price: 'Rs. 400',
      quantity: '1',
      total: 'Rs. 400',
    });
  });

  test('Test Case 2: Xác nhận Số lượng sản phẩm trong Giỏ hàng', async ({ page }) => {
    const ui = getUI(page);

    // 4 & 5. Click 'View Product' của một sản phẩm bất kỳ trên trang chủ và xác nhận trang chi tiết sản phẩm được mở
    await viewProductDetails(page, 2);
    await expect(ui.productDetailPage.productInformation).toBeVisible();

    // 6. Tăng số lượng lên 4
    await ui.productDetailPage.quantityInput.fill('4');

    // 7. Click nút 'Add to cart'
    await ui.productDetailPage.addToCartBtn.click();
    await expect(ui.cartModal.modal).toBeVisible();

    // 8. Click nút 'View Cart'
    await ui.cartModal.viewCartBtn.click();
    await expect(page).toHaveURL(/.*view_cart/);

    // 9. Xác nhận sản phẩm hiển thị trong trang giỏ hàng với đúng số lượng
    const firstRowDetails = ui.cartPage.getRowDetails(ui.cartPage.cartRows.first());
    await expect(firstRowDetails.quantity).toHaveText('4');
  });
});

