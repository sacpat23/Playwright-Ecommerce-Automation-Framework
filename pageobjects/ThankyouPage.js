class ThankyouPage {
  constructor(page) {
    this.page = page;
    this.thankYouMsg = page.locator(".hero-primary");
    this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
    this.myOrderLink = page.locator("button[routerlink*='myorders']");
  }

  async validateThankYouPage() {
    const thank = await this.thankYouMsg.textContent();
    console.log(thank);

    const orderId = await this.orderID.textContent();
    console.log(orderId);
  }

  async navigateToMyOrderPage() {
    await this.myOrderLink.click();
  }
  async getOrderId() {
    return (await this.orderID.textContent()).trim();
  }
}

module.exports = { ThankyouPage };



