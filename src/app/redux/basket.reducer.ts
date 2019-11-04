import { BasketState } from '../interfaces/basket.state';
import { PriceState } from '../interfaces/price.state'
import { AppState } from '../interfaces/app.state';
import { BasketAction, BasketActionTypes} from './basket.action';
import { State, createReducer, on } from '@ngrx/store';
import { addItemToBasket, sumPrice } from '../app.component'

const initialBasketState: BasketState = {
    items: []
}

const initialPriceState: PriceState = {
    price: 0
}
const initialState: AppState = {
    basket: initialBasketState,
    price: initialPriceState
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
                ...state,
                items: state.items
            };
        case BasketActionTypes.REMOVE:
            const index: number = state.items.indexOf(action.payload);
            if (index != -1) {
                state.items.splice(index, 1)
            }
            return {
                ...state,
                items: state.items
            };
        // case BasketActionTypes.SUM:
        //     this.sum =  sumPrice(state.basket.items, action.payload)
        //     return {
        //         ...state,
        //         price:  sum
        //     }
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