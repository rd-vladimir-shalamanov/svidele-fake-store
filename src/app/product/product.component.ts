import {Component, input, InputSignal, OnInit, Signal} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "../model/product";
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {BasketService} from "../basket/basket.service";
import {MatLine} from "@angular/material/core";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatLine
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productId: InputSignal<string> = input('')
  product: Signal<Product | undefined>;

  constructor(private productService: ProductService, private basketService: BasketService) {
    this.product = this.productService.product;
  }

  ngOnInit(): void {
    this.productService.productId.set(this.productId())
  }

  buyProduct() {
    const product = this.product()
    if (product != undefined) {
      this.basketService.addProduct(product)
    }
  }
}
