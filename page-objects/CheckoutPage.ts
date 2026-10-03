import { expect, Locator, Page } from '@playwright/test';


export class CheckoutPage {
    checkout: Locator;
    page: Page;
    



    constructor(page: Page) {
        this.page = page;
        this.checkout = page.getByRole("button", { name: "Checkout" });
    }
    
   /* async verifyCart() {

    await this.waitOnPage.waitFor();
    const bool = await this.productInCart.isVisible();
    //expect(bool).toBeTruthy();
    }
    */

   async verifyCart(productName: string) {
       await expect(this.getProductLocator(productName)).toBeVisible();
    }


    async navigateToOrder() {

    await this.checkout.click();
   // console.log(page.title());

    }
    getProductLocator(productName: string) { 

        return this.page.locator("h3").filter({ hasText: productName });
    }

}

//module.exports = { CheckoutPage };






