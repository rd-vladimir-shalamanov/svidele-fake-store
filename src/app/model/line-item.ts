import {Product} from "./product";

export interface LineItem extends Product{
  productId: number;
  quantity: number;
}
