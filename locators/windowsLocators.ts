import { Page } from "@playwright/test";

/**
 * Locators for https://the-internet.herokuapp.com/windows
 * Strictly structured following Playwright Best Practices (Semantic locators prioritized)
 */
export const getWindowsLocators = (page: Page) => ({
  // --- Tab / Window gốc (/windows) ---
  mainPage: {
    heading: page.getByRole("heading", { name: "Opening a new window" }),
    clickHereLink: page.getByRole("link", { name: "Click Here" }),
  },

  // --- Tab / Window mới được mở (/windows/new) ---
  newPage: (newPageInstance: Page) => ({
    heading: newPageInstance.getByRole("heading", { name: "New Window" }),
  }),
});
