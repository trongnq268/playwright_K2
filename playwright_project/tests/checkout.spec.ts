import { test, expect } from '@playwright/test';
import { homePage } from '../lib/pages/homePage.page';
import { productPage } from '../lib/pages/product.page';
import { cartPage } from '../lib/pages/cart.page';
import { loginPage } from '../lib/pages/login.page';
import { signupPage } from '../lib/pages/signup.page';
import { checkoutPage } from '../lib/pages/checkout.page';
import { paymentPage } from '../lib/pages/payment.page';
import { deleteAccountPage } from '../lib/pages/deleteAccount.page';
import { addProductToCart, clickContinueShopping, navCartPage } from '../lib/helpers/productOrder.helper';
import {
    proceedToCheckout,
    clickRegisterLoginInModal,
    fillSignupNameEmail,
    fillAccountInformation,
    clickContinueAfterSignup,
    fillOrderComment,
    clickPlaceOrder,
    fillPaymentInfo,
    clickPayButton,
    clickDeleteAccount,
    clickContinueAfterDelete,
    verifyAddressMatchesSignup,
} from '../lib/helpers/checkout.helper';
import { SignupInfo } from '../lib/types/signup.type';

test.describe('TC 4, 5: Các luồng Đặt hàng & Xác nhận địa chỉ', () => {
    let home: homePage;
    let products: productPage;
    let cart: cartPage;
    let login: loginPage;
    let signup: signupPage;
    let checkout: checkoutPage;
    let payment: paymentPage;
    let deleteAccountPageObj: deleteAccountPage;

    test.beforeEach('Chặn quảng cáo', async ({ page }) => {
        await page.route(/doubleclick\.net|googlesyndication\.com|googleadservices\.com|google\.com\/pagead/, route => route.abort());
    });

    test.beforeEach('Mở website', async ({ page }) => {
        home = new homePage(page);
        products = new productPage(page);
        cart = new cartPage(page);
        login = new loginPage(page);
        signup = new signupPage(page);
        checkout = new checkoutPage(page);
        payment = new paymentPage(page);
        deleteAccountPageObj = new deleteAccountPage(page);

        await page.goto('https://automationexercise.com/');
        await expect(home.homePageHeading).toBeVisible();
    });

    test('Test case 4: Đặt hàng — Đăng ký trong lúc Thanh toán', async ({ page }) => {
        const timestamp = Date.now();
        const name = `QA Test ${timestamp}`;
        const email = `qa.test.${timestamp}@example.com`;

        // Thêm sản phẩm vào giỏ hàng
        await addProductToCart(page, 'Blue Top');
        await expect(products.cartModal).toBeVisible();
        await clickContinueShopping(page);
        await expect(products.cartModal).toBeHidden();

        // Click nút 'Cart'
        await navCartPage(page);
        await expect(cart.cartPageHeading).toHaveText('Shopping Cart');

        // Click 'Proceed To Checkout'
        await proceedToCheckout(page);

        // Click nút 'Register / Login'
        await clickRegisterLoginInModal(page);
        await expect(login.signupNameInput).toBeVisible();

        // Điền đầy đủ thông tin ở phần Signup và tạo tài khoản
        await fillSignupNameEmail(page, name, email);
        await expect(signup.accountInfoHeading).toBeVisible();
        await fillAccountInformation(page, {
            title: 'Mr',
            password: 'Test@12345',
            day: '10',
            month: '5',
            year: '1995',
            firstName: 'QA',
            lastName: 'Test',
            address: '123 Test Street',
            state: 'Test State',
            city: 'Test City',
            zipcode: '700000',
            mobileNumber: '0900000000',
        });

        // Xác nhận 'ACCOUNT CREATED!' và click nút 'Continue'
        await expect(signup.accountCreatedHeading).toBeVisible();
        await clickContinueAfterSignup(page);

        // Xác nhận 'Logged in as username' ở phía trên cùng
        await expect(home.loggedInAsText(name)).toBeVisible();

        // Click nút 'Cart'
        await navCartPage(page);

        // Click 'Proceed To Checkout'
        await proceedToCheckout(page);

        // Xác nhận Thông tin địa chỉ (Address Details) và phần Xem lại đơn hàng (Review Your Order)
        await expect(checkout.addressDetails).toBeVisible();
        await expect(checkout.reviewOrderTable).toBeVisible();

        // Nhập nội dung vào ô comment và click 'Place Order'
        await fillOrderComment(page, 'Vui lòng giao hàng cẩn thận.');
        await clickPlaceOrder(page);

        // Nhập thông tin thanh toán: Tên trên thẻ, Số thẻ, CVC, Ngày hết hạn
        await fillPaymentInfo(page, {
            nameOnCard: name,
            cardNumber: '4111111111111111',
            cvc: '123',
            expiryMonth: '12',
            expiryYear: '2030',
        });

        // Click nút 'Pay and Confirm Order'
        await clickPayButton(page);

        // Xác nhận đặt hàng thành công
        await expect(payment.orderPlacedHeading).toBeVisible();

        // Click nút 'Delete Account'
        await clickDeleteAccount(page);

        // Xác nhận 'ACCOUNT DELETED!' và click nút 'Continue'
        await expect(deleteAccountPageObj.accountDeletedHeading).toBeVisible();
        await clickContinueAfterDelete(page);
    });

    test('Test case 5: Xác nhận địa chỉ giao hàng và thanh toán khớp thông tin đăng ký', async ({ page }) => {
        const timestamp = Date.now();
        const name = `QA Test ${timestamp}`;
        const email = `qa.test.${timestamp}@example.com`;
        const signupInfo: SignupInfo = {
            title: 'Mr',
            password: 'Test@12345',
            day: '10',
            month: '5',
            year: '1995',
            firstName: 'QA',
            lastName: 'Test',
            address: '123 Test Street',
            state: 'Test State',
            city: 'Test City',
            zipcode: '700000',
            mobileNumber: '0900000000',
        };

        // Click nút 'Signup / Login'
        await home.signupLoginNavBtn.click();
        await expect(login.signupNameInput).toBeVisible();

        // Điền đầy đủ thông tin ở phần Signup và tạo tài khoản
        await fillSignupNameEmail(page, name, email);
        await expect(signup.accountInfoHeading).toBeVisible();
        await fillAccountInformation(page, signupInfo);

        // Xác nhận 'ACCOUNT CREATED!' và click nút 'Continue'
        await expect(signup.accountCreatedHeading).toBeVisible();
        await clickContinueAfterSignup(page);

        // Xác nhận 'Logged in as username' ở phía trên cùng
        await expect(home.loggedInAsText(name)).toBeVisible();

        // Thêm sản phẩm vào giỏ hàng
        await addProductToCart(page, 'Blue Top');
        await expect(products.cartModal).toBeVisible();
        await clickContinueShopping(page);
        await expect(products.cartModal).toBeHidden();

        // Click nút 'Cart'
        await navCartPage(page);

        // Click 'Proceed To Checkout'
        await proceedToCheckout(page);

        // Xác nhận địa chỉ giao hàng và địa chỉ thanh toán giống hệt lúc đăng ký
        await verifyAddressMatchesSignup(page, signupInfo);

        // Click nút 'Delete Account'
        await clickDeleteAccount(page);

        // Xác nhận 'ACCOUNT DELETED!' và click nút 'Continue'
        await expect(deleteAccountPageObj.accountDeletedHeading).toBeVisible();
        await clickContinueAfterDelete(page);
    });
});
