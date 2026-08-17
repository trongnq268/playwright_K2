import { Page, Locator } from '@playwright/test';

export class homePage {
    constructor (private page: Page) {
    }
    get homePageHeading(): Locator {
        return this.page.getByRole('img', { name: 'Website for automation practice' });
    }
    get productNavBtn(): Locator {
        return this.page.getByRole('link', { name: 'Products' });
    }

    // Nút 'Cart' trên thanh điều hướng (scope trong .shop-menu để tránh trùng với 'View Cart' trong modal)
    get cartNavBtn(): Locator {
        return this.page.locator('.shop-menu').getByRole('link', { name: 'Cart' });
    }

    // Nút 'Signup / Login' trên navbar
    get signupLoginNavBtn(): Locator {
        return this.page.getByRole('link', { name: 'Signup / Login' });
    }

    // Text 'Logged in as <username>' trên navbar sau khi đăng nhập
    loggedInAsText(username: string): Locator {
        return this.page.locator('.shop-menu').getByText(`Logged in as ${username}`);
    }

    // Nút 'Delete Account' trên navbar
    get deleteAccountNavBtn(): Locator {
        return this.page.getByRole('link', { name: 'Delete Account' });
    }
}