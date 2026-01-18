import { test, expect } from './fixtures/authFixture.js';
import ProductsPage from '../pages/productsPage.js'; 
import CartPage from '../pages/cartPage.js';     
import { addItemsToCart, addSingleItemToCart } from './helpers/productHelper.js'; 

test.describe('Saucedemo product page tests', () => {

// Test to verify total number of products
test('total number of products', async ({ loggedInPage }) => {
  const products = new ProductsPage(loggedInPage);
 const len = await products.getTotalProducts();
  console.log("Total products: " + len);
  expect(len).toBe(6);
});

// Test to add a product to the cart dynamically
test('Add single product to cart dynamically', async ({ loggedInPage }) => {
  // Arrange

  const productName = 'Sauce Labs Backpack';

  // Act
  await addSingleItemToCart(loggedInPage, productName);

  // Assert
  const cart = new CartPage(loggedInPage);
  const count = await cart.getCartBadgeCount();
  expect(count).toBe(1);
});

// Test to add multiple products to the cart dynamically and match the names
test('Add multiple products to cart dynamically', async ({ loggedInPage }) => { 
  // Arrange
  const itemsToAdd = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket'
  ];

  // Act
  await addItemsToCart(loggedInPage, itemsToAdd);

  // Assert
  const cart = new CartPage(loggedInPage);
  const count = await cart.getCartBadgeCount();
  expect(count).toBeGreaterThan(1);
  console.log("Cart badge count: " + count);
  expect(count).toBe(itemsToAdd.length);
  });
});
