import { Page, Locator } from '@playwright/test';

export class productPage {
    constructor (private page: Page) {};
    get allProductTitle(): Locator {
        return this.page.getByRole('heading', { name: 'All Products', level: 2 });
    }

    // Danh sách toàn bộ sản phẩm hiển thị trên trang Products (bao gồm cả nút 'View Product' nằm ở div .choose)
    get productList(): Locator {
        return this.page.locator('.features_items .col-sm-4');
    }

    // Card của 1 sản phẩm theo tên sản phẩm (vd: 'Blue Top', 'Men Tshirt')
    productCardByName(name: string): Locator {
        return this.productList.filter({ hasText: name });
    }

    // Nút 'Add to cart' chỉ hiển thị khi hover vào sản phẩm (nằm trong overlay)
    addToCartBtnByName(name: string): Locator {
        return this.productCardByName(name).locator('.product-overlay .add-to-cart');
    }

    // Modal xác nhận đã thêm vào giỏ hàng
    get cartModal(): Locator {
        return this.page.locator('#cartModal');
    }

    get continueShoppingBtn(): Locator {
        return this.cartModal.getByRole('button', { name: 'Continue Shopping' });
    }

    get viewCartLink(): Locator {
        return this.cartModal.getByRole('link', { name: 'View Cart' });
    }

    // Nút 'View Product' theo tên sản phẩm
    viewProductBtnByName(name: string): Locator {
        return this.productCardByName(name).getByRole('link', { name: 'View Product' });
    }
}