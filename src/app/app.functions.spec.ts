import { sumPrice, getTotalPrice } from "./app.component";

describe("pure helper functions", () => {
  describe("sumPrice function", () => {
    const createPriceItem = (price, quantity = 1) => ({
      id: "",
      name: "",
      price,
      quantity
    });

    it("should return zero on empty list", () =>
      expect(sumPrice([])).toEqual(0));
    it("should properly calculate sum", () => {
      expect(sumPrice([createPriceItem(1, 1), createPriceItem(2, 2)])).toEqual(
        5
      );
      expect(sumPrice([createPriceItem(1, 1), createPriceItem(2, 2)])).toEqual(
        5
      );
      expect(sumPrice([createPriceItem(1, 1)])).toEqual(1);
    });
  });
  describe("getTotalPrice function", () => {
    it("should return the same amount as sum where there is no discount", () => {
      expect(getTotalPrice(10, 0)).toEqual(10);
    });
    it("should return sum - 10% when the discount is equal to 10%", () => {
      expect(getTotalPrice(10, 10)).toEqual(9);
    });
    it("should round up to cents", () => {
      expect(getTotalPrice(0.5, 34)).toEqual(0.33);
    });
  });
});
