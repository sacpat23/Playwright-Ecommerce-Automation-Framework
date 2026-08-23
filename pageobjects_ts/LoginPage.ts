import { test, expect, Locator, Page } from '@playwright/test';

export class LoginPage{ 
    useName: Locator;
    password: Locator;
    signInButton: Locator;
    page: Page;

     constructor(page:Page) {

        this.page = page;
        this.useName =page.locator("#userEmail");
        this.password =page.locator("#userPassword");
        this.signInButton = page.locator("#login");
        }
    
    async validLogin(username:string, password:string) { 

        await this.useName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();   
        await this.page.waitForLoadState("networkidle");
    }

    async gotTo() { 
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    }

}

//module.exports = { LoginPage };