const { test, expect } = require("@playwright/test");

//test.describe.configure({ mode: 'parallel' });


test('@web parralar test1', async ({ page }) => {

    page.goto("https://google.com/");
   

});
test('parralar test2', async ({ page }) => {
  page.goto("https://www.flipkart.com/");
  
});

test('parralar test3', async ({ page }) => {
     page.goto("https://www.amazon.in/");
  
  
});