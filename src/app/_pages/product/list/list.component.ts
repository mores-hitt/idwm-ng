import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_interfaces/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }
}
