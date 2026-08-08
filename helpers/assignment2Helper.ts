import {IUserLogin} from "../types/assignment2_type";
import {getUI} from "../locators/assignment2Locator";
import {Page, expect} from "@playwright/test";


export const login = async (page: Page, user: IUserLogin) => {
    const loginUI = getUI(page).loginUI;
    // Verify các phần tử trên trang login hiển thị đúng
    await expect(loginUI.headingText).toBeVisible();
    await loginUI.usernameInput.fill(user.username);
    await loginUI.passwordInput.fill(user.password);
    await loginUI.loginBtn.click();
    // Verify sau khi login thành công, URL chuyển sang /inventory.html
    await expect(page).toHaveURL(/.*inventory.html/);
}

export const addProductsToCart = async (page: Page) => {
    const inventoryUI = getUI(page).inventoryUI;
    await inventoryUI.addBackpackToCartBtn.click();
    await inventoryUI.addBikeLightToCartBtn.click();
    await expect(inventoryUI.removeBackpackBtn).toBeVisible();
    await expect(inventoryUI.removeBikeLightBtn).toBeVisible();
}

export const goToCart = async (page: Page) => {
    const headerUI = getUI(page).headerUI;
    await headerUI.cartIcon.click();
    // Verify sau khi click icon giỏ hàng, URL chuyển sang /cart.html
    await expect(page).toHaveURL(/.*cart.html/);
} 

export const verifyCartItems = async (page: Page) => {
    const cartUI = getUI(page).cartUI;
    // Verify trong giỏ hàng có đúng 2 sản phẩm vừa chọn
    await expect(cartUI.cartItems).toHaveCount(2);
    await expect(cartUI.backpackNameInCart).toBeVisible();
    await expect(cartUI.bikeLightNameInCart).toBeVisible();
}

export const clickCheckout = async (page: Page) => {
    const cartUI = getUI(page).cartUI;
    await cartUI.checkoutBtn.click();
}

export const verifyCheckout = async (page: Page) => {
    const headerUI = getUI(page).headerUI;
    // [data-test="title"] tồn tại trên mọi trang (Products, Your Cart...), nên chỉ toBeVisible() là
    // không đủ để xác nhận đã sang đúng trang checkout — phải verify cả URL và nội dung heading thật.
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    await expect(headerUI.pageHeadingText).toHaveText("Checkout: Your Information");
}