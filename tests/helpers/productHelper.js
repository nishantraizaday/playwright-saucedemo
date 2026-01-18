import ProductsPage from '../../pages/productsPage.js';

export async function addItemsToCart(page, productNames) {
  const products = new ProductsPage(page);
  await products.addProducts(productNames);
}

export async function addSingleItemToCart(page, productName) {
  const products = new ProductsPage(page);
  await products.addProduct(productName);
}