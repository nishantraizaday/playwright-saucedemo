import { test, expect } from './fixtures/authFixture.js'; 
import ProductsPage from '../pages/productsPage.js'; 
import CartPage from '../pages/cartPage.js';   
import { addItemsToCart, removeItemFromCart, emptyCart } from './helpers/cartHelper.js'; 
import { completeCheckout } from './helpers/checkoutHelper.js';
import CheckoutPage from '../pages/checkoutPage.js';

test.describe('Cart flow tests', () => {

// Remove a product from the cart dynamically
test('Remove product from cart dynamically', async ({ loggedInPage }) => {
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
  await cart.goToCart();
  await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/cart.html');
  await cart.removeProduct('Sauce Labs Bolt T-Shirt');
  const remainingItems = itemsToAdd.filter(item => item !== 'Sauce Labs Bolt T-Shirt');
  await cart.getCartItemNames().then(async (cartItemNames) => {
    console.log("Cart item names: " + cartItemNames);
    expect(cartItemNames).toEqual(remainingItems);
  });
});

// empty cart after removing all products
test('Empty cart after removing all products', async ({ loggedInPage }) => {
  // Arrange
 
  const itemsToAdd = [  
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket'
  ];

  // Act
  const cart = new CartPage(loggedInPage);
  await addItemsToCart(loggedInPage, itemsToAdd);

  // Assert
  await cart.goToCart();
  await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/cart.html');
  await cart.removeAllProducts();
  const cartItemNames = await cart.getCartItemNames();
  console.log("Cart item names: " + cartItemNames);
  expect(cartItemNames).toEqual([]);
  const badgeCount = await cart.getCartBadgeCount();
  expect(badgeCount).toBe(0);
  });
});