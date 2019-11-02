import { BasketState } from '../interfaces/basket.state';
import { BasketActionAdd, BasketActionRemove } from './basket.action';
import { State, createReducer, on } from '@ngrx/store';
import { addItemToBasket } from '../app.component'

const initialBasketState: BasketState = {
    items: []
}

// export function basketActionReducer( state: BasketState = intialBasketState, action: BasketAction): BasketState {
//     switch (action.type) {
//         case BasketActionTypes.ADD:
//             state.items.push(action.payload);
//             return {
//                 items: state.items
//             };
//         case BasketActionTypes.REMOVE:
//             const index: number = state.items.indexOf(action.payload);
//             if (index != -1) {
//                 state.items.splice(index, 1)
//             }
//             return {
//                 items: state.items
//             };
//     }
// }

export const basketActionReducer = createReducer(
    initialBasketState,
    on(BasketActionAdd, (state, action) => ({
        ...state,
        items: { ...state.items, addItemToBasket(items, item)}
    })),
    on(BasketActionRemove, (state, action) => ({
        ...state,
        items: {}
    }))
)