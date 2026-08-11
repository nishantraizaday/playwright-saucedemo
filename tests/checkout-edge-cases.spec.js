import { test, expect } from './fixtures/authFixture.js';
import CartPage from '../pages/cartPage.js';
import CheckoutPage from '../pages/checkoutPage.js';
import { addItemsToCart } from './helpers/cartHelper.js';
import { checkoutEdgeCases } from '../data/checkout-edge-cases.js';

test.describe('Checkout - customer info edge cases', () => {
  for (const testCase of checkoutEdgeCases) {
    test(`${testCase.id}: ${testCase.description}`, async ({ loggedInPage }) => {
      // ARRANGE
      await addItemsToCart(loggedInPage, ['Sauce Labs Backpack']);

      const cart = new CartPage(loggedInPage);
      const checkout = new CheckoutPage(loggedInPage);

      await cart.goToCart();
      await cart.startCheckout();

      // ACT
      await checkout.enterCheckoutInfo(
        testCase.firstName,
        testCase.lastName,
        testCase.postalCode
      );

      // ASSERT
      if (testCase.expectedOutcome === 'blocked') {
        const error = loggedInPage.locator('[data-test="error"]');
        await expect(error).toBeVisible();
      } else {
        const itemTotal = await checkout.getItemTotalAmount();
        const tax = await checkout.getTaxAmount();
        const finalTotal = await checkout.getTotalAmount();

        expect(finalTotal).toBeCloseTo(itemTotal + tax, 2);
      }
    });
  }
});