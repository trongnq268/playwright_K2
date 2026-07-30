import { test, expect } from "@playwright/test";
import { getUI } from "../../locators/auth.locators";
import * as data from "../../data/userData";
import {
  fillPreSignup,
  deleteAcc,
  loginUser,
  registerUser,
} from "../../helpers/authHelper";
import { IUserLogin } from "../../types/user.interface";

test.describe("Login and register user tests", () => {
  let ui: ReturnType<typeof getUI>;

  test.beforeEach(
    "Open web, home page and login/signup form",
    async ({ page }) => {
      //step 1 and 2
      await page.goto("http://automationexercise.com");
      ui = getUI(page);
      //step 3
      await expect(ui.auth.homeSlide).toBeVisible();
      //step 4
      await ui.auth.signupLink.click();
    },
  );

  test("TC1: Register new user", async ({ page }) => {
    //step 5, 6, 7
    await expect(ui.preSignupUI.signupHeading).toBeVisible();
    await fillPreSignup(
      page,
      data.REGISTER_DATA.name,
      data.REGISTER_DATA.email,
    );

    //step 8-13
    await expect(ui.signupUI.enterAccInfoText).toBeVisible();
    await expect(ui.signupUI.name).toHaveValue(data.REGISTER_DATA.name);
    await expect(ui.signupUI.email).toHaveValue(data.REGISTER_DATA.email);
    await registerUser(page, data.REGISTER_DATA, data.ADDRESS_DATA);

    //step 14-16
    await expect(ui.afterSignupUI.signupSuccessHeading).toBeVisible();
    await ui.afterSignupUI.continueBtn.click();
    await expect(
      ui.auth.loggedInUserText(data.REGISTER_DATA.name),
    ).toBeVisible();

    //step 17, 18
    await ui.auth.deleteAccLink.click();
    await expect(ui.deleteAccUI.deleteHeading).toBeVisible();
    await ui.deleteAccUI.continueBtn.click();
  });

  test("TC2: Register with existing email", async ({ page }) => {
    await expect(ui.preSignupUI.signupHeading).toBeVisible();
    await fillPreSignup(
      page,
      data.EXISTING_EMAIL_DATA.name,
      data.EXISTING_EMAIL_DATA.email,
    );
    await expect(ui.preSignupUI.invalidEmailMsg).toBeVisible();
  });

  test("TC3: Login with correct email and password", async ({ page }) => {
    await fillPreSignup(
      page,
      data.REGISTER_DATA.name,
      data.REGISTER_DATA.email,
    );

    const newUser = await registerUser(
      page,
      data.REGISTER_DATA,
      data.ADDRESS_DATA,
    );

    const newLogin: IUserLogin = {
      email: newUser.email,
      password: newUser.password,
    };

    //logout and direct to login page
    await ui.afterSignupUI.continueBtn.click();
    await ui.auth.logoutLink.click();
    await ui.auth.signupLink.click();
    await expect(ui.loginUI.loginHeading).toBeVisible();

    //login new user
    await loginUser(page, newLogin);
    await expect(ui.auth.loggedInUserText(newUser.name)).toBeVisible();

    //delete account
    await deleteAcc(page);
  });

  test("TC4: Login with incorrect email or password", async ({ page }) => {
    expect(ui.loginUI.loginHeading).toBeVisible();
    await loginUser(page, data.INVALID_LOGIN_DATA);
    await expect(ui.loginUI.invalidLoginMsg).toBeVisible();
  });
});
