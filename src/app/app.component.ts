import { Component, OnInit } from '@angular/core';
import { Item } from '../app/interfaces/item';
import { select, Store } from '@ngrx/store';
import { BasketAddAction, BasketRemoveAction} from '../app/redux/basket.action';
import { AppState } from '../app/interfaces/app.state';
import { from } from 'rxjs';

export const addItemToBasket = (items: Item[], item: Item) => {
  items.push(item)
}

export const sumPrice = (items: Item[], item: Item) => {
  return items.map(item => item.price).reduce((acc, val) => acc + val)
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  items: Item[] = [];
  item: Item;
  sum: Number;
  currentBasket: Item[] = [];
  
 //TODO: make store to accept 2 values: basket and sum. You can use combineLatest for this purpose
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
    this.store.dispatch( new BasketAddAction(item));
  }

  removeItem(item: Item) {
    this.store.dispatch(new BasketRemoveAction(item));
  }

  getSum( items: Item[]) {
    this.sum =  sumPrice(this.currentBasket, this.item)
  }

  ngOnInit() {
    this.items.push({ id: '1', name: 'milk', price: 2}, {id: '2', name: 'bread', price: 1.5}, {id: '3', name: 'ham', price: 1.5 });
  }
}
