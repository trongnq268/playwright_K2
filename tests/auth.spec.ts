import {test, expect} from '@playwright/test';
import { AuthLocators } from '../locators/authorLocators';
import {
    VALID_REGISTER_DATA,
    EXISTING_EMAIL_DATA,
    VALID_LOGIN_DATA,
    INVALID_LOGIN_DATA,
} from '../data/userdata';

test.describe('Quản lý Đăng ký và Đăng nhập',() => {

    test('Test Case 1: Đăng ký người dùng', async ({page}) => {
        //1. Mở trình duyệt & 2. Truy cập URL
        await page.goto('http://automationexercise.com');
        
    });
});