import { test, expect, Locator, Page } from '@playwright/test';

export class OrderPage {

  dropDownCount: Locator;
submitButton: Locator;
dd: Locator;
typeCountry: Locator;
selectCountry: Locator;
wait: Locator;
page: Page;

  constructor(page:Page) {
      this.page = page;
      this.wait = page.locator("form");
      this.selectCountry = page.getByPlaceholder("Select Country");
      this.typeCountry = page.getByPlaceholder("Select Country");
      this.dd = page.locator(".ta-results");
      this.dropDownCount =this.dd.locator("button");
      this.submitButton= page.locator(".action__submit");
    }

    async orderVerify() {
       await this.wait.waitFor();
        await this.selectCountry.click();
        await this.typeCountry.pressSequentially("ind", { delay: 150 });

       // const dropdown =this.page.locator(".ta-results");
        await this.dd.waitFor();

       // const optionsCount = await this.dropdown.locator("button").count();
        const optionsCount = await this.dropDownCount.count();
        for (let i = 0; i < optionsCount; ++i) {
        const text = await this.dd
          .locator("button")
          .nth(i)
          .textContent();
        console.log(text);
        if (text === " India") {
        await this.dd.locator("button").nth(i).click();
        break;
        }
        }
    }
    
   async  navigateToThankyouPage() {

           await this.submitButton.click();
        }
}

//module.exports = {OrderPage};


