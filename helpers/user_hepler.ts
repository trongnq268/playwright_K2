import { Page } from '@playwright/test';
import { IUserLogin, IUserRegister, IUserAddress}  from '../types/user_type';
import { getPreSignUpLocators, getLoginLocators, getSignUpLocators} from '../locators/userLocator';

export const fillPreSignupForm = async(page: Page, name: string, email: string) =>{
    const preSignupUI = getPreSignUpLocators(page);
    await preSignupUI.signupNameInput.fill(name);
    await preSignupUI.signupEmailInput.fill(email);
    await preSignupUI.signupLoginBtn.click();
}

export const loginUser = async(page: Page, logInUser: IUserLogin) => {
    const login = getLoginLocators(page);
    await login.loginEmailInput.fill(logInUser.email);
    await login.loginPasswordInput.fill(logInUser.password);
    await login.loginBtn.click();
}

export const registerUser = async(page: Page, user: IUserRegister, address: IUserAddress): Promise<IUserRegister> =>{
    const register = getSignUpLocators(page);
    await register.MrsRadio.click();
    await register.passwordInput.fill(user.password);
    await register.daySelect.selectOption(`${user.day}`);
    await register.monthSelect.selectOption(`${user.month}`);
    await register.yearSelect.selectOption(`${user.year}`);
    await register.newsletterCheckbox.check();
    await register.specialOfferCheckbox.check();
    await register.FirstNameInput.fill(address.firstName);
    await register.LastNameInput.fill(address.lastName);
    await register.CompanyInput.fill(address.company ?? "");
    await register.AddressInput.fill(address.address);
    await register.Address2Input.fill(address.address2 ?? "");
    await register.CountrySelect.selectOption(`${address.country}`);
    await register.StateInput.fill(address.state);
    await register.CityInput.fill(address.city);
    await register.ZipcodeInput.fill(address.zipcode);
    await register.MobilePhoneInput.fill(address.mobilePhone);
    await register.createAccountBtn.click();
    return user;
}
