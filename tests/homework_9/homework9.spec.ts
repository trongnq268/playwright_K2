import { test, expect, Locator} from '@playwright/test';
import { addToCart, viewCart, getProductPrice, getProductQuantity, getProductTotal, openProductDetail, addToCartFromDetail, addSingleProductToCart, openCartFromMenu, removeProductFromCart} from '../../helpers/productOrder_helper';
import { fillPreSignupForm, registerUser} from '../../helpers/user_hepler';
import { proceedToCheckout, openRegisterFromCheckoutModal, placeOrderWithComment, fillPaymentInformation} from '../../helpers/checkoutHelper';
import {getUI} from '../../locators/userLocator';
import {getProductDetailLocators, getCart} from '../../locators/productOrderLocator';
import {getCheckoutPageLocators, getOrderConfirmationLocators} from '../../locators/checkoutLocator';
import {createDynamicUserData} from '../../data/user_data';
import {noteOrder, paymentInfor} from '../../data/payment_data';
import {IUserAddress} from '../../types/user_type';

// Kiểm tra từng field địa chỉ trong 1 khu vực (Delivery hoặc Billing) khớp với dữ liệu đã đăng ký.
// Gọi hàm này với CÙNG 1 bộ dữ liệu cho cả 2 khu vực -> nếu cả 2 đều pass thì tức là nội dung
// của Delivery và Billing giống nhau (đều khớp cùng 1 nguồn dữ liệu), không cần so sánh innerText trực tiếp.
async function verifyCheckoutAddress(addressSection: Locator, address: IUserAddress): Promise<void> {
    await expect(addressSection).toContainText(address.firstName);
    await expect(addressSection).toContainText(address.lastName);
    await expect(addressSection).toContainText(address.company ?? '');
    await expect(addressSection).toContainText(address.address);
    await expect(addressSection).toContainText(address.address2 ?? '');
    await expect(addressSection).toContainText(address.city);
    await expect(addressSection).toContainText(address.state);
    await expect(addressSection).toContainText(address.zipcode);
    await expect(addressSection).toContainText(address.country);
    await expect(addressSection).toContainText(address.mobilePhone);
}

test.describe('Kiểm thử Giỏ hàng & Thanh toán', () => {
    let ui: ReturnType<typeof getUI>;
    // Pre-condition
    test.beforeEach('Tiền điều kiện - Mở homepage', async({page}) =>{
        // Chặn quảng cáo trước khi goto trang
          await page.route(
            /googleads|doubleclick|googlesyndication/,
            async (route) => {
            await route.abort();
            }
         );    
        await page.goto('https://automationexercise.com/');
        ui = getUI(page);
        await expect(ui.navigation.homePageLogo).toBeVisible();
    });

    test('Test case 1: Thêm sản phẩm vào Giỏ hàng', async({page}) =>{
        // Thêm sản phẩm vào cart
        await addToCart(page);
        // Kiểm tra sản phẩm đã thêm vào cart
        await viewCart(page);
        // Xác nhận giá từng sản phẩm
        const blueTopPrice = await getProductPrice(page, 'Blue Top');
        await expect(blueTopPrice).toBe(500);
        const menTshirtPrice = await getProductPrice(page, 'Men Tshirt');
        await expect(menTshirtPrice).toBe(400);
        // Xác nhận số lượng từng sản phẩm
        const blueTopQuantity = await getProductQuantity(page, 'Blue Top');
        await expect(blueTopQuantity).toBe(1);
        const menTshirtQuantity = await getProductQuantity(page, 'Men Tshirt');
        await expect(menTshirtQuantity).toBe(1);
        // Xác nhận tổng tiền từng sản phẩm = giá * số lượng
        const blueTopTotal = await getProductTotal(page, 'Blue Top');
        await expect(blueTopTotal).toBe(blueTopPrice * blueTopQuantity);
        const menTshirtTotal = await getProductTotal(page, 'Men Tshirt');
        await expect(menTshirtTotal).toBe(menTshirtPrice * menTshirtQuantity);
    });

    test('Test case 2: Xác nhận số lượng sản phẩm trong giỏ hàng', async({page}) =>{
        // Chọn sản phẩm "Blue Top" trên trang chủ, mở trang chi tiết sản phẩm
        await openProductDetail(page, 'Blue Top');
        // Xác nhận đúng trang chi tiết sản phẩm được mở
        const detail = getProductDetailLocators(page);
        await expect(detail.productNameHeading).toHaveText('Blue Top');
        // Nhập số lượng 4 và thêm vào giỏ hàng
        await addToCartFromDetail(page, 4);
        // Xác nhận đúng sản phẩm xuất hiện trong giỏ hàng
        const cart = getCart(page);
        await expect(cart.checkProductName('Blue Top')).toBeVisible();
        // Xác nhận số lượng của sản phẩm trong giỏ hàng bằng 4
        const quantityLocator = cart.quantityText('Blue Top');
        await expect(quantityLocator).toHaveText("4");
    });

    test('Test case 3: Xóa sản phẩm khỏi Giỏ hàng', async({page}) =>{
        // Thêm "Blue Top" vào giỏ hàng, tự đóng modal "Added!" nếu xuất hiện
        await addSingleProductToCart(page, 'Blue Top');
        // Click "Cart" trên thanh menu và xác nhận trang giỏ hàng hiển thị thành công
        await openCartFromMenu(page);

        const cart = getCart(page);
        // Xác nhận đúng dòng sản phẩm "Blue Top" đang hiển thị trước khi xoá
        await expect(cart.productRow('Blue Top')).toBeVisible();

        // Click nút "X" trên đúng dòng sản phẩm "Blue Top"
        await removeProductFromCart(page, 'Blue Top');

        // Xác nhận toàn bộ dòng sản phẩm "Blue Top" đã biến mất khỏi giỏ hàng
        await expect(cart.productRow('Blue Top')).toHaveCount(0);
        // Giỏ hàng chỉ có 1 sản phẩm nên sau khi xoá sẽ hiển thị thông báo giỏ hàng trống
        await expect(cart.emptyCartText).toBeVisible();
    });

    test('Test Case 4: Đặt hàng - Đăng ký trong lúc thanh toán', async({page}) =>{
        const dynamicData = createDynamicUserData();
        const cart = getCart(page);

        await test.step('Thêm "Blue Top" vào giỏ hàng và mở trang Cart', async() => {
            await addSingleProductToCart(page, 'Blue Top');
            await openCartFromMenu(page);
            await expect(page).toHaveURL(/\/view_cart/);
            await expect(cart.checkProductName('Blue Top')).toBeVisible();
        });

        await test.step('Đăng ký tài khoản mới ngay trong lúc thanh toán', async() => {
            await proceedToCheckout(page);
            await openRegisterFromCheckoutModal(page);
            // Tái dùng đúng các helper đăng ký của bài 8, không viết lại logic
            await expect(ui.preSignupUI.signupTitleText).toBeVisible();
            await fillPreSignupForm(page, dynamicData.user.name, dynamicData.user.email);
            await expect(ui.signupUI.accountInforText).toBeVisible();
            await registerUser(page, dynamicData.user, dynamicData.address);
            await expect(ui.signupUI.accountCreatedText).toBeVisible();
            await ui.signupUI.continueBtn.click();
            await expect(page.locator(ui.navigation.loggedInUserText(dynamicData.user.name))).toBeVisible();
        });

        await test.step('Tiến hành checkout và xác nhận thông tin đơn hàng', async() => {
            await openCartFromMenu(page);
            await proceedToCheckout(page);
            const checkout = getCheckoutPageLocators(page);
            await expect(checkout.addressDetailsHeading).toBeVisible();
            await expect(checkout.reviewOrderHeading).toBeVisible();
            // Khoanh vùng trong khối "delivery address" trước khi so khớp với dữ liệu đăng ký
            await expect(checkout.deliveryAddress.getByText(`${dynamicData.address.firstName} ${dynamicData.address.lastName}`)).toBeVisible();
            await expect(checkout.deliveryAddress.getByText(dynamicData.address.address)).toBeVisible();
            await expect(checkout.deliveryAddress.getByText(dynamicData.address.city)).toBeVisible();
            // Sản phẩm "Blue Top" có trong phần Review Your Order — tái dùng locator dòng sản phẩm của Cart
            await expect(cart.productRow('Blue Top')).toBeVisible();
        });

        await test.step('Nhập comment, đặt hàng và thanh toán', async() => {
            await placeOrderWithComment(page, noteOrder().note);
            await fillPaymentInformation(page, paymentInfor().infor);
            const confirmation = getOrderConfirmationLocators(page);
            // Site thật hiển thị "Order Placed!" (không phải "Your order has been placed successfully!"
            // - chuỗi đó chỉ nằm trong 1 div ẩn trên trang /payment cũ, không bao giờ được hiển thị)
            await expect(confirmation.orderPlacedText).toBeVisible();
            await confirmation.continueBtn.click();
        });

        await test.step('Xoá tài khoản vừa tạo', async() => {
            await ui.signupUI.deleteBtn.click();
            await expect(ui.signupUI.accountDeletedText).toBeVisible();
            await ui.signupUI.continueBtn.click();
        });
    });

    test('Test Case 5: Xác nhận thông tin địa chỉ ở trang thanh toán', async({page}) =>{
        const dynamicData = createDynamicUserData();
        const cart = getCart(page);

        await test.step('Đăng ký tài khoản mới', async() => {
            // Tái dùng đúng helper đăng ký của bài 8, không viết lại logic trong file test
            await ui.navigation.signupLoginBtn.click();
            await expect(ui.preSignupUI.signupTitleText).toBeVisible();
            await fillPreSignupForm(page, dynamicData.user.name, dynamicData.user.email);
            await expect(ui.signupUI.accountInforText).toBeVisible();
            await registerUser(page, dynamicData.user, dynamicData.address);
            await expect(ui.signupUI.accountCreatedText).toBeVisible();
            await ui.signupUI.continueBtn.click();
            await expect(page.locator(ui.navigation.loggedInUserText(dynamicData.user.name))).toBeVisible();
        });

        await test.step('Thêm "Blue Top" vào giỏ hàng và mở trang Cart', async() => {
            // Tái dùng helper thêm sản phẩm và mở Cart đã có từ các test case trước
            await addSingleProductToCart(page, 'Blue Top');
            await openCartFromMenu(page);
            await expect(page).toHaveURL(/\/view_cart/);
            await expect(cart.checkProductName('Blue Top')).toBeVisible();
        });

        await test.step('Vào trang Checkout và xác nhận Address Details', async() => {
            await proceedToCheckout(page);
            const checkout = getCheckoutPageLocators(page);
            await expect(checkout.addressDetailsHeading).toBeVisible();

            // Delivery Address phải khớp đúng thông tin đã đăng ký
            await verifyCheckoutAddress(checkout.deliveryAddress, dynamicData.address);
            // Billing Address dùng cùng dữ liệu đăng ký -> nếu cả 2 pass thì Delivery và Billing giống nhau
            await verifyCheckoutAddress(checkout.billingAddress, dynamicData.address);
        });

        await test.step('Xoá tài khoản vừa tạo', async() => {
            await ui.signupUI.deleteBtn.click();
            await expect(ui.signupUI.accountDeletedText).toBeVisible();
            await ui.signupUI.continueBtn.click();
        });
    });

});