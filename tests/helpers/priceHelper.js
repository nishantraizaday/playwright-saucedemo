export async function sumPrices(prices) {
  return prices.reduce((acc, price) => acc + price, 0);
}