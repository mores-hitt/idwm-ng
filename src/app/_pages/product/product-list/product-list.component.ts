import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_interfaces/product';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.getRole() === 'Admin') {
      this.getProducts();
    }
    else {
      this.getAvailableProducts();
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        console.log(this.products);
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }

  getAvailableProducts(pageNumber: number = 1, pageSize: number = 10) {
    this.productService.getAvailableProducts(pageNumber, pageSize).subscribe({
      next: (response) => {
        this.products = response;
        console.log(this.products);
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }
}
