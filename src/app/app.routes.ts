import {Routes} from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductComponent} from "./product/product.component";
import {BasketComponent} from "./basket/basket.component";

export const routes: Routes = [
  {path: "products", component: ProductsComponent},
  {path: 'products/:productId', component: ProductComponent},
  {path: 'basket', component: BasketComponent},
  {path: "**", component: ProductsComponent}
];
