import { test, expect } from '@playwright/test';
import { getUI } from '../locators/productsLocators';
import {
  navigateToHomePage,
  navigateToCartPage,
  addProductToCartAndGoToCart,
} from '../helpers/productsHelpers';
import {
  navigateToSignupLoginPage,
  signUpUserAndContinue,
  deleteAccount,
} from '../helpers/authHelpers';
import {
  proceedToCheckout,
  clickRegisterLoginFromCheckoutModal,
  verifyAddressDetails,
  enterCommentAndPlaceOrder,
  fillPaymentDetailsAndConfirm,
  verifyOrderSuccess,
} from '../helpers/checkoutHelpers';
import { getTestUser, defaultPaymentData, defaultOrderComment } from '../data/userData';

test.describe('Test suite 2: Xóa sản phẩm, Đặt hàng và Xác nhận địa chỉ thanh toán', () => {
  test.beforeEach(async ({ page }) => {
    // 1, 2 & 3. Mở trình duyệt, điều hướng đến url 'http://automationexercise.com' và xác nhận trang chủ hiển thị thành công
    await navigateToHomePage(page);

    // 4, 5 & 6. Thêm sản phẩm (index 18) vào giỏ hàng và chuyển sang trang Giỏ hàng
    await addProductToCartAndGoToCart(page, 18);
  });

  test('Test Case 3: Xóa sản phẩm khỏi Giỏ hàng', async ({ page }) => {
    const ui = getUI(page);

    // 7. Click nút 'X' tương ứng với một sản phẩm cụ thể
    const firstRow = ui.cartPage.cartRows.first();
    const firstRowDetails = ui.cartPage.getRowDetails(firstRow);
    await expect(firstRow).toBeVisible();

    const productTitle = await firstRowDetails.title.innerText();
    const productPrice = await firstRowDetails.price.innerText();
    console.log(`[Test Case 3] Sản phẩm đã thêm vào giỏ hàng (trước khi xóa): ${productTitle.trim()} - Giá: ${productPrice.trim()}`);

    await firstRowDetails.deleteBtn.click();

    // 8. Xác nhận sản phẩm đã bị xóa khỏi giỏ hàng
    await expect(firstRow).toBeHidden();
    await expect(ui.cartPage.cartRows).toHaveCount(0);
  });

  test('Test Case 4: Đặt hàng — Đăng ký trong lúc Thanh toán', async ({ page }) => {
    const ui = getUI(page);
    const testUser = getTestUser('TestCase4');

    // 7 & 8. Click 'Proceed To Checkout' và chuyển sang trang Register / Login
    await proceedToCheckout(page);
    await clickRegisterLoginFromCheckoutModal(page);

    // 9, 10 & 11. Điền đầy đủ thông tin ở phần Signup, tạo tài khoản và xác nhận 'Logged in as username'
    await signUpUserAndContinue(page, testUser);

    // 12 & 13. Click nút 'Cart' và click 'Proceed To Checkout'
    await navigateToCartPage(page);
    await proceedToCheckout(page);

    // 14. Xác nhận Thông tin địa chỉ (Address Details) và phần Xem lại đơn hàng (Review Your Order)
    await verifyAddressDetails(page, testUser);
    await expect(ui.checkoutPage.reviewOrderSection).toBeVisible();

    // 15. Nhập nội dung vào ô comment và click 'Place Order'
    await enterCommentAndPlaceOrder(page, defaultOrderComment);

    // 16 & 17. Nhập thông tin thanh toán (Tên trên thẻ, Số thẻ, CVC, Ngày hết hạn) và Click nút 'Pay and Confirm Order'
    await fillPaymentDetailsAndConfirm(page, defaultPaymentData);

    // 18. Xác nhận thông báo thành công 'Your order has been placed successfully!'
    await verifyOrderSuccess(page);

    // 19 & 20. Click nút 'Delete Account', xác nhận 'ACCOUNT DELETED!' và click nút 'Continue'
    await deleteAccount(page);
  });

  test('Test Case 5: Xác nhận Thông tin địa chỉ ở trang Thanh toán', async ({ page }) => {
    const testUser = getTestUser('TestCase5');

    // 4. Click nút 'Signup / Login'
    await navigateToSignupLoginPage(page);

    // 5, 6 & 7. Điền đầy đủ thông tin ở phần Signup, tạo tài khoản và xác nhận 'Logged in as username'
    await signUpUserAndContinue(page, testUser);

    // 8 & 9. Điều hướng tới trang Giỏ hàng
    await navigateToCartPage(page);

    // 10. Click 'Proceed To Checkout'
    await proceedToCheckout(page);

    // 11 & 12. Xác nhận địa chỉ giao hàng và địa chỉ thanh toán giống hệt địa chỉ đã điền lúc đăng ký
    await verifyAddressDetails(page, testUser);

    // 13 & 14. Click nút 'Delete Account', xác nhận 'ACCOUNT DELETED!' và click nút 'Continue'
    await deleteAccount(page);
  });
});

