import { Item } from "./item";

export interface BasketItem extends Item {
  quantity: number;
}

export interface BasketState {
  items: BasketItem[];
}
