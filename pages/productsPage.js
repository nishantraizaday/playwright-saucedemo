export default class ProductsPage {
    constructor(page) {
        this.page = page;

        // Define selectors
        this.productTitleSelector = '.inventory_item';
        this.addToCartButtonSelector = '.btn btn_primary btn_small btn_inventory';
        this.cartIconSelector = page.locator('.shopping_cart_link');
    }

    // Example method to get product titles
    async getProductTitles() {
        return await this.page.$$eval(this.productTitleSelector, elements =>
            elements.map(element => element.textContent.trim())
        );
    }

    // add a product to the cart by visible name
    async addProduct(productName) {
        const product = this.page.locator(`${this.productTitleSelector}:has-text("${productName}")`);
        // wait for the product to be visible
        await product.waitFor([{ state: 'visible' }]);
        // click the add to cart button
        await product.locator('button').click();
    }

    // add multiple products to the cart by visible names
    async addProducts(productNames) {
        for (const name of productNames) {
            await this.addProduct(name);
        }
    }

    // get the total number of products displayed
    async getTotalProducts() {
        const products = await this.page.$$(this.productTitleSelector);
        return products.length;
    }

    async getProductPrice(productName) {
  const product = this.page.locator(`.inventory_item:has-text("${productName}")`
  );

  const priceText = await product.locator('.inventory_item_price').textContent();

  return parseFloat(priceText.replace('$', ''));
}

}

