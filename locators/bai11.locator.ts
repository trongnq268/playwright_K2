import { Page, Locator } from '@playwright/test';




export const Locator_page = (page: Page) => ({
go_to_URL: 'https://automationintesting.online',

button_booknow_singleroom:page.getByRole('link', { name: 'Book now' }).nth(1),// tim theo css
verify_single_room:page.getByRole('heading', { name: 'Single Room' }),
//chon thoi gian
today:page.getByRole('button', { name: 'Today' }),
next:page.getByRole('button', { name: 'Next' }),

button_select_date:page.getByTitle('Selected'),


button_resever:page.getByRole('button', { name: 'Reserve Now' }),


// ca button dien thong tin
textbox_firstname:page.getByRole('textbox', { name: 'Firstname' }),
textbox_lastname:page.getByRole('textbox', { name: 'Lastname' }),
textbox_email:page.getByRole('textbox', { name: 'Email' }),
textbox_phone:page.getByRole('textbox', { name: 'Phone' }),
button_reserve:page.getByRole('button', { name: 'Reserve Now' }),

button_return_home:page.getByRole('link', { name: 'Return home' }),

button_cancel:page.getByRole('button', { name: 'Cancel' }),


// verify khi trang overload
page_over_load:page.getByRole('heading', { name: 'This page couldn’t load', level: 1 }),





}); 

export const Verify_values = (page: Page) => ({

verify:page.locator('.alert.alert-danger'),



//firt nam co bien la 3-18
firt_name_3_18_characters:page.locator(`li:has-text("size must be between 3 and 18")`),
//email sai dinh dang
email_invalid:page.locator(`li:has-text("must be a well-formed email address")`),
// so dien thoai sai dinh dang
phone_invalid:page.locator(`li:has-text("size must be between 11 and 21")`),
});