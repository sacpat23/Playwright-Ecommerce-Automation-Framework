import { expect, test } from '@playwright/test';
import * as process from 'node:process';
import { LoginPage } from '../page-objects/LoginPage';

const username = process.env.ECOM_USERNAME;
const password = process.env.ECOM_PASSWORD;

test('@smoke user can sign in and view products', async ({ page }) => {
  test.skip(!username || !password, 'Set ECOM_USERNAME and ECOM_PASSWORD in the project .env file.');
  if (!username || !password) return;

  const loginPage = new LoginPage(page);

  await loginPage.gotTo();
  await loginPage.validLogin(username, password);
  await expect(page.locator('.card-body').first()).toBeVisible();
});
