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

// Locator cho khu vực "Category" ở sidebar bên trái (trang chủ, trang sản phẩm...)
export const getCategoryLocators = (page: Page) => {
  const sidebar = page.locator('.left-sidebar');
  return {
    categoryHeading: sidebar.getByRole('heading', { name: 'Category', exact: true }),
    // Toggle mở danh mục cha (Women/Men/Kids). Dùng href thay vì tên vì "Men" là substring của "Women"
    // (getByRole không exact sẽ khớp nhầm cả 2), còn exact:true lại fail vì icon font (fa-plus) chèn
    // thêm ký tự vào accessible name — đã verify DOM thật, giống hệt trường hợp cartBtn trước đây.
    categoryToggle: (parentCategory: string) => page.locator(`#accordian a[href="#${parentCategory}"]`),
    // Link danh mục con — chỉ tìm trong đúng panel cha đã mở (vd #Women), tránh trùng tên giữa các
    // panel (Women và Kids đều có danh mục con tên "Dress")
    subCategoryLink: (parentCategory: string, subCategoryName: string) =>
      page.locator(`#${parentCategory}`).getByRole('link', { name: subCategoryName }),
    // Tiêu đề trang danh mục sản phẩm (vd "Women - Dress Products") — cùng class .title.text-center
    // đã dùng ổn định cho các heading "All Products"/"Features Items" trong project
    categoryPageTitle: page.locator('h2.title.text-center'),
  };
};

// Locator ô tìm kiếm sản phẩm trên trang /products
export const getSearchLocators = (page: Page) => ({
  searchInput: page.locator('#search_product'),
  searchButton: page.locator('#submit_search'),
  // Tiêu đề trang: "ALL PRODUCTS" (mặc định) hoặc "SEARCHED PRODUCTS" (sau khi tìm kiếm) —
  // cùng class .title.text-center đã dùng ổn định ở getCategoryLocators
  pageTitle: page.locator('h2.title.text-center'),
});

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
