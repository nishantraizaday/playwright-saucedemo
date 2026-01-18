import CartPage from '../../pages/cartPage.js';
import CheckoutPage from '../../pages/checkoutPage.js';

export async function completeCheckout(page, userInfo) {
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

   // Go to cart
  await cart.goToCart();

  // Start checkout
  await cart.startCheckout();

  // Enter user information
  await checkout.enterCheckoutInfo(
    userInfo.first,
    userInfo.last,
    userInfo.zip
  );

  // Finish order
  await checkout.finishCheckout();
}