import { Page, Locator } from '@playwright/test';

export class checkoutPage {
    constructor (private page: Page) {};

    // Địa chỉ giao hàng (delivery address)
    get addressDetails(): Locator {
        return this.page.locator('#address_delivery');
    }

    // Địa chỉ thanh toán (billing address)
    get billingAddress(): Locator {
        return this.page.locator('#address_invoice');
    }

    // Phần 'Review Your Order'
    get reviewOrderTable(): Locator {
        return this.page.locator('#cart_info');
    }

    get commentInput(): Locator {
        return this.page.locator('textarea[name="message"]');
    }

    get placeOrderBtn(): Locator {
        return this.page.locator('a', { hasText: 'Place Order' });
    }
}
