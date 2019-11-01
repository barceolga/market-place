import { BasketState } from '../interfaces/basket.state';
import { BasketAction, BasketActionTypes } from './basket.action';

const intialBasketState: BasketState = {
    items: []
}

export function basketActionReducer( state: BasketState = intialBasketState, action: BasketAction): BasketState {
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