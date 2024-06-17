import { Component } from '@angular/core';
import { Product } from 'src/app/_interfaces/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent {
  product: Product = {} as Product;
}
