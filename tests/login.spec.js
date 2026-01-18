import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage.js';

test.describe('Saucedemo login tests', () => {

test('Valid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_user', 'invalid_password');
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
});

});