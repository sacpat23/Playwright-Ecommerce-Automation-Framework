import { test, expect, Locator, Page } from '@playwright/test';


export class CheckoutPage {
    productInCart: Locator;
    checkout: Locator;
    waitOnPage: Locator;
    page: Page;
    



    constructor(page:any) {
        this.page = page;
        this.productInCart = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkout = page.getByRole("button", { name: "Checkout" });
        this.waitOnPage = page.locator("div li").first();
    }
    
   /* async verifyCart() {

    await this.waitOnPage.waitFor();
    const bool = await this.productInCart.isVisible();
    //expect(bool).toBeTruthy();
    }
    */

   async verifyCart(productName: string) {

       await this.waitOnPage.waitFor();
       const bool = await this.getProductLocator(productName).isVisible();
    //const bool = await this.productInCart.isVisible();  not not in use
    //expect(bool).toBeTruthy();
    }


    async navigateToOrder() {

    await this.checkout.click();
   // console.log(page.title());

    }
    getProductLocator(productName: string) { 

        return this.page.locator("h3:has-text('"+productName+"')");
    }

}

//module.exports = { CheckoutPage };






