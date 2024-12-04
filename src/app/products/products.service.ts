import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../model/product";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  selectedCategory: WritableSignal<string | undefined> = signal(undefined);

  categories: Signal<string[]> = toSignal(
    this.httpClient.get<string[]>(environment.FAKE_STORE_API_URL + 'products/categories'), {
      initialValue: []
    }
  )

  products: Signal<Product[]> =
    toSignal(
      toObservable(this.selectedCategory)
        .pipe(
          switchMap(category => {
            const endpointUrl = category ? 'products/category/' + category : 'products';
            return this.httpClient.get<Product[]>(environment.FAKE_STORE_API_URL + endpointUrl)
          })
        ), {
        initialValue: []
      }
    )

  constructor(private httpClient: HttpClient) {
  }
}
