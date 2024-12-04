import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {BasketService} from "./basket/basket.service";
import {MatIcon} from "@angular/material/icon";
import {MatBadge} from "@angular/material/badge";
import {Basket} from "./model/basket";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, RouterLink, MatIcon, MatBadge],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'svidele-store-of-fake-products';

  basket = signal<Basket | undefined>(undefined)

  constructor(basketService: BasketService) {
    this.basket = basketService.basket
  }
}
