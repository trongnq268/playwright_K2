import {test, expect} from "@playwright/test"

import { deleteAccount, fillPreSignUpForm, loginUser, registerUser } 
from "../../helpers/authHelper"

import {getUI } from "../../locators/authLocators";

import { createUserDynamicData, existEmailData, invalidLoginData, vaildAddressData, validRegisterData } from "../../data/userData";
import { userLogin } from "../../type/user.interface";

test.describe("Test case ve dang ky", ()=>{
    let ui: ReturnType<typeof getUI>;
    //let dynamicData: ReturnType<typeof createUserDynamicData>
    
    test.beforeEach(async ({ page }) => {
        await page.goto("https://automationexercise.com/");
        ui = getUI(page);
        await expect(ui.navigation.homePageSlide).toBeVisible();
        await ui.navigation.SignupLoginLink.click();
    })

    test ("Test Case 1: Đăng ký người dùng (Register User)", async ({page})=> {
        await expect (ui.UIPreSignUp.newUserSignUpText).toBeVisible();
        const dynamicData = createUserDynamicData();
        await fillPreSignUpForm(page, dynamicData.user.name, dynamicData.user.email);
        await expect(ui.UISignUp.accountInfoText).toBeVisible
        await expect(ui.UISignUp.nameInput).toHaveValue(dynamicData.user.name);
        await expect(ui.UISignUp.emailInput).toHaveValue(dynamicData.user.email);

        await registerUser(page, dynamicData.user , dynamicData.address );
        // await ui.UISignUp.receiverOffersCheckbox.click();
        // await ui.UISignUp.signupNewsletterCheckbox.click();
        await expect(ui.UIAccountCreate.accountCreateHeading).toBeVisible();

        await ui.UIAccountCreate.continueBtn.click();
        await expect(ui.navigation.loginUserText(dynamicData.user.name)).toBeVisible()
        await ui.navigation.deleteAccountLink.click();
        await expect(ui.UIAccountDelete.accountDeletedHeading).toBeVisible();
        await ui.UIAccountDelete.continueBtn.click();
    });

    test("Test case 2: User da ton tai", async ({ page}) =>{
        await expect (ui.UIPreSignUp.newUserSignUpText).toBeVisible();
        await fillPreSignUpForm(page, existEmailData.name, existEmailData.email);
        await ui.UIPreSignUp.signUpButton.click();
        await expect (ui.UIPreSignUp.emailExistMsg).toBeVisible();
       
    });

    test("Test case 3: Dang nhap thanh cong", async ({page}) =>{
        const dynamicData = createUserDynamicData();
        await fillPreSignUpForm (
            page,
            dynamicData.user.name,
            dynamicData.user.email,
        );
        await registerUser(page, dynamicData.user, dynamicData.address);
        await ui.UIAccountCreate.continueBtn.click();
        await ui.navigation.LogoutLink.click();
        await ui.navigation.SignupLoginLink.click();
        await expect(ui.UILogin.loginAccountText).toBeVisible();

        const loginDetails: userLogin = {
            email: dynamicData.user.email,
            password: dynamicData.user.password,
        };
        await loginUser(page, loginDetails);
        await expect(ui.navigation.loginUserText(dynamicData.user.name)).toBeVisible();

        await deleteAccount(page);
    });

    test("Test case 4: Dang nhap that bai", async ({page}) =>{
        await expect(ui.UILogin.loginAccountText).toBeVisible();
        await loginUser(page, invalidLoginData)
        await expect(ui.UILogin.invalidLoginMsg).toBeVisible();

    })

   


})

