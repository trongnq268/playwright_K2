import { Page, Locator } from '@playwright/test';

export class productDetail {
    constructor (private page: Page) {};

    // Kiểm tra đã mở trang chi tiết sản phẩm
    get productNameHeading(): Locator {
        return this.page.locator('.product-information h2');
    }

    // Ô nhập số lượng sản phẩm
    get quantityInput(): Locator {
        return this.page.locator('#quantity');
    }

    // Click button 'Add to cart'
    get addToCartBtn(): Locator {
        return this.page.getByRole('button', { name: 'Add to cart' });
    }

    // Modal xác nhận đã thêm vào giỏ hàng
    get cartModal(): Locator {
        return this.page.locator('#cartModal');
    }

    // Click button 'Continue Shopping'
    get continueShoppingBtn(): Locator {
        return this.cartModal.getByRole('button', { name: 'Continue Shopping' });
    }

    // Click link 'View Cart'
    get viewCartLink(): Locator {
        return this.cartModal.getByRole('link', { name: 'View Cart' });
    }
}
