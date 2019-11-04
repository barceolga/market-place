import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BasketEffects } from "./redux/basket.effects";
import { basketActionReducer } from "../app/redux/basket.reducer";
import { discountReducer } from "./redux/discount.reducer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      basket: basketActionReducer,
      discount: discountReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    }),
    AppRoutingModule,
    EffectsModule.forRoot([BasketEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
