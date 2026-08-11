import { Page, Locator } from '@playwright/test';
import { guest } from '../type/bai13.data';

export const Locator_page = (page: Page) => ({
go_to_URL: 'https://automationintesting.online/',

name_text_box:page.locator('[data-testid="ContactName"]'),
email_text_box:page.locator('[data-testid="ContactEmail"]'),
phone_text_box:page.locator('[data-testid="ContactEmail"]'),
subject_text_box:page.locator('[data-testid="ContactSubject"]'),
message_text_box:page.locator('[data-testid="ContactDescription"]'),

submit_button:page.getByRole('button', { name: 'Submit' }),


verify_submit:page.getByRole('heading', { name: `Thanks for getting in touch ${guest.getFullName()}!` })

}); 