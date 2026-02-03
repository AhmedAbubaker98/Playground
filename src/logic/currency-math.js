function add(a, b) {
  return (parseFloat(a) + parseFloat(b)).toString();
}

function calculateTotal(subtotal, tax) {
  return (parseFloat(subtotal) + parseFloat(tax)).toString();
}

module.exports = {
  add,
  calculateTotal
};