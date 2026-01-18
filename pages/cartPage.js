export default class CartPage {
    constructor(page) {
        this.page = page;

        // Define selectors
        this.cartProductTitleSelector = '.cart_item';
        this.removeFromCartButtonSelector = '.btn btn_secondary btn_small cart_button';
        this.cartIconSelector = page.locator('.shopping_cart_link');
        this.cartProductTitleName = '.inventory_item_name';
    }

    // Example method to navigate to the cart
    async goToCart() {
        await this.cartIconSelector.click();    
    }

    //get cart badge count
    async getCartBadgeCount() {
  const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.isVisible()){
  return Number(await badge.textContent());
    }
    return 0;
}

// Cart item list matches added products names
    async getCartItemNames() {
        return await this.page.$$eval(
        this.cartProductTitleName,
        items => items.map(item => item.textContent.trim())
        );
}

// Remove a product from the cart by visible name
    async removeProduct(productName) {
        const product = this.page.locator(`${this.cartProductTitleSelector}:has-text("${productName}")`);
        // wait for the product to be visible
       await product.waitFor({ state: 'visible' });
        // click the remove from cart button
        await product.locator('button').click();
    }

    // Remove all products from the cart
    async removeAllProducts() {
        const products = this.page.locator(this.cartProductTitleSelector);
        const count = await products.count();

    for (let i = 0; i < count; i++) {
      await products.nth(0).locator('button').click();
    }
  }

  async startCheckout() {
  await this.page.locator('#checkout').click();
}
}


