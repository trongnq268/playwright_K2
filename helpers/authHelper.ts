import {Page, expect} from "@playwright/test";
import { IUserAdress, IUserLogin, IUserRegister } from "../types/user.interface";
import {
    getPreSignupLocators,
    getSignupLocators,
    getLoginLocators,
    getHomePageLocators,
    getAccountDeletedLocators,
} from "../locators/authorLocators";

export const fillPreSignupFrom = async (page: Page, name: string, email: string) => {
    const preSignupUI = getPreSignupLocators(page);
    await preSignupUI.nameInput.fill(name);
    await preSignupUI.emailInput.fill(email);
     await preSignupUI.signupBtn.click();
}

export const loginUser = async (page: Page, loginUser: IUserLogin) => {
    const login = getLoginLocators(page);
    await login.emailInput.fill(loginUser.email);
    await login.passwordInput.fill(loginUser.password);
    await login.loginBtn.click();
}

export const registerUser = async (page: Page, user: IUserRegister, address: IUserAdress):
Promise<IUserRegister> => {
    const dang_ky = getSignupLocators(page);
    await dang_ky.titleMrRadio.click();
    await dang_ky.passwordInput.fill(user.password);
    await dang_ky.dayDropdown.selectOption(`${user.day}`);
    await dang_ky.monthDropdown.selectOption(`${user.month}`);
    await dang_ky.yearDropdown.selectOption(`${user.year}`);

    
    return user;
}