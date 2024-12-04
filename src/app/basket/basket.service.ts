import {effect, Injectable, signal} from '@angular/core';
import {Product} from "../model/product";
import {Basket} from "../model/basket";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket = signal<Basket>(JSON.parse(localStorage.getItem('basket') || JSON.stringify({items: []})));

  constructor() {
    effect(() => {
      localStorage.setItem('basket', JSON.stringify(this.basket()));
    });
  }

  addProduct(product: Product) {
    this.basket.update(basket => {
      let lineItem = basket.items.find(item => item.id === product.id);
      if (lineItem) {
        lineItem.quantity++;
      } else {
        basket.items.push({
          ...product,
          productId: product.id,
          quantity: 1
        });
      }
      return {...basket};
    });
  }
}
