import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, tap, filter, concat, combineLatest } from "rxjs/operators";
import { interval, pipe } from "rxjs";
import { BasketActionAdd } from "./basket.action";
import { SetDiscountAction } from "./discount.actions";

@Injectable()
export class BasketEffects {
  calculateDiscount$ = createEffect(
    () => {
      return this.actions$.pipe(
        tap(action => {
          // console.log("Action listener:", action);
        })
      );
    },
    { dispatch: false }
  );

  extraCheeseForJuce$ = createEffect(() => {
    return this.actions$.pipe(
      ofType("[Basket] add"),
      filter((action: any) => action.item.id === "4"),
      map(action =>
        BasketActionAdd({
          item: { id: "6", name: "cheese", price: 0},
          quantity: 1
        }),
      )
    );
  });

  discountOnHam = createEffect(() => {
    return this.actions$.pipe(
      ofType("[Basket] add"),
      filter((action: any) => action.item.id === "3"),
      map(action =>
        SetDiscountAction({
          discount: 5
        })
      )
    );
  });

  constructor(private actions$: Actions) {}
}
