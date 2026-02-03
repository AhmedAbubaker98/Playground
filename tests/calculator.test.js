const { calculateTotal, calculateDiscount } = require('../src/calculator');

describe('Calculator', () => {
  test('calculateTotal should multiply price and quantity', () => {
    expect(calculateTotal(10, 5)).toBe(50);
  });

  test('calculateTotal should handle decimal values', () => {
    // Use toBeCloseTo to handle floating point precision issues
    expect(calculateTotal(12.99, 3)).toBeCloseTo(38.97);
  });

  test('calculateDiscount should calculate percentage correctly', () => {
    expect(calculateDiscount(100, 20)).toBe(20);
  });

  test('calculateDiscount should work with decimal discounts', () => {
    // Use toBeCloseTo to handle floating point precision issues
    expect(calculateDiscount(50, 15)).toBeCloseTo(7.5);
  }); 
});