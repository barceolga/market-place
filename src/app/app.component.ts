import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import {
  BasketActionAdd,
  BasketActionRemove
} from "../app/redux/basket.action";
import { Item } from "../app/interfaces/item";
import { AppState } from "../app/interfaces/app.state";
import { basketSelector } from "./redux/basket.reducer";
import { BasketItem } from "./interfaces/basket.state";

export const addItemToBasket = (items: Item[], item: Item) => {
  items.push(item);
};

export const sumPrice = (items: BasketItem[]) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const getTotalPrice = (sum, discount) => {
  let total = 0;
  if ( discount > 0) {
    total =
      Math.round(
        (Math.abs(sum) - (Math.abs(discount) / 100) * Math.abs(sum)) * 100
      ) / 100;
  } else {
    total = sum;
  }
  return total;
};
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit {
  items: Item[] = [];
  item: Item;
  sum: Number;
  quantity: Number = 0;
  discount: Number;
  discount$: Observable<Number>;
  finalPrice: Number;

  quantity$: Observable<Number>;
  sum$: Observable<Number>;
  finalPrice$: Observable<Number>;
  basket$: Observable<BasketItem[]>;
  //discounts$;

  currentBasket: Item[] = [];
  currentPrice: Number = 0;
  subscription: any;

  // TODO: make store to accept 2 values: basket and sum. You can use combineLatest for this purpose
  // TODO: Implement quantity for each item
  //       1. Change types
  //       2. Implement new actions (UpdateItemsQty) ItemsQty !== 0
  //       3. Implement new reducer action
  // TODO: Implement fairly complicated discount system
  //        1. Discount amount
  //        2. Rules for calculating discount amount
  // Rules:
  // 1. You have 10% discount on milk once you have also butter in your basket
  // 2. Every 2nd milk is for free
  // Yourself

  // 4. You'll have additional 5% discount on everything once you put ham into the basket
  // 5. Once you have orange juice you'll have addition promo
  //    cheese being put in your basket
  // ^^^^^^^^^^^
  // Effects$$$

  constructor(public store: Store<AppState>) {
    this.basket$ = this.store.pipe(select(basketSelector));
    this.basket$.subscribe(value => (this.currentBasket = value));
    this.discount$ = this.store.pipe(select(state => state.discount));
    //this.discount$ = this.basket$.pipe(map(calculateDiscount));
    //this.quantity$ = this.basket$.subscribe(value => (this.quantity =  value.quantity));
    this.sum$ = this.basket$.pipe(map(sumPrice));
    //  TODO: get the value of the sum in order to calculate the final price
    // Maybe using effects will work here

    // BehaviourSubject for this.sum$ and this.discount$
    this.sum$.subscribe(value => (this.sum = value));
    this.discount$.subscribe(value => (this.discount = value));
    
    console.log("Sum & discount ", this.sum, this.discount);
  }

  addItem(item: Item) {
    this.store.dispatch(BasketActionAdd({ item, quantity: 1 }));
  }

  removeItem(item: Item) {
    this.store.dispatch(BasketActionRemove({ item }));
  }

  ngOnInit() {
    this.items.push(
      { id: "1", name: "milk", price: 2 },
      { id: "2", name: "bread", price: 1.5 },
      { id: "3", name: "ham", price: 1.5 },
      { id: "4", name: "orange juice", price: 1.25 },
      { id: "5", name: "butter", price: 1.5 },
      { id: "6", name: "cheese", price: 2.75 }
    );
  }
   
}
