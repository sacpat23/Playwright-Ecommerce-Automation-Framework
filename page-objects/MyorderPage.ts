import { expect, Locator, Page } from '@playwright/test';

export class MyorderPage {

  orderdetails: Locator;
  rows: Locator;
  waittoload: Locator;
  page: Page;

  constructor(page:Page) {
    this.page = page;
    this.waittoload = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderdetails = page.locator(".col-text");
  }

    async serachAndverifyOrder(orderId:any) {
      console.log("orderId =", orderId);
      await this.waittoload.waitFor({ state: "visible" });

    const normalizeOrderId = (value: string) => value.replace(/[^a-z0-9]/gi, "").toLowerCase();
    const expectedOrderId = normalizeOrderId(String(orderId));
    let matchingRowFound = false;

    for (let i = 0; i < (await this.rows.count()); ++i) {
      const row = this.rows.nth(i);
      const rowOrderId = (await row.locator("th").textContent())?.trim() ?? "";
      if (normalizeOrderId(rowOrderId) === expectedOrderId) {
        await row.locator("button").first().click();
        matchingRowFound = true;
        break;
      }
    }
    expect(matchingRowFound, `Order not found: ${orderId}`).toBeTruthy();
    await expect(this.orderdetails).toBeVisible();
    const orderIdDetails = (await this.orderdetails.textContent())?.trim() ?? "";
    expect(normalizeOrderId(orderIdDetails)).toBe(expectedOrderId);
  }
  async getOrderId() {
    return await this.orderdetails.textContent();
  }
}

//module.exports = { MyorderPage };