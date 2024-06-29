import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/_interfaces/product';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent {
  @Input() product: Product = {} as Product;
  showBuyModal: boolean = false;

  constructor(public authService: AuthService, private productService: ProductService) {}

  deleteProduct(id: number) {
    console.log('Deleting product with id: ' + id)
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log(response);
        console.log('Product deleted');
        window.location.reload();
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
        console.log(result);
      },
    });
  }

  openBuyModal(){
    this.showBuyModal = true;
  }

  handleCloseBuyModal(){
    this.showBuyModal = false;
  }
}
