import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage, CheckoutPage } from '../lib/page';
import { TEST_DATA } from '../lib/data/testData';

test.describe('Kịch bản: Mua hàng thành công (End-to-End Flow)', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    // Khởi tạo các Page Object
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('Người dùng đăng nhập, thêm 2 sản phẩm vào giỏ hàng và tiến hành Checkout thành công', async ({ page }) => {
    // Bước 1: Truy cập https://www.saucedemo.com/
    await test.step('1. Truy cập vào trang web SauceDemo', async () => {
      await loginPage.goto(TEST_DATA.baseUrl);
    });

    // Bước 2: Đăng nhập với user: "standard_user", pass: "secret_sauce"
    await test.step('2. Đăng nhập với tài khoản hợp lệ', async () => {
      await loginPage.login(
        TEST_DATA.users.standard.username,
        TEST_DATA.users.standard.password
      );
    });

    // Bước 3: Kiểm tra (Assert) sau khi login, tiêu đề trang là "Swag Labs"
    await test.step('3. Kiểm tra tiêu đề trang sau khi đăng nhập', async () => {
      // Assertion 1: Kiểm tra title của trình duyệt
      await expect(page).toHaveTitle(TEST_DATA.expectedTitles.pageTitle);
    });

    // Bước 4: Thêm sản phẩm "Sauce Labs Backpack" vào giỏ hàng
    await test.step('4. Thêm sản phẩm "Sauce Labs Backpack" vào giỏ hàng', async () => {
      await inventoryPage.addProductToCart(TEST_DATA.products.backpack);
    });

    // Bước 5: Thêm sản phẩm "Sauce Labs Bike Light" vào giỏ hàng
    await test.step('5. Thêm sản phẩm "Sauce Labs Bike Light" vào giỏ hàng', async () => {
      await inventoryPage.addProductToCart(TEST_DATA.products.bikeLight);
    });

    // Bước 6: Click vào icon giỏ hàng
    await test.step('6. Điều hướng đến trang giỏ hàng', async () => {
      await inventoryPage.clickCartIcon();
      await expect(cartPage.headerTitle).toHaveText(TEST_DATA.expectedTitles.cartHeader);
    });

    // Bước 7: Kiểm tra (Assert) trong giỏ hàng có đúng 2 sản phẩm vừa chọn (dựa vào tên)
    await test.step('7. Kiểm tra danh sách sản phẩm trong giỏ hàng', async () => {
      // Assertion 3: Kiểm tra số lượng sản phẩm trong giỏ hàng là 2
      await expect(cartPage.cartItems).toHaveCount(2);

      // Assertion 4: Kiểm tra chính xác tên 2 sản phẩm vừa thêm
      const expectedProductNames = [
        TEST_DATA.products.backpack,
        TEST_DATA.products.bikeLight,
      ];
      await expect(cartPage.cartItemNames).toHaveText(expectedProductNames);
    });

    // Bước 8: Click "Checkout"
    await test.step('8. Click Checkout và kiểm tra chuyển sang trang thông tin thanh toán', async () => {
      await cartPage.clickCheckout();

      // Assertion 5: Kiểm tra URL và tiêu đề trang Checkout
      await expect(page).toHaveURL(/.*checkout-step-one\.html/);
      await expect(checkoutPage.headerTitle).toHaveText(TEST_DATA.expectedTitles.checkoutHeader);
    });
  });
});
