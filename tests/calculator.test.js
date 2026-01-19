const { calculateTotal, calculateDiscount } = require('../src/calculator');

describe('Calculator', () => {
  test('calculateTotal should multiply price and quantity', () => {
    expect(calculateTotal(10, 5)).toBe(50);
  });

  test('calculateTotal should handle decimal values', () => {
    expect(calculateTotal(12.99, 3)).toBe(38.97);
  });

  test('calculateDiscount should calculate percentage correctly', () => {
    expect(calculateDiscount(100, 20)).toBe(20);
  });

  test('calculateDiscount should work with decimal discounts', () => {
    expect(calculateDiscount(50, 15)).toBe(7.5);
  }); 
});
