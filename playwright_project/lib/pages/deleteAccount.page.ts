import { Page, Locator } from '@playwright/test';

export class deleteAccountPage {
    constructor (private page: Page) {};

    get accountDeletedHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Account Deleted!' });
    }

    get continueBtn(): Locator {
        return this.page.locator('[data-qa="continue-button"]');
    }
}
