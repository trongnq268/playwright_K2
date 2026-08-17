import { Page, Locator } from '@playwright/test';

export class cartPage {
    constructor (private page: Page) {};

    // Kiểm tra text 'Shopping Cart' xác nhận đã ở trang giỏ hàng
    get cartPageHeading(): Locator {
        return this.page.locator('.breadcrumb li.active');
    }

    get cartTable(): Locator {
        return this.page.locator('#cart_info_table');
    }

    // Dòng sản phẩm trong giỏ hàng theo tên sản phẩm (vd: 'Blue Top', 'Men Tshirt')
    cartRowByName(name: string): Locator {
        return this.cartTable.locator('tbody tr').filter({ hasText: name });
    }

    productName(name: string): Locator {
        return this.cartRowByName(name).locator('.cart_description h4 a');
    }

    productPrice(name: string): Locator {
        return this.cartRowByName(name).locator('.cart_price p');
    }

    productQuantity(name: string): Locator {
        return this.cartRowByName(name).locator('.cart_quantity button');
    }

    productTotal(name: string): Locator {
        return this.cartRowByName(name).locator('.cart_total p.cart_total_price');
    }

    // Nút 'X' xóa sản phẩm khỏi giỏ hàng theo tên
    deleteBtnByName(name: string): Locator {
        return this.cartRowByName(name).locator('.cart_quantity_delete');
    }

    // Nút 'Proceed To Checkout' (không có href nên không mang role 'link')
    get proceedToCheckoutBtn(): Locator {
        return this.page.locator('a', { hasText: 'Proceed To Checkout' });
    }

    // Link 'Register / Login' trong modal hiện ra khi checkout lúc chưa đăng nhập
    get registerLoginLink(): Locator {
        return this.page.getByRole('link', { name: 'Register / Login' });
    }
}
