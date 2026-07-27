import { Page } from '@playwright/test';




export const Locator = (page: Page) => ({
  sign_up_button: page.getByRole('link', { name: 'Signup / Login' }),
  verify_new_user:page.getByRole('heading', { name: 'New User Signup!', level: 2 }),
  text_box_name_sign_up:page.locator('[data-qa="signup-name"]'),
  text_box_email_sign_up:page.locator('[data-qa="signup-email"]'),
  button_signup:page.locator('[data-qa="signup-button"]'),
  enter_information_text:page.getByText('Enter Account Information', { exact: true }),
  raidio_title:page.getByLabel('Mr.'),
  text_box_password:page.getByRole('textbox', { name: 'Password *' }),
  droplist_day:page.locator('#days'),
  droplist_month:page.locator('[data-qa="months"]'),
  droplist_year:page.locator('[data-qa="years"]'),
  radio_sign_up_newsletter:page.getByRole('checkbox', { name: 'Sign up for our newsletter!', checked: false }),
  radio_receive_special_offers:page.getByRole('checkbox', { name: 'Receive special offers from our partners!', checked: false }),
  textbox_first_name:page.locator('[data-qa="first_name"]'),
  textbox_last_name:page.locator('[data-qa="last_name"]'),
  textbox_address:page.locator('[data-qa="address"]'),
  droplist_contry:page.locator('[data-qa="country"]'),
  textbox_state:page.getByRole('textbox', { name: 'State *' }),
  textbox_city:page.getByRole('textbox', { name: 'City *' }),
  textbox_zipcode:page.locator('[data-qa="zipcode"]'),
  textbox_mobile_number:page.getByRole('textbox', { name: 'Mobile Number *' }),
  button_create_account:page.getByRole('button', { name: 'Create Account' }),
  verify_account_created:page.getByText('Account Created!', { exact: true }),
  button_continue:page.getByRole('link', { name: 'Continue' }),
  verify_button_logout:page.getByRole('link', { name: 'Logout' }),
  button_delete_account:page.getByRole('link', { name: 'Delete Account' }),
  verify_account_deleted:page.getByText('Account Deleted!', { exact: true }),
  button_continue_delete_account:page.getByRole('link', { name: 'Continue' }),

  verify_Email_Address_already_exist:page.getByText('Email Address already exist!', { exact: true }),

  text_box_name_sign_in:page.locator('[data-qa="login-email"]'),
  text_box_email_sign_in:page.locator('[data-qa="login-password"]'),
  button_login:page.getByRole('button', { name: 'Login' }),

  wrong_password:page.getByText('Your email or password is incorrect!', { exact: true }),

});  