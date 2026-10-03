import { test, expect, Locator, Page } from '@playwright/test';

export class DashboardPage {

  products: Locator;
  productsText:Locator;
  cart:Locator;
  page: Page;

  constructor(page:Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    //this.orders = page.locator("button[routerlink*='myorders']");
  }

  async searchProductAddCart(productName:string) {
    await this.products.first().waitFor({ state: "visible" });
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    let productAdded = false;
    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent())?.trim() === productName
      ) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        productAdded = true;
        break;
      }
    }
    expect(productAdded, `Product not found: ${productName}`).toBeTruthy();
  }
  
 

  async navigateToCart() {
    await this.cart.click();
  }
}
//module.exports = { DashboardPage };