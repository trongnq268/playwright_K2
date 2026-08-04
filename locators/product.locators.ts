import { Page } from "@playwright/test";

export const getProductUI = (page: Page) => ({
  addedModalUI: getAddedProductModal(page),
  productListUI: getProductLocators(page),
  productDetailUI: getViewProductDetailLocators(page),
  categorySearchUI: getCategorySearchLocators(page),
  productSearchBoxUI: getProductSearchLocators(page),
});

export const getAddedProductModal = (page: Page) => {
  const productAddedModal = page.locator(".modal-content");
  return {
    productAddedModal: productAddedModal,
    continueBtn: productAddedModal.getByRole("button", {
      name: "Continue Shopping",
    }),
    viewCartLink: productAddedModal.getByRole("link", { name: "View Cart" }),
  };
};

export const getProductLocators = (page: Page) => ({
  productsListHeading: page.getByRole("heading", { name: "All Products" }),
  featureProductCard: (productName: string) =>
    page
      .locator(".features_items .single-products")
      .filter({ hasText: productName }),
  productName: (productName: string) =>
    page.locator(".productinfo p").filter({ hasText: productName }),
  addCartHoverBtn: (productName: string) =>
    page
      .locator(".product-overlay")
      .filter({ hasText: productName })
      .locator("a.add-to-cart"),
  viewProductLink: (productName: string) =>
    page
      .locator(".product-image-wrapper")
      .filter({ hasText: productName })
      .getByRole("link", { name: "View Product" }),
});

export const getViewProductDetailLocators = (page: Page) => ({
  productNameText: page.locator(".product-information h2"),
  productPriceText: page.locator(".product-information span"),
  quantityInput: page.locator("#quantity"),
  addCartBtn: page.locator(`//span/button/i`),
});

export const getCategorySearchLocators = (page: Page) => ({
  categoryHeading: page.getByRole("heading", { name: "Category" }),
  resultTitle: (subCategory: string) =>
    page.locator(".title.text-center").filter({ hasText: subCategory }),
  mainCategory: (mainCategory: string) =>
    // page.locator('#accordian').getByRole("link", { name: mainCategory, exact: true}),
  page.locator(`#accordian a[href="#${mainCategory}"]`),
  subCategory: (mainCategory: string, subCategory: string) =>
    page.locator(`#${mainCategory}`).getByRole("link", { name: subCategory }),
});

export const getProductSearchLocators = (page: Page) => ({
  searchResultHeading: page.getByRole("heading", { name: "Searched Products" }),
  searchTextInput: page.getByRole("textbox", { name: "Search Product" }),
  searchBtn: page.locator("#submit_search"),
  resultProductCard: page.locator(".single-products"),
  addHoverBtn: page.locator(".product-overlay").locator("a.add-to-cart"),
});
