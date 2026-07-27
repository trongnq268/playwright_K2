import {Page} from "@playwright/test";

export const AuthLocators = {
    //Trang chủ & Menu
    homePageLogo:'img[alt="Website for automation practice"]',
    signupLoginBtn: 'a[href="/login"]',
    loggedInUserText: (username: string) => `text=Logged in as ${username}`,

    //Form Đăng ký mới
    signupHeader: 'h2:has-text("New User Signup!")',
    signupNameInput: '[data-qa="signup-name"]',
    
}

export const getUI = (page: Page) => ({

});