import { Page } from '@playwright/test';

export const BASE_URL = 'https://automationexercise.com';

/**
 * Step 1 & 2: Launch browser and navigate to URL
 * Blocks Google Ads network requests to prevent ad overlay popups/iframes from intercepting test clicks.
 * @param page Playwright Page object
 */
export async function navigateToHomePage(page: Page): Promise<void> {
  await page.route('**/*googlesyndication*/**', route => route.abort());
  await page.route('**/*doubleclick*/**', route => route.abort());
  await page.route('**/*adservice*/**', route => route.abort());
  await page.goto(BASE_URL);
}
