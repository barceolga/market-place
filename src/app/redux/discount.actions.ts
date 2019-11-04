import { createAction, props } from "@ngrx/store";

export const SetDiscountAction = createAction(
  "[Discount] Set Discount",
  props<{ discount: number }>()
);
