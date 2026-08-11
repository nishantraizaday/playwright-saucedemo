import { test as base, expect } from '@playwright/test';
import LoginPage from '../../pages/loginPage.js';

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');

    // Ensure login succeeded
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // hand over the logged-in page to the test
    await use(page);
  }
});

export { expect };