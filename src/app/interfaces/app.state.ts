import { BasketState } from './basket.state';
import { PriceState } from './price.state';

export interface AppState {
    basket: BasketState;
    price: PriceState,
    discount: number
}