import { Component, Input } from '@angular/core';
import { Product } from 'src/app/_interfaces/product';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent {
  @Input() product: Product = {} as Product;

  constructor(public authService: AuthService) {}

  deleteProduct(id: string) {
    console.log(id);
  }
}
