import { SetDiscountAction } from "./discount.actions";
import { on, createReducer } from "@ngrx/store";

export type DiscountState = number;

export const initialState = 0;

export const discountReducer = createReducer(
  initialState,
  on(SetDiscountAction, (state, action) => action.discount)
);
