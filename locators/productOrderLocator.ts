import { Page } from "@playwright/test";

export const getProductUI = (page: Page) => ({
  productLocators: getAddToCartLocators(page),
  productCart: getCart(page),
});

export const getAdLocators = (page: Page) => {
  const adFrameSelector = 'iframe[title="Advertisement"][src*="zrt_lookup"]:visible';
  const adFrame = page.frameLocator(adFrameSelector).last();
  return {
    // Locator của iframe ngoài trang chính
    adIframe: page.locator(adFrameSelector).last(),
    // Text đóng/tiếp tục nằm bên trong iframe
    adCloseBtn: adFrame.locator('.continue-prompt-text'),
  };
};

export const getAddToCartLocators = (page: Page) => ({
  productBtn: page.locator('a[href="/products"]'),
  productHover: (productName: string) => page.locator(".features_items .product-image-wrapper").filter({ hasText: productName }),
  productOverlay: (productName: string) => page.locator(".features_items .product-image-wrapper").filter({ hasText: productName }).locator(".product-overlay"),
  addToCartBtn: (productName: string) => page.locator(".features_items .product-image-wrapper").filter({ hasText: productName }).locator(".product-overlay .add-to-cart"),
  // Link "View Product" nằm trong cùng .product-image-wrapper của sản phẩm (thẻ .choose), nên filter theo tên sản phẩm là đủ để scope đúng, không cần .first()/.nth()
  viewProductBtn: (productName: string) => page.locator(".features_items .product-image-wrapper").filter({ hasText: productName }).getByRole('link', { name: 'View Product' }),
  addedModal: page.locator('#cartModal'),
  continueShoppingBtn: page.locator('#cartModal .modal-content').getByRole('button', { name: 'Continue Shopping', exact: true},),
  viewCartBtn: page.locator('#cartModal .modal-content').getByRole("link", {name: "View Cart", exact: true}),
});

// Locator trên trang chi tiết sản phẩm (/product_details/<id>)
export const getProductDetailLocators = (page: Page) => {
  // Scope trong .product-information để tránh trùng với các sản phẩm "You might also like" ở cuối trang
  const info = page.locator('.product-information');
  return {
    productNameHeading: info.getByRole('heading', { level: 2 }),
    quantityInput: page.locator('#quantity'),
    addToCartBtn: info.getByRole('button', { name: 'Add to cart' }),
  };
};

export const getCart = (page: Page) => {
  // Dòng (tr) chứa đúng sản phẩm để tìm các ô còn lại
  const getRow = (productName: string) => page.locator('tbody tr').filter({ hasText: productName });

  return {
    shoppingCartHeading: page.getByText('Shopping Cart', { exact: true }),
    //  tên sản phẩm trong cart
    checkProductName: (productName: string) => getRow(productName).locator('.cart_description'),
    // Giá sản phẩm trong cart
    priceText: (productName: string) => getRow(productName).locator('.cart_price'),
    // Số lượng sản phẩm trong cart
    quantityText: (productName: string) => getRow(productName).locator('.cart_quantity').getByRole('button'),
    // Tổng tiền sản phẩm trong cart
    totalText: (productName: string) => getRow(productName).locator('.cart_total'),
    // Cả dòng (tr) của sản phẩm — dùng để assert dòng còn/mất khi thêm, xoá
    productRow: getRow,
    // Nút "X" xoá sản phẩm, chỉ lấy trong đúng dòng của sản phẩm đó
    deleteBtn: (productName: string) => getRow(productName).locator('.cart_quantity_delete'),
    // Thông báo hiển thị khi giỏ hàng không còn sản phẩm nào
    emptyCartText: page.getByText('Cart is empty!'),
    // Nút "Proceed To Checkout" — thực tế là <a> không có href nên không có role "link", phải dùng getByText
    proceedToCheckoutBtn: page.getByText('Proceed To Checkout', { exact: true }),
  };
};
