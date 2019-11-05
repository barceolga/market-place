import { sumPrice, getTotalPrice } from "./app.component";
import { normalizeBasketItems } from "./redux/basket.reducer";

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
  describe("normalizeBasketItems function", () => {
    const createBasketItems = [
      {
        id: "1",
        name: "milk",
        price: 2,
        quantity: 1
      },
      {
        id: "1",
        name: "milk",
        price: 2,
        quantity: 2
      },
      {
        id: "2",
        name: "cheese",
        price: 2.5,
        quantity: 1
      }
    ];
    const expectedBasketItems = [
      {
        id: "1",
        name: "milk",
        price: 2,
        quantity: 3
      },
      {
        id: "2",
        name: "cheese",
        price: 2.5,
        quantity: 1
      }
    ];

    it("should return 1 if the item of certain type has been added for 1st time to basket", () => {
      expect(normalizeBasketItems(createBasketItems)).toEqual(
        expectedBasketItems
      );
    });
  });
});
