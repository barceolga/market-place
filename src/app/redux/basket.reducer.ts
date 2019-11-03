import { BasketState } from '../interfaces/basket.state';
import { BasketAction, BasketActionTypes} from './basket.action';
import { State, createReducer, on } from '@ngrx/store';
import { addItemToBasket, sumPrice } from '../app.component'

const initialBasketState: BasketState = {
    items: []
}
//TODO: create an interface sum with one property called sum with type Number
// TODO: add sum as independent state in appState 
// TODO: create a file called sum.action.ts to define the type of action
// TODO: refactor reducer to make it work with two state values: basket and sum
export function basketActionReducer( state: BasketState = initialBasketState, action: BasketAction): BasketState {
    switch (action.type) {
        case BasketActionTypes.ADD:
            state.items.push(action.payload);
            return {
                items: state.items
            };
        case BasketActionTypes.REMOVE:
            const index: number = state.items.indexOf(action.payload);
            if (index != -1) {
                state.items.splice(index, 1)
            }
            return {
                items: state.items
            };
    }
}

// export const basketActionReducer = createReducer(
//     initialBasketState,
//     on(BasketActionAdd, (state, action) => ({
//         ...state,
//         items: { ...state.items, addItemToBasket(items, item)}
//     })),
//     on(BasketActionRemove, (state, action) => ({
//         ...state,
//         items: {}
//     }))
// )