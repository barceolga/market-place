import { BasketState, BasketItem } from "../interfaces/basket.state";
import { AppState } from "../interfaces/app.state";
import { BasketActionAdd, BasketActionRemove } from "./basket.action";
import { State, createReducer, on, createSelector } from "@ngrx/store";

export const initialBasketState: BasketState = {
  items: []
};

const EqId = (id: string) => item => id === item.id;
const negateFn = fn => (...args) => !fn(...args);

export const normalizeBasketItems = (items: BasketItem[]) =>
  items.reduce((acc, item, index, array) => {
    const existingItemIndex = acc.findIndex(EqId(item.id));
    if (existingItemIndex !== -1) {
      acc[existingItemIndex].quantity += !!item.quantity ? item.quantity : 1;
      return acc;
    }
    return [...acc, item];
  }, []);

// TODO: write test for this
export const basketActionReducer = createReducer(
  initialBasketState,
  on(BasketActionAdd, (state, action) => ({
    ...state,
    items: normalizeBasketItems([
      ...state.items,
      { ...action.item, quantity: 1 }
    ])
  })),
  on(BasketActionRemove, (state, action) => ({
    ...state,
    items: state.items.filter(negateFn(EqId(action.item.id)))
  }))
);

export const basketSelector = createSelector(
  (state: AppState) => state.basket,
  (state: BasketState) => state.items
);
