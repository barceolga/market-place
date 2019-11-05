import { basketActionReducer, initialBasketState } from "./basket.reducer";
import { BasketActionAdd, BasketActionRemove } from "./basket.action";
import { ExpectedConditions } from "protractor";

describe("basket reducer", () => {
  it("should set initial state", () => {
    expect(basketActionReducer(undefined, { type: "NONETYPE" })).toEqual(
      initialBasketState
    );
  });
  it("should update once adding items", () => {
    const item = { id: "3", name: "ham", price: 5 };
    const newState = basketActionReducer(
      initialBasketState,
      BasketActionAdd({ item, quantity: 1 })
    );
    expect(newState.items.length).toEqual(1);
  });

  it("should properly remove items", () => {
    const item1 = { id: "3", name: "ham", price: 5 };
    const item2 = { id: "2", name: "NOTham", price: 15 };

    const newState1 = basketActionReducer(
      initialBasketState,
      BasketActionAdd({ item: item1, quantity: 1 })
    );

    const newState2 = basketActionReducer(
      newState1,
      BasketActionAdd({ item: item2, quantity: 1 })
    );

    const newState3 = basketActionReducer(
      newState2,
      BasketActionRemove({ item: item2 })
    );

    expect(newState3.items.length).toEqual(1);
    expect(newState3.items[0].id).toEqual("3");
  });
});
