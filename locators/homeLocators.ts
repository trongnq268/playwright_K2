import { Page } from "@playwright/test";

/**
 * HomePage Locators for https://automationexercise.com/
 * Strictly structured following Playwright Best Practices (Semantic locators prioritized)
 */
export const getHomePageLocators = (page: Page) => ({
  // --- Header & Navigation ---
  header: {
    logo: page.getByRole("link", { name: "Website for automation practice" }),
    homeBtn: page.getByRole("link", { name: "Home" }),
    productsBtn: page.getByRole("link", { name: "Products" }),
    cartBtn: page.getByRole("link", { name: "Cart" }),
    signupLoginBtn: page.getByRole("link", { name: "Signup / Login" }),
    logoutBtn: page.getByRole("link", { name: "Logout" }),
    deleteAccountBtn: page.getByRole("link", { name: "Delete Account" }),
    testCasesBtn: page.getByRole("link", { name: "Test Cases", exact: true }),
    apiTestingBtn: page.getByRole("link", { name: "API Testing" }),
    videoTutorialsBtn: page.getByRole("link", { name: "Video Tutorials" }),
    contactUsBtn: page.getByRole("link", { name: "Contact us" }),
    loggedInUserText: (username: string) =>
      page.getByText(`Logged in as ${username}`),
  },

  // --- Hero Slider / Carousel ---
  heroSlider: {
    carousel: page.locator("#slider-carousel"),
    title: page.getByRole("heading", { name: "AutomationExercise", exact: true }),
    subtitle: page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    }),
    testCasesBtn: page
      .locator("#slider-carousel")
      .getByRole("link", { name: "Test Cases" }),
    apiListBtn: page
      .locator("#slider-carousel")
      .getByRole("link", { name: "APIs list for practice" }),
    prevControl: page.locator("#slider-carousel").locator('a[data-slide="prev"]'),
    nextControl: page.locator("#slider-carousel").locator('a[data-slide="next"]'),
  },

  // --- Sidebar: Categories ---
  categories: {
    heading: page.getByRole("heading", { name: "Category" }),
    womenCategory: page.getByRole("link", { name: "Women" }),
    womenSubcategories: {
      dress: page.locator("#Women").getByRole("link", { name: "Dress" }),
      tops: page.locator("#Women").getByRole("link", { name: "Tops" }),
      saree: page.locator("#Women").getByRole("link", { name: "Saree" }),
    },
    menCategory: page.getByRole("link", { name: "Men" }),
    menSubcategories: {
      tshirts: page.locator("#Men").getByRole("link", { name: "Tshirts" }),
      jeans: page.locator("#Men").getByRole("link", { name: "Jeans" }),
    },
    kidsCategory: page.getByRole("link", { name: "Kids" }),
    kidsSubcategories: {
      dress: page.locator("#Kids").getByRole("link", { name: "Dress" }),
      topsAndShirts: page.locator("#Kids").getByRole("link", { name: "Tops & Shirts" }),
    },
  },

  // --- Sidebar: Brands ---
  brands: {
    heading: page.getByRole("heading", { name: "Brands" }),
    brandLink: (brandName: string) =>
      page
        .locator(".brands-name")
        .getByRole("link", { name: new RegExp(brandName, "i") }),
    polo: page.locator(".brands-name").getByRole("link", { name: /Polo/i }),
    hm: page.locator(".brands-name").getByRole("link", { name: /H&M/i }),
    madame: page.locator(".brands-name").getByRole("link", { name: /Madame/i }),
    mastAndHarbour: page
      .locator(".brands-name")
      .getByRole("link", { name: /Mast & Harbour/i }),
    babyhug: page.locator(".brands-name").getByRole("link", { name: /Babyhug/i }),
    allenSolly: page
      .locator(".brands-name")
      .getByRole("link", { name: /Allen Solly Junior/i }),
    kookieKids: page
      .locator(".brands-name")
      .getByRole("link", { name: /Kookie Kids/i }),
    biba: page.locator(".brands-name").getByRole("link", { name: /Biba/i }),
  },

  // --- Main Content: Features Items ---
  featuresItems: {
    heading: page.getByRole("heading", { name: "Features Items" }),
    productCards: page.locator(".features_items .product-image-wrapper"),
    productCardByName: (productName: string) =>
      page
        .locator(".features_items .product-image-wrapper")
        .filter({ hasText: productName }),
    productPriceByName: (productName: string) =>
      page
        .locator(".features_items .product-image-wrapper")
        .filter({ hasText: productName })
        .locator(".productinfo h2"),
    addToCartBtnByName: (productName: string) =>
      page
        .locator(".features_items .product-image-wrapper")
        .filter({ hasText: productName })
        .locator(".productinfo")
        .getByText("Add to cart"),
    viewProductBtnByName: (productName: string) =>
      page
        .locator(".features_items .product-image-wrapper")
        .filter({ hasText: productName })
        .getByRole("link", { name: "View Product" }),
    viewProductByIdBtn: (productId: number | string) =>
      page.locator(`a[href="/product_details/${productId}"]`),
  },

  // --- Recommended Items Carousel ---
  recommendedItems: {
    heading: page.getByRole("heading", { name: "recommended items" }),
    carousel: page.locator("#recommended-item-carousel"),
    activeItemCards: page.locator(
      "#recommended-item-carousel .item.active .product-image-wrapper"
    ),
    addToCartBtnByName: (productName: string) =>
      page
        .locator("#recommended-item-carousel")
        .locator(".productinfo")
        .filter({ hasText: productName })
        .getByText("Add to cart"),
    prevControl: page
      .locator("#recommended-item-carousel")
      .locator('a[data-slide="prev"]'),
    nextControl: page
      .locator("#recommended-item-carousel")
      .locator('a[data-slide="next"]'),
  },

  // --- Footer ---
  footer: {
    subscriptionHeading: page.getByRole("heading", { name: "Subscription" }),
    emailInput: page.getByPlaceholder("Your email address"),
    subscribeBtn: page.locator("#subscribe"),
    successMsg: page.getByText("You have been successfully subscribed!"),
    scrollUpBtn: page.locator("#scrollUp"),
  },
});
