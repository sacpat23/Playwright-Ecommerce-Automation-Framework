//const { test, expect } = require("@playwright/test");

import { test, expect } from '@playwright/test';
import dataset from '../Utills/placeorderTestData.json';


import { LoginPage } from '../pageobjects_ts/LoginPage';
import { DashboardPage } from '../pageobjects_ts/DashboardPage';
import { CheckoutPage } from '../pageobjects_ts/CheckoutPage';
import { OrderPage } from '../pageobjects_ts/OrderPage';
import { ThankyouPage } from '../pageobjects_ts/ThankyouPage';
import { MyorderPage } from '../pageobjects_ts/MyorderPage';



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
  test.only(`@web E Commerce app flow for products order  ${data.productName}`, async ({ page }) => {
    // const poManager = new POManager(page);
    // const username = "sachin147patil@gmail.com";
    //const password = "sachin";
    //const productName = "ZARA COAT 3";

    const products = await page.locator(".card-body");

    const loginPage = new LoginPage(page);
    //const  loginPage = poManager.getLoginPage();
    await loginPage.gotTo();
    await loginPage.validLogin(data.username, data.password);

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