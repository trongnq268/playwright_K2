import { Page } from "@playwright/test";
import { getProductUI } from "../locators/product.locators";

export const searchByCategory = async (
  page: Page,
  mainCategory: string,
  subCategory: string,
) => {
  const productUI = getProductUI(page);
  const mainCat = productUI.categorySearchUI.mainCategory(mainCategory);
  const subCat = productUI.categorySearchUI.subCategory(mainCategory, subCategory);
  
  await mainCat.scrollIntoViewIfNeeded()
  await mainCat.isVisible({timeout: 7000}); 
  await mainCat.click();

  if(!(await subCat.isVisible())){
     await mainCat.click();
  }

  await subCat.isVisible({timeout: 5000})
  await subCat.click()
};

export const addProductsFromSearchResults = async (
  page: Page,
  keyword: string,
) => {
  const productUI = getProductUI(page);
  await productUI.productSearchBoxUI.searchTextInput.fill(keyword);
  await productUI.productSearchBoxUI.searchBtn.click();

  const resultCount =
    await productUI.productSearchBoxUI.resultProductCard.count();
  const resultCard = productUI.productSearchBoxUI.resultProductCard;
  const addCartHoverBtn = productUI.productSearchBoxUI.addHoverBtn;
  const lastResult = resultCount - 1;

  for (let i = 0; i < resultCount; i++) {
    await resultCard.nth(i).hover();
    await addCartHoverBtn.nth(i).click();

    if (i === lastResult) {
      await productUI.addedModalUI.viewCartLink.click();
    } else {
      await productUI.addedModalUI.continueBtn.click();
    }
  }
};
