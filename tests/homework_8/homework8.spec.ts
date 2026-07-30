import { test, expect} from '@playwright/test';
import { fillPreSignupForm, loginUser, registerUser} from '../../helpers/user_hepler';
import {createDynamicUserData, invalidLoginData, validLoginData} from '../../data/user_data';
import { getUI} from '../../locators/userLocator';

test.describe('Test case về đăng ký', () => {
    let ui: ReturnType<typeof getUI>;
    // Pre-condition
    test.beforeEach('Tiền điều kiện - Mở homepage', async({page}) =>{
        await page.goto('https://automationexercise.com/');
        ui = getUI(page);
        await expect(ui.navigation.homePageLogo).toBeVisible();
        await ui.navigation.signupLoginBtn.click();
    });

    test('Test case 1: Đăng ký người dùng (Register User)', async({page}) =>{
        await expect(ui.preSignupUI.signupTitleText).toBeVisible();
        // Tạo data dynamic
        const dynamicData = createDynamicUserData();
        await fillPreSignupForm(page, dynamicData.user.name, dynamicData.user.email);
        await expect(ui.signupUI.accountInforText).toBeVisible();
        await registerUser(page, dynamicData.user, dynamicData.address);
        await expect(ui.signupUI.accountCreatedText).toBeVisible();
        await ui.signupUI.continueBtn.click();
        await expect(page.locator(ui.navigation.loggedInUserText(dynamicData.user.name))).toBeVisible();
        await ui.signupUI.deleteBtn.click();
        await expect(ui.signupUI.accountDeletedText).toBeVisible();
        await ui.signupUI.continueBtn.click();
    });

    test('Test case 2: Đăng ký người dùng với Email đã tồn tại (Register User with existing email)', async({page}) =>{
        await expect(ui.preSignupUI.signupTitleText).toBeVisible();
        const dynamicData = createDynamicUserData();
        const staticData = validLoginData();
        await fillPreSignupForm(page, dynamicData.user.name, staticData.user.email);
        await expect(ui.preSignupUI.emailExistText).toBeVisible();
    });

    test('Test case 3: Đăng nhập người dùng thành công (Login User with correct email and password)', async({page}) =>{
        // Đăng ký tài khoản để test case 3 (vì case 3 bước cuối sẽ là xoá tài khoản)
        await expect(ui.preSignupUI.signupTitleText).toBeVisible();
        const dynamicData = createDynamicUserData();
        await fillPreSignupForm(page, dynamicData.user.name, dynamicData.user.email);
        await expect(ui.signupUI.accountInforText).toBeVisible();
        await registerUser(page, dynamicData.user, dynamicData.address);
        await expect(ui.signupUI.accountCreatedText).toBeVisible();
        await ui.signupUI.continueBtn.click();
        // Sau khi đăng ký, hệ thống tự động đăng nhập -> logout để test lại login
        await expect(page.locator(ui.navigation.loggedInUserText(dynamicData.user.name))).toBeVisible();
        await ui.navigation.logoutBtn.click();

        // Thực hiện test case 3 
        await expect(ui.loginUI.loginTitleText).toBeVisible();
        await loginUser(page, {email: dynamicData.user.email, password: dynamicData.user.password});
        await expect(page.locator(ui.navigation.loggedInUserText(dynamicData.user.name))).toBeVisible();
        await ui.signupUI.deleteBtn.click();
        await expect(ui.signupUI.accountDeletedText).toBeVisible();
    });

    test('Test case 4:Đăng nhập người dùng thất bại (Login User with incorrect email and password)', async({page}) =>{
        await expect(ui.loginUI.loginTitleText).toBeVisible();
        const staticData = invalidLoginData();
        await loginUser(page, staticData.user);
        await expect(ui.loginUI.errorMessageText).toBeVisible();
    })
});


            