/* ASSIGNMENT 2: END-TO-END FLOW (LEVEL 1)

Mục tiêu: Viết một luồng test hoàn chỉnh có Assertions (Login -> Hành động -> Kiểm tra). Website: https://www.saucedemo.com/

Kịch bản: Mua hàng thành công
1. Truy cập https://www.saucedemo.com/
2. Đăng nhập với user: "standard_user", pass: "secret_sauce".
3. Kiểm tra (Assert) sau khi login, tiêu đề trang là "Swag Labs".
4. Thêm sản phẩm "Sauce Labs Backpack" vào giỏ hàng (Click nút Add to cart).
5. Thêm sản phẩm "Sauce Labs Bike Light" vào giỏ hàng.
6. Click vào icon giỏ hàng.
7. Kiểm tra (Assert) trong giỏ hàng có đúng 2 sản phẩm vừa chọn hay không (Dựa vào tên sản phẩm).
8. Click "Checkout".

Yêu cầu kỹ thuật:
- Sử dụng `test.describe` để gom nhóm test.
- Sử dụng `expect` để verify kết quả ít nhất 3 lần.
- Code sạch, đặt tên biến rõ ràng.
*/

import { test, expect } from "@playwright/test";
import { login, addProductsToCart, verifyCartItems, goToCart, clickCheckout, verifyCheckout} from "../../helpers/assignment2Helper";
import { userLoginData} from "../../data/assignment2_data";

test.describe("Assignment 2: End-to-End Flow (Level 1)", () => {
  test("Mua hàng thành công", async ({ page }) => {
    // 1. Truy cập https://www.saucedemo.com/
    await page.goto("https://www.saucedemo.com/");
    
    // 2. Đăng nhập với user: "standard_user", pass: "secret_sauce".
    await login(page, userLoginData);

    // 3. Kiểm tra (Assert) sau khi login, tiêu đề trang là "Swag Labs".
    await expect(page).toHaveTitle("Swag Labs");
    
    // 4. Thêm sản phẩm "Sauce Labs Backpack" vào giỏ hàng (Click nút Add to cart).
    // 5. Thêm sản phẩm "Sauce Labs Bike Light" vào giỏ hàng.
    await addProductsToCart(page);

    // 6. Click vào icon giỏ hàng.
    await goToCart(page);
    
    // 7. Kiểm tra (Assert) trong giỏ hàng có đúng 2 sản phẩm vừa chọn hay không (Dựa vào tên sản phẩm).
    await verifyCartItems(page);

    // 8. Click "Checkout".
    await clickCheckout(page);
    await verifyCheckout(page);
  });
});