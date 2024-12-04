import {Component, computed, signal} from '@angular/core';
import {Basket} from "../model/basket";
import {BasketService} from "./basket.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {LineItem} from "../model/line-item";
import {MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatIcon,
    MatIconButton,
    RouterLink,
    MatFormField,
    MatInput
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {

  displayedColumns: string[] = ['name', 'price', 'quantity', 'total', 'options'];

  basket = signal<Basket>({items: []})
  lineItems = computed(() => {
    return this.basket()?.items || []
  })

  constructor(basketService: BasketService) {
    this.basket = basketService.basket
  }

  removeLineItem(lineItem: LineItem) {
    this.basket.update(basket => {
      basket.items = basket.items.filter(item => item.id !== lineItem.id)
      return {...basket}
    })
  }

  updateLineItem($event: Event, lineItem: LineItem) {
    let target = $event.target as HTMLInputElement
    let value = parseInt(target.value)
    if (value < 1) {
      this.removeLineItem(lineItem)
    } else {
      this.basket.update(basket => {
        let item = basket.items.find(item => item.id === lineItem.id)
        if (item) {
          item.quantity = value
        }
        return {...basket}
      })
    }
  }
}
