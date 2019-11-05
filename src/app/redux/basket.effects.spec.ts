import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";

import { BasketEffects } from "./basket.effects";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { BasketActionAdd,  } from "./basket.action";
import { SetDiscountAction } from './discount.actions'

describe("Basket effects ", () => {
  let actions$: Observable<Action>;

  it("should add extra cheese after juice", () => {
    actions$ = of(
      BasketActionAdd({
        item: { id: "4", name: "juice", price: 5 },
        quantity: 1
      })
    );

    const effects = new BasketEffects(actions$);
    effects.extraCheeseForJuce$.subscribe(newAction => {
      expect(newAction.type).toEqual("[Basket] add");
      expect(newAction.item.id).toEqual("6");
    });
  });
  it("should return 5 if the ham has been put in the basket", () => {
    actions$ = of(
        BasketActionAdd({
            item: { id: "3", name: "ham", price: 1.5 },
            quantity: 1
          }),
        SetDiscountAction({
           discount: 5
        })
      );
      const effects = new BasketEffects(actions$);
      effects.discountOnHam.subscribe(newAction => {
        expect(newAction.type).toEqual("[Discount] Set Discount");
        expect(newAction.discount).toEqual(5);
      });
  })
});
