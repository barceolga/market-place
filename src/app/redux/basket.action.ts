import { Action } from '@ngrx/store';
import { Item } from '../../app/interfaces/item';

export namespace BasketActionTypes {
    export const ADD = '[Basket] add';
    export const REMOVE = '[Basket] remove';
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

export type BasketAction = BasketAddAction | BasketRemoveAction;