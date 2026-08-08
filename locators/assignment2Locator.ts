import { Page } from "@playwright/test";

export const getUI = (page: Page) => ({
  loginUI: getLoginLocators(page),
  headerUI: getHeaderLocators(page),
  inventoryUI: getInventoryLocators(page),
  cartUI: getCartLocators(page),
});

// Trang đăng nhập (https://www.saucedemo.com/)
export const getLoginLocators = (page: Page) => ({
  headingText: page.getByText("Swag Labs", { exact: true }),
  usernameInput: page.locator('[data-test="username"]'),
  passwordInput: page.locator('[data-test="password"]'),
  loginBtn: page.locator('[data-test="login-button"]'),
  errorMessageText: page.locator('[data-test="error"]'),
});

// Header dùng chung cho các trang sau khi đăng nhập (inventory, cart...)
export const getHeaderLocators = (page: Page) => ({
  // Đây là tiêu đề PHỤ trong trang ("Products", "Your Cart"...), KHÔNG PHẢI tiêu đề tab trình duyệt.
  // Tiêu đề tab luôn cố định là "Swag Labs" (thẻ <title>, đã verify qua page.title()) nên phải assert
  // bằng expect(page).toHaveTitle("Swag Labs"), không dùng locator này.
  pageHeadingText: page.locator('[data-test="title"]'),
  cartIcon: page.locator('[data-test="shopping-cart-link"]'),
  cartBadge: page.locator('[data-test="shopping-cart-badge"]'),
});

// Trang danh sách sản phẩm (/inventory.html)
// Locator lấy trực tiếp theo 2 sản phẩm của kịch bản (Backpack, Bike Light) qua data-test riêng của
// từng nút — mỗi sản phẩm trên saucedemo có data-test cố định dạng "add-to-cart-<slug-tên-sản-phẩm>",
// đã verify DOM thật.
export const getInventoryLocators = (page: Page) => ({
  addBackpackToCartBtn: page.locator(
    '[data-test="add-to-cart-sauce-labs-backpack"]',
  ),
  addBikeLightToCartBtn: page.locator(
    '[data-test="add-to-cart-sauce-labs-bike-light"]',
  ),
  // Verify button "Remove" xuất hiện sau khi click "Add to cart" (cùng data-test nhưng đổi từ add->remove)
  removeBackpackBtn: page.locator('[data-test="remove-sauce-labs-backpack"]'),
  removeBikeLightBtn: page.locator(
    '[data-test="remove-sauce-labs-bike-light"]',
  ),
});

// Trang giỏ hàng (/cart.html)
export const getCartLocators = (page: Page) => ({
  // Tất cả các dòng sản phẩm trong giỏ — dùng để assert tổng số lượng (vd: toHaveCount(2))
  cartItems: page.locator('[data-test="inventory-item"]'),
  // Tên 2 sản phẩm cụ thể của kịch bản, dùng để assert đúng sản phẩm có trong giỏ
  backpackNameInCart: page.getByText("Sauce Labs Backpack", { exact: true }),
  bikeLightNameInCart: page.getByText("Sauce Labs Bike Light", { exact: true }),
  checkoutBtn: page.locator('[data-test="checkout"]'),
});
