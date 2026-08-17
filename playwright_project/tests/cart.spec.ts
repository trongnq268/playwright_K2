import { test, expect } from '@playwright/test';
import { homePage } from '../lib/pages/homePage.page';
import { productPage } from '../lib/pages/product.page';
import { cartPage } from '../lib/pages/cart.page';
import { productDetail } from '../lib/pages/productDetail.page';
import { navProductPage, addProductToCart, clickContinueShopping, clickViewCart, verifyProductInCart, verifyProductDetails, viewProductBtn, setProductQuantity, addToCartFromDetail, clickViewCartFromDetail, navCartPage, removeProductFromCart } from '../lib/helpers/productOrder.helper';

test.describe('Test case 1,2,3 - Luồng giỏ hàng', () => {
    let home: homePage;
    let products: productPage;
    let cart: cartPage;
    let productDetailPage: productDetail;

    test.beforeEach('Chặn quảng cáo', async ({ page }) => {
        await page.route(/doubleclick\.net|googlesyndication\.com|googleadservices\.com|google\.com\/pagead/, route => route.abort());
    });

    test.beforeEach('Mở website', async ({ page }) => {
        home = new homePage(page);
        products = new productPage(page);
        cart = new cartPage(page);
        productDetailPage = new productDetail(page);

        await page.goto('https://automationexercise.com/');
        await expect(home.homePageHeading).toBeVisible();
    });

    test('Test Case 1: Thêm sản phẩm vào Giỏ hàng', async ({page}) => {
        await navProductPage(page);
        await expect(products.allProductTitle).toBeVisible();

        // Sản phẩm thứ nhất: Blue Top
        await addProductToCart(page, 'Blue Top');
        await expect(products.cartModal).toBeVisible();
        await clickContinueShopping(page);
        await expect(products.cartModal).toBeHidden();

        // Sản phẩm thứ hai: Men Tshirt
        await addProductToCart(page, 'Men Tshirt');
        await expect(products.cartModal).toBeVisible();
        await clickViewCart(page);

        await expect(cart.cartPageHeading).toHaveText('Shopping Cart');

        // Xác nhận cả hai sản phẩm đã được thêm vào Giỏ hàng
        await verifyProductInCart(page, 'Blue Top');
        await verifyProductInCart(page, 'Men Tshirt');

        // Xác nhận giá, số lượng và tổng tiền của từng sản phẩm
        await verifyProductDetails(page, 'Blue Top', 'Rs. 500', '1', 'Rs. 500');
        await verifyProductDetails(page, 'Men Tshirt', 'Rs. 400', '1', 'Rs. 400');
    });

    test('Test Case 2: Xác nhận Số lượng sản phẩm trong Giỏ hàng', async({page}) => {
        await viewProductBtn(page, 'Blue Top');
        await expect(productDetailPage.productNameHeading).toBeVisible();

        await setProductQuantity(page, 4);
        await addToCartFromDetail(page);
        await expect(productDetailPage.cartModal).toBeVisible();
        await clickViewCartFromDetail(page);

        await expect(cart.cartPageHeading).toHaveText('Shopping Cart');
        await verifyProductInCart(page, 'Blue Top');
        await expect(cart.productQuantity('Blue Top')).toHaveText('4');
    });

    test('Test Case 3: Xóa sản phẩm khỏi Giỏ hàng', async({page}) =>{
        await addProductToCart(page, 'Blue Top');
        await expect(products.cartModal).toBeVisible();
        await clickContinueShopping(page);
        await expect(products.cartModal).toBeHidden();

        await navCartPage(page);
        await expect(cart.cartPageHeading).toHaveText('Shopping Cart');
        await verifyProductInCart(page, 'Blue Top');

        await removeProductFromCart(page, 'Blue Top');
        await expect(cart.cartRowByName('Blue Top')).toHaveCount(0);
    });
});
