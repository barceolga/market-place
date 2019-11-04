import { createAction, props, Action } from '@ngrx/store';
import { Item } from '../../app/interfaces/item';
import { isNgTemplate } from '@angular/compiler';

export namespace BasketActionTypes {
    export const ADD = '[Basket] add';
    export const REMOVE = '[Basket] remove';
    export const SUM = '[Price] sum'
}

export class BasketAddAction implements Action {
    readonly type = BasketActionTypes.ADD;
    public payload: Item;

    constructor(public item: Item) {
        this.payload = item;
    }
}

export class BasketRemoveAction implements Action {
    readonly type = BasketActionTypes.REMOVE;
    public payload: Item;
    
    constructor(public item: Item){
        this.payload = item;
    }
}

export class PriceSumAction implements Action {
    readonly type = BasketActionTypes.SUM;
    public payload: Item;
    
    constructor(public items: Item[], public item: Item){
        this.payload = item;
    }
}


 export type BasketAction = BasketAddAction | BasketRemoveAction | PriceSumAction

// export const BasketActionAdd = createAction(
//     "[Basket] add",
//     props< {item: Item}> ()
// )

// export const BasketActionRemove = createAction(
//     "[Basket] remove",
//     props< {item: Item}> ()
// )