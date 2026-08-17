import { Page, Locator } from '@playwright/test';

export class paymentPage {
    constructor (private page: Page) {};

    get nameOnCardInput(): Locator {
        return this.page.locator('[data-qa="name-on-card"]');
    }

    get cardNumberInput(): Locator {
        return this.page.locator('[data-qa="card-number"]');
    }

    get cvcInput(): Locator {
        return this.page.locator('[data-qa="cvc"]');
    }

    get expiryMonthInput(): Locator {
        return this.page.locator('[data-qa="expiry-month"]');
    }

    get expiryYearInput(): Locator {
        return this.page.locator('[data-qa="expiry-year"]');
    }

    get payBtn(): Locator {
        return this.page.locator('[data-qa="pay-button"]');
    }

    // Trang '/payment_done' sau khi thanh toán thành công
    get orderPlacedHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Order Placed!' });
    }
}
