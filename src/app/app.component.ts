import { Component, OnInit } from '@angular/core';
import { Item } from '../app/interfaces/item';
import { select, Store } from '@ngrx/store';
import { BasketActionAdd, BasketActionRemove} from '../app/redux/basket.action';
import { AppState } from '../app/interfaces/app.state';

export const addItemToBasket = (items: Item[], item: Item) => {
  items.push(item)
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  items: Item[] = [];
  currentBasket: Item[] = [];
  

  constructor(
    public store: Store<AppState>
  ) {
    this.store.pipe(select(state => state.basket))
    .subscribe(basket => {
      if (basket && this.items ) {
        this.currentBasket = basket.items
        //console.log("Basket ", this.currentBasket, "Items in basket ", basket.items)
      }
    });
  }

  addItem(item: Item) {
    //debugger
    this.store.dispatch(BasketActionAdd({item: item}));
  }

  removeItem(item: Item) {
    this.store.dispatch(BasketActionRemove({item: item}));
  }

  ngOnInit() {
    this.items.push({ id: '1', name: 'item1'}, {id: '2', name: 'item2'}, {id: '3', name: 'item3'});

  }
}
