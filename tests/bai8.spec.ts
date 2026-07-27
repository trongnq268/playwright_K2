import {test, expect} from "@playwright/test"
import { fillPreSignupFrom, loginUser, registerUser } from "../helpers/authHelper"
import { getUI } from "../locators/authorLocators";

test.describe("TC về đăng ký", () => {
    let ui: ReturnType<typeof getUI>;
    test.beforeEach(async ({page}) => {
        await page.goto("http://automationexercise.com/");
        ui = getUI(page);
        //await expect(ui.navigation.homeSlide).toBeVisible();
        //await ui.navigation,singupLoginBtn.click();

    })

    test("TC1: Dang ky", async({page}) => {
        //await expect(ui.preSignupUI.signupHeading).toBeVisible();
        //Hàm dynamic user data
        //const dynamicData = createDynamicUserData();
        //await fillPreSignupFrom(page,dynamicData.user.name, dynamicData.user.email);
        //await expect(ui.signupUI.accountInfoHeading).toBeVisible();
        //await registerUser(page, dynamicData.user, dynamicData.address);
        
    })
})