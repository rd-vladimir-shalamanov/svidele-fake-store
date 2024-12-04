import {Component, computed, signal, Signal, WritableSignal} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {Product} from "../model/product";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ProductsService} from "./products.service";
import {
  MatListItem,
  MatListItemAvatar,
  MatListItemLine,
  MatListItemTitle,
  MatListOption,
  MatNavList,
  MatSelectionList,
  MatSelectionListChange
} from "@angular/material/list";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatSelectionList,
    MatListOption,
    MatListItem,
    MatListItemAvatar,
    MatListItemTitle,
    MatListItemLine,
    MatNavList,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  selectedCategory: WritableSignal<string | undefined>;
  categories: Signal<string[]>;
  products: Signal<Product[]>;

  searchMask: WritableSignal<string> = signal('');
  sortBy: WritableSignal<string> = signal('');
  productsByCriteria = computed(() => {

    const searchMask = this.searchMask();
    const sortBy = this.sortBy();

    let products = this.products();

    if (sortBy == 'price') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy == 'category') {
      products.sort((a, b) => a.category.localeCompare(b.category));
    } else {
      products.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (searchMask) {
      return products.filter(product => product.title.toLowerCase().includes(searchMask.toLowerCase())
        || product.description.toLowerCase().includes(searchMask.toLowerCase()))
    }
    return products;
  });

  constructor(productService: ProductsService) {
    this.selectedCategory = productService.selectedCategory;
    this.categories = productService.categories;
    this.products = productService.products
  }

  onCategoryChange($event: MatSelectionListChange) {
    this.selectedCategory.set($event.options[0].value);
  }

  onSortingOrderChange($event: MatSelectChange) {
    this.sortBy.set($event.value);
  }

  onSearchInput($event: Event) {
    this.searchMask.set(($event.target as HTMLInputElement).value);
  }

  reset() {
    this.searchMask.set('');
    this.sortBy.set('')
  }
}
