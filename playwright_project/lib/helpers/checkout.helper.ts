import { Page, expect } from '@playwright/test';
import { homePage } from '../pages/homePage.page';
import { cartPage } from '../pages/cart.page';
import { loginPage } from '../pages/login.page';
import { signupPage } from '../pages/signup.page';
import { checkoutPage } from '../pages/checkout.page';
import { paymentPage } from '../pages/payment.page';
import { deleteAccountPage } from '../pages/deleteAccount.page';
import { SignupInfo } from '../types/signup.type';
import { PaymentInfo } from '../types/payment.type';

// Click 'Proceed To Checkout' trên trang giỏ hàng
export const proceedToCheckout = async(page: Page) => {
    const cart = new cartPage(page);
    await cart.proceedToCheckoutBtn.click();
}

// Click 'Register / Login' trong modal yêu cầu đăng nhập khi checkout
export const clickRegisterLoginInModal = async(page: Page) => {
    const cart = new cartPage(page);
    await cart.registerLoginLink.click();
}

// Điền tên + email và click Signup ở trang Login
export const fillSignupNameEmail = async(page: Page, name: string, email: string) => {
    const login = new loginPage(page);
    await login.signupNameInput.fill(name);
    await login.signupEmailInput.fill(email);
    await login.signupBtn.click();
}

// Điền toàn bộ form 'Enter Account Information' và tạo tài khoản
export const fillAccountInformation = async(page: Page, info: SignupInfo) => {
    const signup = new signupPage(page);
    await signup.titleRadio(info.title).check({ force: true });
    await signup.passwordInput.fill(info.password);
    await signup.daysSelect.selectOption(info.day);
    await signup.monthsSelect.selectOption(info.month);
    await signup.yearsSelect.selectOption(info.year);
    await signup.firstNameInput.fill(info.firstName);
    await signup.lastNameInput.fill(info.lastName);
    await signup.addressInput.fill(info.address);
    await signup.stateInput.fill(info.state);
    await signup.cityInput.fill(info.city);
    await signup.zipcodeInput.fill(info.zipcode);
    await signup.mobileNumberInput.fill(info.mobileNumber);
    await signup.createAccountBtn.click();
}

// Click 'Continue' ở trang Account Created
export const clickContinueAfterSignup = async(page: Page) => {
    const signup = new signupPage(page);
    await signup.continueBtn.click();
}

// Nhập nội dung comment cho đơn hàng
export const fillOrderComment = async(page: Page, comment: string) => {
    const checkout = new checkoutPage(page);
    await checkout.commentInput.fill(comment);
}

// Click 'Place Order'
export const clickPlaceOrder = async(page: Page) => {
    const checkout = new checkoutPage(page);
    await checkout.placeOrderBtn.click();
}

// Điền thông tin thanh toán
export const fillPaymentInfo = async(page: Page, payment: PaymentInfo) => {
    const paymentForm = new paymentPage(page);
    await paymentForm.nameOnCardInput.fill(payment.nameOnCard);
    await paymentForm.cardNumberInput.fill(payment.cardNumber);
    await paymentForm.cvcInput.fill(payment.cvc);
    await paymentForm.expiryMonthInput.fill(payment.expiryMonth);
    await paymentForm.expiryYearInput.fill(payment.expiryYear);
}

// Click 'Pay and Confirm Order'
export const clickPayButton = async(page: Page) => {
    const paymentForm = new paymentPage(page);
    await paymentForm.payBtn.click();
}

// Click 'Delete Account' trên navbar
export const clickDeleteAccount = async(page: Page) => {
    const home = new homePage(page);
    await home.deleteAccountNavBtn.click();
}

// Click 'Continue' ở trang Account Deleted
export const clickContinueAfterDelete = async(page: Page) => {
    const deleteAccount = new deleteAccountPage(page);
    await deleteAccount.continueBtn.click();
}

// Xác nhận địa chỉ giao hàng và địa chỉ thanh toán trên trang checkout giống hệt thông tin đã điền lúc đăng ký
export const verifyAddressMatchesSignup = async(page: Page, info: SignupInfo) => {
    const checkout = new checkoutPage(page);
    const titlePrefix = info.title === 'Mr' ? 'Mr.' : 'Mrs.';
    const expectedName = `${titlePrefix} ${info.firstName} ${info.lastName}`;

    for (const address of [checkout.addressDetails, checkout.billingAddress]) {
        await expect(address).toContainText(expectedName);
        await expect(address).toContainText(info.address);
        await expect(address).toContainText(info.city);
        await expect(address).toContainText(info.state);
        await expect(address).toContainText(info.zipcode);
        await expect(address).toContainText(info.mobileNumber);
    }
}
