import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/_interfaces/product';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from 'src/app/_services/product.service';

/**
 * Represents the component for displaying a single product item.
 */
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent {
  /**
   * The product to be displayed.
   */
  @Input() product: Product = {} as Product;
  /**
   * Indicates whether the buy modal is shown or not.
   */
  showBuyModal: boolean = false;

  constructor(
    public authService: AuthService,
    private productService: ProductService
  ) {}

  /**
   * Deletes a product with the specified ID.
   * @param id - The ID of the product to be deleted.
   */
  deleteProduct(id: number) {
    console.log('Deleting product with id: ' + id);
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

  /**
   * Opens the buy modal.
   */
  openBuyModal() {
    this.showBuyModal = true;
  }

  /**
   * Closes the buy modal.
   */
  handleCloseBuyModal() {
    this.showBuyModal = false;
  }
}
