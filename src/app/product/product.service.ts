import {effect, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {environment} from "../../environments/environment";
import {Product} from "../model/product";
import {EMPTY, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productId: WritableSignal<string> = signal('');
  product: Signal<Product | undefined> =
    toSignal(
      toObservable(this.productId)
        .pipe(
          switchMap(productId => {
            if (!productId.length) {
              return EMPTY;
            }
            return this.httpClient.get<Product>(environment.FAKE_STORE_API_URL + 'products/' + productId)
          })
        )
    )

  constructor(private httpClient: HttpClient) {
  }
}
