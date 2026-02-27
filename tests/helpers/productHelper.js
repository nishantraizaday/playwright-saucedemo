import ProductsPage from '../../pages/productsPage.js';

//Add all items to cart from products page
export async function addItemsToCart(page, productNames) {
  const products = new ProductsPage(page);
  await products.addProducts(productNames);
}

//Add single item to cart from products page
export async function addSingleItemToCart(page, productName) {
  const products = new ProductsPage(page);
  await products.addProduct(productName);
}