import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.getByText('firefox').click();
  await page.getByRole('link', { name: 'GitHub repository' })

  
});
