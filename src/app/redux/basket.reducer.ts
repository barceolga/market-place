import { BasketState, BasketItem } from "../interfaces/basket.state";
import { PriceState } from "../interfaces/price.state";
import { AppState } from "../interfaces/app.state";
import {
  BasketActionTypes,
  BasketActionAdd,
  BasketActionRemove
} from "./basket.action";
import { State, createReducer, on, createSelector } from "@ngrx/store";
import { addItemToBasket, sumPrice } from "../app.component";

const initialBasketState: BasketState = {
  items: []
};

// TODO: create an interface sum with one property called sum with type Number
// TODO: add sum as independent state in appState
// TODO: create a file called sum.action.ts to define the type of action
// TODO: refactor reducer to make it work with two state values: basket and sum
const EqId = (id: string) => item => id === item.id;
const negateFn = fn => (...args) => !fn(...args);

export const normalizeBasketItems = (items: BasketItem[]) =>
  items.reduce((acc, item, index, array) => {
    const existingItemIndex = acc.findIndex(EqId(item.id));
    if (existingItemIndex !== -1) {
      acc[existingItemIndex].quantity++;
      return acc;
    }
    return [...acc, item];
  }, []);

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
