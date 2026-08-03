import { Page } from "@playwright/test";
import { getProductUI } from "../locators/product.locators";

export const searchByCategory = async (
  page: Page,
  mainCategory: string,
  subCategory: string,
) => {
  const productUI = getProductUI(page);
  await productUI.categorySearchUI.mainCategory(mainCategory).click({timeout: 10000});
  await productUI.categorySearchUI
    .subCategory(mainCategory, subCategory)
    .click();
};

export const addProductsFromSearchResults = async (
  page: Page,
  keyword: string,
) => {

  const productUI = getProductUI(page);
  await productUI.productSearchBoxUI.searchTextInput.fill(keyword);
  await productUI.productSearchBoxUI.searchBtn.click();
  
  const resultCount = await productUI.productSearchBoxUI.resultProductCard.count();
  const resultCard = productUI.productSearchBoxUI.resultProductCard;
  const addCartHoverBtn = productUI.productSearchBoxUI.addHoverBtn; 
  const lastResult = resultCount - 1;
  
  for (let i = 0; i < resultCount; i++) {
    await resultCard.nth(i).hover();
    await addCartHoverBtn.nth(i).click();

    if ((i === lastResult)) {
      await productUI.addedModalUI.viewCartLink.click();
    } else {
      await productUI.addedModalUI.continueBtn.click();
    }
  }
};


