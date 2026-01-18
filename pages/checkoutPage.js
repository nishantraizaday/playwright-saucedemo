export default class CheckoutPage {
    constructor(page) {
        this.page = page;

         // Step 1 – Information page
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');

    // Step 2 – Overview page
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');

    this.totalPriceLabel = page.locator('.summary_total_label');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');

    // Step 3 – Complete page
    this.completeHeader = page.locator('.complete-header');
  }

  async enterCheckoutInfo(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getTotalPriceText() {
    return await this.totalPriceLabel.textContent();
  }

  async getItemTotalText() {
    return await this.itemTotalLabel.textContent();
  }

  async getSuccessMessage() {
    return await this.completeHeader.textContent();
  }

  async getItemTotalAmount() {
  const text = await this.itemTotalLabel.textContent();
  return parseFloat(text.replace('Item total: $', ''));
}

async getTotalAmount() {
  const text = await this.totalPriceLabel.textContent();
  return parseFloat(text.replace('Total: $', ''));
}

async getTaxAmount() {
  const text = await this.page.locator('.summary_tax_label').textContent();
  return parseFloat(text.replace('Tax: $', ''));
}
}
