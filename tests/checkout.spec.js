import { test, expect } from './fixtures/authFixture.js'; 
import ProductsPage from '../pages/productsPage.js'; 
import CartPage from '../pages/cartPage.js';   
import { addItemsToCart, removeItemFromCart, emptyCart } from './helpers/cartHelper.js'; 
import { completeCheckout } from './helpers/checkoutHelper.js';
import { sumPrices } from './helpers/priceHelper.js';
import CheckoutPage from '../pages/checkoutPage.js';

test.describe('Checkout flow tests', () => {
 
  // Checkout with single product
  test('Successful checkout with single product', async ({ loggedInPage }) => {

    // ARRANGE
    await addItemsToCart(loggedInPage, ['Sauce Labs Backpack']);

    const user = {
      first: 'Nishant',
      last: 'Test',
      zip: '12345'
    };

    // ACT
    await completeCheckout(loggedInPage, user);

    // ASSERT
    const checkout = new CheckoutPage(loggedInPage);
    const message = await checkout.getSuccessMessage();

    expect(message).toContain('Thank you');
  });

  // Verify total price at checkout
test('Verify total price is displayed during checkout', async ({ loggedInPage }) => {

  // ARRANGE
  await addItemsToCart(loggedInPage, [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light'
  ]);

  const user = {
    first: 'Test',
    last: 'User',
    zip: '11111'
  };

  const cart = new CartPage(loggedInPage);
  const checkout = new CheckoutPage(loggedInPage);

  // ACT
  await cart.goToCart();
  await cart.startCheckout();
  await checkout.enterCheckoutInfo(user.first, user.last, user.zip);

  // ASSERT
  const totalText = await checkout.getTotalPriceText();
  const itemTotal = await checkout.getItemTotalText();

  console.log("Item total:", itemTotal);
  console.log("Total price:", totalText);

  expect(totalText).toContain('Total');
  expect(itemTotal).toContain('Item total');
});

  // Checkout should fail with missing information
test('Checkout should fail with missing information', async ({ loggedInPage }) => {

  await addItemsToCart(loggedInPage, ['Sauce Labs Backpack']);

  const cart = new CartPage(loggedInPage);
  await cart.goToCart();
  await cart.startCheckout();

  const checkout = new CheckoutPage(loggedInPage);

  // Enter incomplete info
  await checkout.enterCheckoutInfo('', '', '');

  const error = loggedInPage.locator('[data-test="error"]');

  await expect(error).toBeVisible();
});

  // Validate price calculations during checkout
test('Validate checkout price calculations', async ({ loggedInPage }) => {

  // ARRANGE
  const items = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
  ];

  const products = new ProductsPage(loggedInPage);

  // Get prices before adding to cart
  let prices = [];
  for (const item of items) {
    
    prices.push(await products.getProductPrice(item));
  }

  await addItemsToCart(loggedInPage, items);

  const expectedItemTotal = await sumPrices(prices);

  const cart = new CartPage(loggedInPage);
  const checkout = new CheckoutPage(loggedInPage);

  const user = {
    first: 'Price',
    last: 'Tester',
    zip: '99999'
  };

  // ACT
  await cart.goToCart();
  await cart.startCheckout();
  await checkout.enterCheckoutInfo(user.first, user.last, user.zip);

  // ASSERT
  const displayedItemTotal = await checkout.getItemTotalAmount();
  const tax = await checkout.getTaxAmount();
  const finalTotal = await checkout.getTotalAmount();

  console.log("Expected Item Total:", expectedItemTotal);
  console.log("Displayed Item Total:", displayedItemTotal);
  console.log("Tax:", tax);
  console.log("Final Total:", finalTotal);

  // Assertions
  expect(displayedItemTotal).toBe(expectedItemTotal);

  expect(finalTotal).toBeCloseTo(displayedItemTotal + tax, 2);
});

  // Price validation for single item checkout
  test('Price validation with single product', async ({ loggedInPage }) => {

  const items = ['Sauce Labs Backpack'];

  const products = new ProductsPage(loggedInPage);

  const price = await products.getProductPrice(items[0]);

  await addItemsToCart(loggedInPage, items);

  const cart = new CartPage(loggedInPage);
  const checkout = new CheckoutPage(loggedInPage);

  await cart.goToCart();
  await cart.startCheckout();

  await checkout.enterCheckoutInfo('A', 'B', '12345');

  const displayedTotal = await checkout.getItemTotalAmount();

  expect(displayedTotal).toBe(price);
});
});
