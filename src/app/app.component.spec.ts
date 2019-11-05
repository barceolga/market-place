import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { basketActionReducer } from "./redux/basket.reducer";
import { discountReducer } from "./redux/discount.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BasketEffects } from "./redux/basket.effects";
import { take } from "rxjs/operators";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          basket: basketActionReducer,
          discount: discountReducer
        }),
        EffectsModule.forRoot([BasketEffects])
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have empty basket on start", done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.basket$.subscribe(basket => {
      expect(basket.length).toEqual(0);
      done();
    });
  });

  it("should properly add items", done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const item = { id: "1", name: "test", price: 5 };
    app.addItem(item);
    app.basket$.subscribe(basket => {
      expect(basket.filter(i => i.id === item.id)[0]).toBeDefined();
      done();
    });
  });
  it("should properly remove items", done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const item = { id: "1", name: "test", price: 5 };
    app.addItem(item);
    app.basket$.pipe(take(1)).subscribe(basket => {
      expect(basket.length).toEqual(1);
    });

    app.removeItem(item);
    app.basket$.subscribe(basket => {
      expect(basket.length).toEqual(0);
      done();
    });
  });

  it("should return 5 if the ham is put in the basket", done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const item = { id: "3", name: "ham", price: 5 };
    app.addItem(item);
    // We expect it to be working due to `discountOnHam` effect
    app.discount$.subscribe(discount => {
      expect(discount).toEqual(5);
      done();
    });
  });
});
