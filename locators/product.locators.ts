import { Page } from "@playwright/test";

export const getProductUI = (page: Page) => ({
    addedModal: getAddedProductModal(page), 
    productList: getProductLocators(page), 
    productDetail: getViewProductDetailLocators(page)
})

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

export const getProductLocators = (page: Page) => {
  const productCardPosition = (index: number) =>
    page.locator(".single-products").nth(index);

  return {
    productCard: productCardPosition,
    productName: (index: number) =>
      productCardPosition(index).locator(".productinfo p"),
    productPrice: (index: number) =>
      productCardPosition(index).locator(".productinfo h2"),
    addCartHoverBtn: (index: number) =>
      productCardPosition(index).locator(".product-overlay a.add-to-cart"),
    viewProductLink: (index: number) =>
      page.getByRole("link", { name: "View Product" }).nth(index),
  };
};

export const getViewProductDetailLocators = (page: Page) => ({
  productName: page.locator(".product-information h2"),
  productPrice: page.locator(".product-information span"),
  quantityInput: page.locator("#quantity"),
  addCartBtn: page.getByRole("button", {name: "Add to cart"})
})
