import { Page, expect } from "@playwright/test";
import { userAddress, userLogin, userResgister } from "../type/user.interface";
import { getPreSignUpLocators,getSignUpLocators, getLoginLocators,getHomePageLocators, getAccountDeleteLocators } from "../locators/authLocators";
export const fillPreSignUpForm = async(page: Page, name: string, email: string) =>{
    const UIPreSignUp = getPreSignUpLocators(page);
    await UIPreSignUp.nameRegisterInput.fill(name);
    await UIPreSignUp.emailAddressRegisterInput.fill(email);
    await UIPreSignUp.signUpButton.click();
}

export const loginUser = async (page:Page, loginDetails: userLogin) => {
    const login = getLoginLocators(page);
    await login.emailAddressLoginInput.fill(loginDetails.email);
    await login.passwordLoginInput.fill(loginDetails.password);
    await login.loginButton.click();
}



export const registerUser = async (page: Page, user: userResgister, address: userAddress):
Promise<userResgister> =>{
    const signUp = getSignUpLocators(page)
    await signUp.MrsRadio.click();
    await signUp.passwordInput.fill(user.password);
    await signUp.daySelect.selectOption(`${user.date}`);
    await signUp.monthSelect.selectOption(`${user.month}`);
    await signUp.yearSelect.selectOption(`${user.year}`);

    await signUp.fistNameInput.fill(address.firstName);
    await signUp.lastNameInput.fill(address.lastName);
    await signUp.companyInput.fill(address.company ?? "");
    await signUp.addressInput.fill(address.adress);
    await signUp.address2Input.fill(address.adress2 ?? "");
    await signUp.countrySelect.selectOption(address.country);
    await signUp.stateInput.fill(address.state);
    await signUp.cityInput.fill(address.city);
    await signUp.zipCodeInput.fill(address.zipCode);
    await signUp.mobileNumberInput.fill(address.mobileNumber);
    await signUp.createAccountButton.click();

    return user;
    // Neeus Promise koong trar ra gif => dungf void vaf khong canf return
};

export const deleteAccount = async (page: Page) => {
    const navUI = getHomePageLocators(page);
    const accountDeleteUI = getAccountDeleteLocators(page);
    await navUI.deleteAccountLink.click();
    await expect(accountDeleteUI.accountDeletedHeading).toBeVisible();
};

