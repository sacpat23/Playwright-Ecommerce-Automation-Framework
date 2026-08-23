const { expect } = require("@playwright/test");

class MyorderPage {
  constructor(page) {
    this.page = page;

    this.waittoload = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderdetails = page.locator(".col-text");
  }

    async serachAndverifyOrder(orderId) {
      console.log("orderId =", orderId);

    // await this.waittoload.waitFor();
    // const rows = this.rowcount;

    for (let i = 0; i < (await this.rows.count()); ++i) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
    const orderIdDetails = await this.orderdetails.textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  }
  async getOrderId() {
    return await this.orderdetails.textContent();
  }
}

module.exports = { MyorderPage };