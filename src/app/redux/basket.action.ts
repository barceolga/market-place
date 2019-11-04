import { createAction, props, Action } from "@ngrx/store";
import { Item } from "../../app/interfaces/item";
import { isNgTemplate } from "@angular/compiler";



export const BasketActionAdd = createAction(
  "[Basket] add",
  props<{ item: Item; quantity: Number }>()
);

export const BasketActionRemove = createAction(
  "[Basket] remove",
  props<{ item: Item }>()
);
