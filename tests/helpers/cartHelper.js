import ProductsPage from '../../pages/productsPage.js';
import CartPage from '../../pages/cartPage.js';

// Adds items to cart from products page
export async function addItemsToCart(page, items) {
  const products = new ProductsPage(page);
  await products.addProducts(items);
}

// Remove a product from the cart by name
export async function removeItemFromCart(page, productName) {
  const cart = new CartPage(page);
  await cart.goToCart();
  await cart.removeProduct(productName);
}

// Empty the cart completely
export async function emptyCart(page) {
  const cart = new CartPage(page);
  await cart.goToCart();
  await cart.removeAllProducts();
}