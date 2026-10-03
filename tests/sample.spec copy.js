const { test, expect } = require("@playwright/test");
const username = process.env.ECOM_USERNAME;
const password = process.env.ECOM_PASSWORD;

test("With Browser fixture test case", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/client/#/auth/login");
  const browser_titile = await page.title();
  console.log(browser_titile);
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");
});

test("With Page fixture test case", async ({ page }) => {
  await page.goto("/client/#/auth/login");
  const page_titile = await page.title();
  console.log(page_titile);
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's");
});

test("Login Page", async ({ page }) => {
  test.skip(
    !username || !password,
    "Set ECOM_USERNAME and ECOM_PASSWORD in the project .env file.",
  );

  const productName = "ZARA COAT 3";
  const products = await page.locator(".card-body");

  await page.goto("/client/#/auth/login");
  await page.locator("#userEmail").fill(username);
  await page.locator("#userPassword").fill(password);
  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();

  console.log(await page.title());

  const titils = await page.locator(".card-body b").allTextContents();
  console.log(titils);

  const count = await products.count();
  console.log(count);

  for (let i = 0; i < count; ++i) {
    if (
      (await products.nth(i).locator("b").textContent()).trim() === productName
    ) {
      await products
        .nth(i)
        .getByRole("button", { name: "Add To Cart" })
        .click();

      break;
    }
  }

  await page.locator("[routerlink='/dashboard/cart']").click();

  // Cart Page

  await page.locator("div li").first().waitFor();

  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.getByRole("button", { name: "Checkout" }).click();
  console.log(await page.title());

  // Order Page

  await page.locator("form").waitFor();
  await page.getByPlaceholder("Select Country").click();
  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("ind", { delay: 150 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    console.log(text);
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  //await page.getByText("button", { name: "PLACE ORDER" });

  await page.locator(".action__submit").click();
  const thank = await page.locator(".hero-primary").textContent();
  console.log(thank);

  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='myorders']").click();

  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
