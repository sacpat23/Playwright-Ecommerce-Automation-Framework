//const { test, expect } = require("@playwright/test");

import { test, expect } from '@playwright/test';
import * as process from 'node:process';
import dataset from '../Utills/placeorderTestData.json';


import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashboardPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';
import { OrderPage } from '../page-objects/OrderPage';
import { ThankyouPage } from '../page-objects/ThankyouPage';
import { MyorderPage } from '../page-objects/MyorderPage';

const username = process.env.ECOM_USERNAME;
const password = process.env.ECOM_PASSWORD;

/*const { POManager} = require("../pageobjects/POManager");
const { DashboardPage } = require("../pageobjects/DashboardPage");
const { CheckoutPage } = require("../pageobjects/CheckoutPage");
const { OrderPage } = require("../pageobjects/OrderPage");
const { ThankyouPage } = require("../pageobjects/ThankyouPage");
const { MyorderPage } = require("../pageobjects/MyorderPage");

*/

/*const { LoginPage } = require("../pageobjects/LoginPage");
const { DashboardPage } = require("../pageobjects/DashboardPage");
const { CheckoutPage } = require("../pageobjects/CheckoutPage");
const { OrderPage } = require("../pageobjects/OrderPage");
const { ThankyouPage } = require("../pageobjects/ThankyouPage");
const { MyorderPage } = require("../pageobjects/MyorderPage");*/

//const dataset = JSON.parse(JSON.stringify(require("../Utills/placeorderTestData.json")),);

for (const data of dataset) {
  test(`@regression @web E Commerce app flow for products order ${data.productName}`, async ({ page }) => {
    test.skip(!username || !password, 'Set ECOM_USERNAME and ECOM_PASSWORD in the project .env file.');
    if (!username || !password) return;

    // const poManager = new POManager(page);
    //const productName = "ZARA COAT 3";

    const products = await page.locator(".card-body");

    const loginPage = new LoginPage(page);
    //const  loginPage = poManager.getLoginPage();
    await loginPage.gotTo();
    await loginPage.validLogin(username, password);

    const dashboardPage = new DashboardPage(page);
    //const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const checkoutPage = new CheckoutPage(page);
    //const checkoutPage = poManager.getcheckoutPage();
    await checkoutPage.verifyCart(data.productName);
    // await cartPage.VerifyProductIsDisplayed(productName); not use
    await checkoutPage.navigateToOrder();

    const orderPage = new OrderPage(page);
    //const orderPage = poManager.getOrderPage();
    await orderPage.orderVerify();
    await orderPage.navigateToThankyouPage();

    const thankyouPage = new ThankyouPage(page);
    //const thankyouPage = poManager.getThankyouPage();
    await thankyouPage.validateThankYouPage();
    const orderId = await thankyouPage.getOrderId();
    console.log("Order ID:", orderId);
    await thankyouPage.navigateToMyOrderPage();

    const myorderPage = new MyorderPage(page);
    //const myorderPage = poManager.getMyorderPage();
    await myorderPage.serachAndverifyOrder(orderId);
  });
}
