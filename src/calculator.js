function calculateTotal(price, quantity) {
  return price * quantity;
}

function calculateDiscount(price, discountPercent) {
  return price * (discountPercent / 100);
}

module.exports = {
  calculateTotal,
  calculateDiscount
};
