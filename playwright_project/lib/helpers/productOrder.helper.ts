import { productPage } from '../pages/product.page';
import { cartPage } from '../pages/cart.page';
import { productDetail } from '../pages/productDetail.page';
import { expect, Page } from '@playwright/test';
import { homePage } from '../pages/homePage.page';

// Nav đến màn product
export const navProductPage = async(page: Page) =>{
    const home = new homePage(page);
    await home.productNavBtn.click();
}

// Hover và thêm 1 sản phẩm vào giỏ hàng theo tên sản phẩm
export const addProductToCart = async(page: Page, productName: string) =>{
    const product = new productPage(page);
    await product.productCardByName(productName).hover();
    await product.addToCartBtnByName(productName).click();
}

// Click button continue shopping trong cart modal
export const clickContinueShopping = async(page: Page) =>{
    const product = new productPage(page);
    await product.continueShoppingBtn.click();
}

// Click view cart trong cart modal để sang trang giỏ hàng
export const clickViewCart = async(page: Page) =>{
    const product = new productPage(page);
    await product.viewCartLink.click();
}

// Xác nhận sản phẩm đã được thêm vào Giỏ hàng
export const verifyProductInCart = async(page: Page, productName: string) =>{
    const cart = new cartPage(page);
    await expect(cart.cartRowByName(productName)).toBeVisible();
}

// Xác nhận giá, số lượng và tổng tiền của 1 sản phẩm trong Giỏ hàng
export const verifyProductDetails = async(page: Page, productName: string, price: string, quantity: string, total: string
) =>{
    const cart = new cartPage(page);
    await expect(cart.productName(productName)).toHaveText(productName);
    await expect(cart.productPrice(productName)).toHaveText(price);
    await expect(cart.productQuantity(productName)).toHaveText(quantity);
    await expect(cart.productTotal(productName)).toHaveText(total);
}

// Click button view product
export const viewProductBtn = async(page: Page, productName: string) => {
    const product = new productPage(page);
    await product.viewProductBtnByName(productName).click();
}

// Nhập số lượng trên trang chi tiết sản phẩm
export const setProductQuantity = async(page: Page, quantity: number) => {
    const detail = new productDetail(page);
    await detail.quantityInput.fill(String(quantity));
}

// Click button 'Add to cart' trên trang chi tiết sản phẩm
export const addToCartFromDetail = async(page: Page) => {
    const detail = new productDetail(page);
    await detail.addToCartBtn.click();
}

// Click 'View Cart' trên modal của trang chi tiết sản phẩm để sang trang giỏ hàng
export const clickViewCartFromDetail = async(page: Page) => {
    const detail = new productDetail(page);
    await detail.viewCartLink.click();
}

// Click nút 'Cart' trên thanh điều hướng để sang trang giỏ hàng
export const navCartPage = async(page: Page) => {
    const home = new homePage(page);
    await home.cartNavBtn.click();
    // Đợi trang giỏ hàng load xong hẳn để các sự kiện JS (vd: nút xóa) đã được gắn
    await page.waitForLoadState('networkidle');
}

// Xóa 1 sản phẩm khỏi giỏ hàng theo tên
export const removeProductFromCart = async(page: Page, productName: string) => {
    const cart = new cartPage(page);
    await cart.deleteBtnByName(productName).click();
}
