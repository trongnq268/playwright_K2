import { test, expect } from '@playwright/test';
import { navigateToHomePage } from '../helpers/navigation.helper';
import { HomeLocators } from '../locators/home.locator';
import { CategoryLocators } from '../locators/category.locator';

test.describe('Test Case 3: View Category Products', () => {
  test('View category products successfully', async ({ page }) => {
    const homeLocators = new HomeLocators(page);
    const categoryLocators = new CategoryLocators(page);

    // Step 1 & 2: Launch browser and navigate to URL
    await navigateToHomePage(page);

    // Step 3: Verify categories are visible on left sidebar
    await expect(homeLocators.homeBanner).toBeVisible();
    await expect(categoryLocators.categorySidebarHeader).toBeVisible();

    // Step 4: Click on 'Women' category
    await categoryLocators.openWomenCategory();

    // Step 5: Click on any category link under 'Women' category, for example: Dress
    await categoryLocators.womenDressSubCategoryLink.click({ force: true });

    // Step 6: Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
    await expect(categoryLocators.categoryTitleHeader).toBeVisible();
    await expect(categoryLocators.categoryTitleHeader).toHaveText(/WOMEN - DRESS PRODUCTS/i);

    // Step 7: On left sidebar, click on any sub-category link of 'Men' category
    await categoryLocators.openMenCategory();
    await categoryLocators.menTshirtsSubCategoryLink.click({ force: true });

    // Step 8: Verify that user is navigated to that category page
    await expect(categoryLocators.categoryTitleHeader).toBeVisible();
    await expect(categoryLocators.categoryTitleHeader).toHaveText(/MEN - TSHIRTS PRODUCTS/i);
  });
});
