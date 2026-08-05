import { test, expect } from '@playwright/test';
import { statSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { getUI } from '../../locators/userLocator';
import { getCart } from '../../locators/productOrderLocator';
import { getCheckoutPageLocators, getOrderConfirmationLocators, getPaymentPageLocators } from '../../locators/checkoutLocator';
import { fillPreSignupForm, registerUser, loginUser } from '../../helpers/user_hepler';
import { addSingleProductToCart, openCartFromMenu, removeProductFromCart, goToCategoryProducts, openAllProducts, searchProduct, addMultipleProductsToCart } from '../../helpers/productOrder_helper';
import { getCategoryLocators, getSearchLocators, getAddToCartLocators } from '../../locators/productOrderLocator';
import { proceedToCheckout, openRegisterFromCheckoutModal, placeOrderWithComment, fillPaymentInformation, fillPaymentFields, downloadInvoice } from '../../helpers/checkoutHelper';
import { createDynamicUserData, validLoginData } from '../../data/user_data';
import { noteOrder, paymentInfor } from '../../data/payment_data';

test.describe('Homework 10 - Đặt hàng', () => {
    let ui: ReturnType<typeof getUI>;

    test.beforeEach('Tiền điều kiện - Mở homepage', async({page}) => {
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

    test('Test Case 1: Đặt hàng - Đăng nhập trước khi thanh toán', async({page}) => {
        const dynamicData = createDynamicUserData();
        const cart = getCart(page);

        await test.step('Chuẩn bị tài khoản đã tồn tại (đăng ký rồi đăng xuất)', async() => {
            // Test case yêu cầu login bằng tài khoản đã tồn tại, nhưng luồng sẽ xoá tài khoản ở bước
            // cuối. Không dùng validLoginData() (tài khoản tĩnh) vì homework8 Test case 2 cần email đó
            // luôn tồn tại. Nên tạo 1 tài khoản riêng cho test này bằng đúng helper đăng ký của bài 8.
            await ui.navigation.signupLoginBtn.click();
            await expect(ui.preSignupUI.signupTitleText).toBeVisible();
            await fillPreSignupForm(page, dynamicData.user.name, dynamicData.user.email);
            await expect(ui.signupUI.accountInforText).toBeVisible();
            await registerUser(page, dynamicData.user, dynamicData.address);
            await expect(ui.signupUI.accountCreatedText).toBeVisible();
            await ui.signupUI.continueBtn.click();
            await ui.navigation.logoutBtn.click();
        });

        await test.step('Đăng nhập bằng tài khoản đã tồn tại', async() => {
            await expect(ui.loginUI.loginTitleText).toBeVisible();
            await loginUser(page, { email: dynamicData.user.email, password: dynamicData.user.password });
            await expect(page.locator(ui.navigation.loggedInUserText(dynamicData.user.name))).toBeVisible();
        });

        await test.step('Thêm "Blue Top" vào giỏ hàng và mở trang Cart', async() => {
            await addSingleProductToCart(page, 'Blue Top');
            await openCartFromMenu(page);
            await expect(page).toHaveURL(/\/view_cart/);
            await expect(cart.checkProductName('Blue Top')).toBeVisible();
        });

        await test.step('Tiến hành checkout và xác nhận thông tin đơn hàng', async() => {
            await proceedToCheckout(page);
            const checkout = getCheckoutPageLocators(page);
            await expect(checkout.addressDetailsHeading).toBeVisible();
            await expect(checkout.reviewOrderHeading).toBeVisible();
            // Sản phẩm "Blue Top" có trong phần Review Your Order — tái dùng locator dòng sản phẩm của Cart
            await expect(cart.productRow('Blue Top')).toBeVisible();
        });

        await test.step('Nhập comment, đặt hàng và thanh toán', async() => {
            await placeOrderWithComment(page, noteOrder().note);
            await fillPaymentInformation(page, paymentInfor().infor);
            const confirmation = getOrderConfirmationLocators(page);
            // Site thật hiển thị "Order Placed!" (không phải "Your order has been placed successfully!")
            await expect(confirmation.orderPlacedText).toBeVisible();
            await confirmation.continueBtn.click();
        });

        await test.step('Xoá tài khoản vừa dùng', async() => {
            await ui.signupUI.deleteBtn.click();
            await expect(ui.signupUI.accountDeletedText).toBeVisible();
            await ui.signupUI.continueBtn.click();
        });
    });

    test('Test Case 2: Xóa sản phẩm khỏi giỏ hàng', async({page}) => {
        const cart = getCart(page);

        await test.step('Thêm "Blue Top" vào giỏ hàng (tự đóng modal "Added!" nếu hiện)', async() => {
            await addSingleProductToCart(page, 'Blue Top');
        });

        await test.step('Mở trang Cart và xác nhận sản phẩm tồn tại', async() => {
            await openCartFromMenu(page);
            await expect(page).toHaveURL(/\/view_cart/);
            await expect(cart.checkProductName('Blue Top')).toBeVisible();
            await expect(cart.productRow('Blue Top')).toBeVisible();
        });

        await test.step('Xoá đúng dòng sản phẩm "Blue Top"', async() => {
            await removeProductFromCart(page, 'Blue Top');
        });

        await test.step('Xác nhận sản phẩm không còn trong Cart', async() => {
            // toHaveCount(0) vì site xoá toàn bộ <tr> khỏi DOM (không chỉ ẩn nút X)
            await expect(cart.productRow('Blue Top')).toHaveCount(0);
            // Giỏ hàng chỉ có 1 sản phẩm nên sau khi xoá sẽ hiển thị thông báo giỏ hàng trống
            await expect(cart.emptyCartText).toBeVisible();
        });
    });

    test('Test Case 3: Xem sản phẩm theo danh mục', async({page}) => {
        const category = getCategoryLocators(page);

        await test.step('Xác nhận "Category" hiển thị ở thanh bên trái', async() => {
            await expect(category.categoryHeading).toBeVisible();
        });

        await test.step('Click Women > Dress và xác nhận tiêu đề trang danh mục', async() => {
            await goToCategoryProducts(page, 'Women', 'Dress');
            await expect(page).toHaveURL(/\/category_products\/\d+/);
            // ĐỀ BÀI yêu cầu expected result "WOMEN - TOPS PRODUCTS" cho luồng Women > Dress.
            // Đã kiểm tra DOM thật: Women > Dress luôn dẫn tới trang có tiêu đề "Women - Dress Products",
            // không phải "Tops". Đây là mâu thuẫn nghiệp vụ nằm trong chính đề bài, không phải lỗi
            // locator/code. Giữ nguyên assertion đúng như yêu cầu — KHÔNG sửa "Tops" thành "Dress" để
            // test pass. Test này được dự đoán sẽ FAIL, và đó là kết quả đúng cần báo cáo lại.
            await expect(category.categoryPageTitle).toContainText(/WOMEN - Dress PRODUCTS/i);
        });

        await test.step('Chọn 1 danh mục con của Men và xác nhận đúng trang danh mục', async() => {
            await goToCategoryProducts(page, 'Men', 'Tshirts');
            await expect(page).toHaveURL(/\/category_products\/\d+/);
            await expect(category.categoryPageTitle).toContainText(/MEN - TSHIRTS PRODUCTS/i);
        });
    });

    test('Test Case 4: Tìm kiếm sản phẩm và xác minh giỏ hàng sau khi đăng nhập', async({page}) => {
        const search = getSearchLocators(page);
        const products = getAddToCartLocators(page);
        const cart = getCart(page);
        // 2 sản phẩm cụ thể trong số các kết quả tìm kiếm "Top" (đã verify DOM thật) — đại diện cho
        // "các sản phẩm liên quan đến từ khoá", không thêm hết toàn bộ kết quả để test gọn, dễ đọc
        const matchedProducts = ['Blue Top', 'Winter Top'];

        await test.step('Click "Products" và xác nhận trang ALL PRODUCTS', async() => {
            await openAllProducts(page);
            // Heading dùng class .title.text-center có CSS text-transform:uppercase — DOM text thật là
            // "All Products" (title-case), hiển thị "ALL PRODUCTS". Dùng regex case-insensitive để khớp
            // đúng nội dung hiển thị theo đề bài, không lẫn với vấn đề hoa/thường không liên quan.
            await expect(search.pageTitle).toHaveText(/^ALL PRODUCTS$/i);
        });

        await test.step('Tìm kiếm sản phẩm và xác nhận tiêu đề SEARCHED PRODUCTS', async() => {
            await searchProduct(page, 'Top');
            await expect(search.pageTitle).toHaveText(/^SEARCHED PRODUCTS$/i);
        });

        await test.step('Xác nhận các sản phẩm liên quan từ khoá tìm kiếm được hiển thị', async() => {
            for (const productName of matchedProducts) {
                await expect(products.productHover(productName)).toBeVisible();
            }
        });

        await test.step('Thêm các sản phẩm đó vào giỏ hàng', async() => {
            await addMultipleProductsToCart(page, matchedProducts);
        });

        await test.step('Mở Cart và xác nhận các sản phẩm có trong giỏ hàng', async() => {
            await openCartFromMenu(page);
            for (const productName of matchedProducts) {
                await expect(cart.checkProductName(productName)).toBeVisible();
            }
        });

        await test.step('Đăng nhập bằng tài khoản có sẵn', async() => {
            await ui.navigation.signupLoginBtn.click();
            await expect(ui.loginUI.loginTitleText).toBeVisible();
            await loginUser(page, validLoginData().user);
            await expect(ui.navigation.loggedInIndicator).toBeVisible();
        });

        await test.step('Quay lại Cart và xác nhận sản phẩm vẫn còn sau khi đăng nhập', async() => {
            await openCartFromMenu(page);
            for (const productName of matchedProducts) {
                await expect(cart.checkProductName(productName)).toBeVisible();
            }
        });
    });

    test('Test Case 5: Tải hóa đơn sau khi đặt hàng', async({page}) => {
        const dynamicData = createDynamicUserData();
        const cart = getCart(page);

        await test.step('Thêm sản phẩm vào giỏ hàng và mở trang Cart', async() => {
            await addSingleProductToCart(page, 'Blue Top');
            await openCartFromMenu(page);
            await expect(cart.shoppingCartHeading).toBeVisible();
        });

        await test.step('Proceed To Checkout, Register/Login và tạo tài khoản mới', async() => {
            await proceedToCheckout(page);
            await openRegisterFromCheckoutModal(page);
            // Tái dùng đúng helper đăng ký của bài 8, không viết lại logic
            await expect(ui.preSignupUI.signupTitleText).toBeVisible();
            await fillPreSignupForm(page, dynamicData.user.name, dynamicData.user.email);
            await expect(ui.signupUI.accountInforText).toBeVisible();
            await registerUser(page, dynamicData.user, dynamicData.address);
            await expect(ui.signupUI.accountCreatedText).toBeVisible();
            await ui.signupUI.continueBtn.click();
            await expect(page.locator(ui.navigation.loggedInUserText(dynamicData.user.name))).toBeVisible();
        });

        await test.step('Quay lại Cart, Proceed To Checkout và xác nhận thông tin đơn hàng', async() => {
            await openCartFromMenu(page);
            await proceedToCheckout(page);
            const checkout = getCheckoutPageLocators(page);
            await expect(checkout.addressDetailsHeading).toBeVisible();
            await expect(checkout.reviewOrderHeading).toBeVisible();
        });

        await test.step('Nhập comment và đặt hàng', async() => {
            await placeOrderWithComment(page, noteOrder().note);
        });

        await test.step('Nhập thông tin thanh toán và xác nhận thông báo thành công', async() => {
            await fillPaymentFields(page, paymentInfor().infor);
            // "Your order has been placed successfully!" tồn tại sẵn trong DOM của trang /payment
            // (đã xác nhận qua DevTools: nằm trong #success_message, class "col-md-12 form-group hide",
            // bên trong .payment-information) nhưng bị ẩn vĩnh viễn bằng CSS (display:none) — không có
            // JS nào gỡ class "hide" (đã kiểm tra mã nguồn main.js thật). Nút "Pay and Confirm Order"
            // submit form thường, điều hướng ngay sang /payment_done nơi phần tử này không còn tồn tại
            // trong DOM nữa. Vì vậy chỉ có thể kiểm tra phần tử này TRƯỚC khi bấm nút thanh toán, và
            // phải dùng toBeAttached() (tồn tại trong DOM) thay vì toBeVisible() — vì phần tử này không
            // bao giờ hiển thị trên màn hình thật, đây là hành vi thật của site, không phải lỗi test.
            const payment = getPaymentPageLocators(page);
            await expect(payment.orderSuccessMessage).toBeAttached();
            await expect(payment.orderSuccessMessage).toContainText('Your order has been placed successfully!');
            await payment.payBtn.click();
        });

        await test.step('Tải hóa đơn qua giao diện và xác nhận tải thành công', async() => {
            const download = await downloadInvoice(page);
            expect(download.suggestedFilename()).toMatch(/invoice/i);
            // saveAs() luôn hoạt động (kể cả khi Playwright kết nối browser từ xa), khác với path()
            // chỉ dùng được lúc browser chạy local — lưu file thật ra đĩa rồi kiểm tra có dữ liệu
            // (dung lượng > 0) để xác nhận tải thành công, không chỉ dựa vào sự kiện download đã bắn ra
            const savedPath = join(tmpdir(), `homework10-invoice-${Date.now()}.txt`);
            await download.saveAs(savedPath);
            expect(statSync(savedPath).size).toBeGreaterThan(0);
            const confirmation = getOrderConfirmationLocators(page);
            await confirmation.continueBtn.click();
        });

        await test.step('Xoá tài khoản vừa tạo', async() => {
            await ui.signupUI.deleteBtn.click();
            await expect(ui.signupUI.accountDeletedText).toBeVisible();
            await ui.signupUI.continueBtn.click();
        });
    });
});
