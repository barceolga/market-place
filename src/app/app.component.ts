import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, BehaviorSubject } from "rxjs";
import { map, filter } from "rxjs/operators";

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
  if (discount > 0) {
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
  sum$: Observable<Number>;
  sumSubject$: BehaviorSubject<Number>;
  quantity: Number = 0;
  quantity$: Observable<Number>;
  discount: Number;
  discount$: Observable<Number>;
  discountSubject$: BehaviorSubject<Number>;
  finalPrice: Number;
  finalPrice$: Observable<Number>;
  basket$: Observable<BasketItem[]>;
  currentBasket: Item[] = [];
  currentBasket$: Observable<BasketItem[]>
  freeCheese: boolean = false
  freeCheeseArrS: Observable<BasketItem[]>;
  //discounts$;

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
    this.discount$ = this.store.pipe(select(state => state.discount));
    //  this.basket$.pipe(map(basket => {
    //   console.log(basket);
    //   this.currentBasket = basket;
    //   console.log(this.currentBasket);
    // }));

    this.sum$ = this.basket$.pipe(map(sumPrice));

    // This is still not working as it should, need figure out what's missing here
    this.finalPrice$ = combineLatest(this.basket$, this.discount$).pipe(
      map(basketDiscountData => {
        const basket = basketDiscountData[0];
        const discount = basketDiscountData[1];
        return getTotalPrice(sumPrice(basket), discount);
      })
    );

    //console.log(this.finalPrice$)
    this.basket$.subscribe(value => (
      this.currentBasket = value
        )
      );


  }

  addItem(item: Item) {
    this.store.dispatch(BasketActionAdd({ item, quantity: 1 }));
    this.gotExtraCheese()
  }

  removeItem(item: Item) {
    this.store.dispatch(BasketActionRemove({ item }));
  }
 // This is also not working
  gotExtraCheese() {
    const extraCheese = {id: "6", name: "cheese", price: 0, quantity: 1}
    if (this.currentBasket.includes(extraCheese)) {
      //console.log(this.currentBasket.includes(extraCheese))
      this.freeCheese =true;
    }
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
