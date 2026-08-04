import { Page , expect} from '@playwright/test';
import { getProductUI, getAddToCartLocators, getCart, getProductDetailLocators} from '../locators/productOrderLocator';
import { getHomepageLocators} from '../locators/userLocator';

export const addToCart = async(page: Page) => {
    const product = getAddToCartLocators(page);
    await product.productBtn.click();
    // Đợi ảnh sản phẩm load xong để layout ổn định trước khi tương tác,
    // tránh grid bị dịch (CLS) làm click bị phần tử khác chồng lên (intercept)
    await page.waitForLoadState('networkidle');
    // Tìm và thêm sản phẩm vào cart
    await product.productHover('Blue Top').scrollIntoViewIfNeeded();
    await product.productHover('Blue Top').hover();

    await expect(product.addToCartBtn('Blue Top')).toBeVisible();
    await product.addToCartBtn('Blue Top').click();
    await expect(product.addedModal).toBeVisible();
    await product.continueShoppingBtn.click();
    // Đợi modal (và backdrop) đóng hoàn toàn, tránh click bị intercept do đang fade-out
    await expect(product.addedModal).toBeHidden();
    // Đóng modal xong vẫn còn 1 nhịp reflow (scrollbar/layout ổn định lại) không có event hook
    // để chờ — đây là exception được cho phép dùng waitForTimeout theo playwright_rules.md
    await page.waitForTimeout(300);
    await product.productHover('Men Tshirt').scrollIntoViewIfNeeded();
    await product.productHover('Men Tshirt').hover();
    await expect(product.addToCartBtn('Men Tshirt')).toBeVisible();
    await product.addToCartBtn('Men Tshirt').click();
    await expect(product.addedModal).toBeVisible();
    await product.viewCartBtn.click();
};

// Mở trang chi tiết của 1 sản phẩm bằng cách hover và click "View Product" từ trang chủ/danh sách
export const openProductDetail = async(page: Page, productName: string) => {
    const product = getAddToCartLocators(page);
    await product.productHover(productName).scrollIntoViewIfNeeded();
    await product.productHover(productName).hover();
    await product.viewProductBtn(productName).click();
    await page.waitForLoadState('networkidle');
};

// Nhập số lượng và bấm "Add to cart" trên trang chi tiết sản phẩm, sau đó vào giỏ hàng
export const addToCartFromDetail = async(page: Page, quantity: number) => {
    const detail = getProductDetailLocators(page);
    const product = getAddToCartLocators(page);
    await detail.quantityInput.fill(String(quantity));
    await detail.addToCartBtn.click();
    await expect(product.addedModal).toBeVisible();
    await product.viewCartBtn.click();
};

// Thêm 1 sản phẩm cụ thể vào giỏ hàng từ trang chủ, tự đóng modal "Added!" nếu có
export const addSingleProductToCart = async(page: Page, productName: string) => {
    const product = getAddToCartLocators(page);
    // Đợi ảnh sản phẩm load xong để layout ổn định trước khi hover/click (tránh h2 chồng lên nút)
    await page.waitForLoadState('networkidle');
    await product.productHover(productName).scrollIntoViewIfNeeded();
    await product.productHover(productName).hover();
    // .product-overlay có transition: height 0.5s khi hover — trong lúc animation đang chạy,
    // nút "Add to cart" quét ngang qua đúng vùng heading phía trên (đã đo thực tế bằng boundingBox),
    // khiến click bị "<h2> intercepts pointer events" lặp lại tới khi hết timeout. Không có event
    // hook để chờ animation này kết thúc nên dùng waitForTimeout theo đúng exception của playwright_rules.md.
    await page.waitForTimeout(800);
    await expect(product.addToCartBtn(productName)).toBeVisible();
    await product.addToCartBtn(productName).click();
    // "Nếu" modal Added! xuất hiện thì đóng lại — dùng waitFor (action) thay vì isVisible() để không bị bắt hụt do modal chưa kịp render
    const modalAppeared = await product.addedModal
        .waitFor({ state: 'visible', timeout: 5_000 })
        .then(() => true)
        .catch(() => false);
    if (modalAppeared) {
        await product.continueShoppingBtn.click();
        await expect(product.addedModal).toBeHidden();
    }
};

// Vào trang giỏ hàng bằng cách click nút "Cart" trên thanh menu
export const openCartFromMenu = async(page: Page) => {
    const nav = getHomepageLocators(page);
    await nav.cartBtn.click();
    const cart = getCart(page);
    await expect(cart.shoppingCartHeading).toBeVisible();
};

// Xoá 1 sản phẩm khỏi giỏ hàng bằng nút "X" trên đúng dòng sản phẩm đó
export const removeProductFromCart = async(page: Page, productName: string) => {
    const cart = getCart(page);
    // Nút "X" gọi AJAX GET /delete_cart/<id>, JS chỉ xoá dòng khỏi DOM sau khi có response 200
    // nên phải đợi đúng response này, tránh assertion phía sau bị timeout khi mạng/server chậm
    await Promise.all([
        page.waitForResponse(res => res.url().includes('/delete_cart/') && res.status() === 200),
        cart.deleteBtn(productName).click(),
    ]);
};

export const viewCart = async(page: Page) => {
    const cart = getProductUI(page);
    await expect(cart.productCart.shoppingCartHeading).toBeVisible();
    // Xác nhận đã thêm đúng 2 sản phẩm vào giỏ hàng
    await expect(cart.productCart.checkProductName('Blue Top')).toBeVisible();
    await expect(cart.productCart.checkProductName('Men Tshirt')).toBeVisible();
};

export const getProductPrice = async(page: Page, productName: string ): Promise<number> => {
    const item = getCart(page);
    // Xác nhận giá, số lượng và tổng tiền của sản phẩm trong giỏ hàng
    const priceText = await item.priceText(productName).textContent();
    const price = Number(priceText?.replace('Rs. ', '').trim() || 0);
    return price;
};

export const getProductQuantity = async(page: Page, productName: string ): Promise<number> => {
    const item = getCart(page);
    const quantityText = await item.quantityText(productName).textContent();
    const quantity = Number(quantityText?.trim() || 0);
    return quantity;
}

export const getProductTotal = async(page: Page, productName: string ): Promise<number> => {
    const item = getCart(page);
    const totalText = await item.totalText(productName).textContent();
    const total = Number(totalText?.replace('Rs. ', '').trim() || 0);
    return total;
}
