import { Page } from "@playwright/test";

export const getProductUI = (page: Page) => ({
  addedModalUI: getAddedProductModal(page),
  productListUI: getProductLocators(page),
  productDetailUI: getViewProductDetailLocators(page),
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
    featureProductCard: (productName: string) =>
    page.locator(".features_items .single-products").filter({ hasText: productName }),
    productName: (productName: string) =>
      page.locator(".productinfo p").filter({ hasText: productName }),
    addCartHoverBtn: (productName: string) =>
      page
        .locator(".product-overlay")
        .filter({ hasText: productName })
        .locator("a.add-to-cart"),
    viewProductLink: (productName: string) => page.locator(".product-image-wrapper")
    .filter({hasText: productName})
    .getByRole("link", { name: "View Product" }),
});

export const getViewProductDetailLocators = (page: Page) => ({
  productNameText: page.locator(".product-information h2"),
  productPriceText: page.locator(".product-information span"),
  quantityInput: page.locator("#quantity"),
  //addCartBtn: page.getByRole("button", { name: "Add to cart" }),
  addCartBtn: page.locator(`//span/button/i`)

,
});
