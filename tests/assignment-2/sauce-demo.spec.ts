import { test, expect } from "@playwright/test";
import { getSauceDemoUI } from "../../locators/sauceDemo.locators";
import { STANDARD_USER_LOGIN } from "../../data/sauceDemoData";
import { addProductToCart, loginSauceDemoUser, logoutUser } from "../../helpers/sauceDemoHelper";

test.describe("End-to-end sauce demo", () => {
  test("SauceDemo e2e add to cart", async ({ page }) => {
    const sauceDemoUI = getSauceDemoUI(page);

    await test.step("Open sauce demo web", async () => {
      await page.goto("https://www.saucedemo.com/");
    });

    await test.step("Login standard user", async () => {
      await loginSauceDemoUser(
        page,
        STANDARD_USER_LOGIN.username,
        STANDARD_USER_LOGIN.password,
      );
    });

    await test.step("Verify page heading after login", async() =>{
        await expect(sauceDemoUI.productUI.pageTitle).toBeVisible();
    })

    await test.step("Add product to cart by product name", async() =>{
        const product1 = 'Sauce Labs Backpack';
        const product2 = 'Sauce Labs Bike Light';
        await addProductToCart(page, product1); 
        await addProductToCart(page, product2); 
    })

    await test.step("Click cart icon to open cart", async() => {
        await sauceDemoUI.navigation.cartLink.click();
        await page.waitForURL("**/cart.html"); 
    })
    
    await test.step('Verify correct products added to cart', async() =>{
        const cartItem1 = sauceDemoUI.cartUI.cartItemName.nth(0); 
        const cartItem2 = sauceDemoUI.cartUI.cartItemName.nth(1); 

        await expect(cartItem1).toBeVisible(); 
        await expect(cartItem1).toHaveText('Sauce Labs Backpack'); 
        await expect(cartItem2).toHaveText('Sauce Labs Bike Light'); 
    })

    await test.step('Logout user', async() =>{
      await logoutUser(page); 
    })

    await test.step('Verify user is logged out', async() => {
      //logout thành công, user được back về trang hiển thị form login
      await expect(sauceDemoUI.loginUI.loginBox).toBeVisible();   
    })
 
  });
});
