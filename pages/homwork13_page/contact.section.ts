import { Page, Locator, test } from '@playwright/test';
import { ContactFormModel } from './contactFormModal.page';

export class ContactSection{
    constructor (
        private page: Page,
    ){};
    get nameInput(): Locator{
        return this.page.locator('[data-testid="ContactName"]');
    };
    get emailInput(): Locator{
        return this.page.locator('[data-testid="ContactEmail"]');
    };
    get phoneInput(): Locator{
        return this.page.locator('[data-testid="ContactPhone"]');
    };
    get subjectInput(): Locator{
        return this.page.locator('[data-testid="ContactSubject"]');
    };
    get descriptionInput(): Locator{
        return this.page.locator('[data-testid="ContactDescription"]');
    };
    get submitBtn(): Locator{
        return this.page.getByRole('button', { name: 'Submit' });
    };
    get successHeader(): Locator{
        return this.page.getByRole('heading', { name: `Thanks for getting in touch`, level: 3 });
    };
    get errorAlerts(): Locator {
        return this.page.locator('.alert.alert-danger');
    }
    // ----METHOD
    async goto(): Promise<void> {
        await this.page.goto('https://automationintesting.online/');
    }
    async fillForm(data: ContactFormModel): Promise<void> {
        await this.nameInput.fill(data.getName());
        await this.emailInput.fill(data.getEmail());
        await this.phoneInput.fill(data.getPhone());
        await this.subjectInput.fill(data.getSubject());
        await this.descriptionInput.fill(data.getDescription());
    }
    async submit(): Promise<void> {
        await this.submitBtn.click();
    }
    async getSuccessMessage(): Promise<string> {
        const message = await this.successHeader.textContent();
        return (message || '');
    }
    async getErrorMessages(): Promise<string[]> {
        await this.errorAlerts.first().waitFor({ state: 'visible' });
        const messages = await this.errorAlerts.allTextContents();
        const errorMsg: string[] = [];

        for(const msg of messages) {
            errorMsg.push(msg);
        }
        return errorMsg;
    }
}