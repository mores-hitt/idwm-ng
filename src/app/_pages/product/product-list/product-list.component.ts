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
  loading: boolean = true;
  products: Product[] = [];
  shownProducts: Product[] = [];
  totalProducts: number = 0;
  totalPages: number = 0;
  pageNum: number = 1;
  pageSize: number = 3;
  searched: boolean = false;


  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.totalProducts = 0;
    this.totalPages = 0;
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
        this.totalProducts = this.products.length;
        this.shownProducts = this.products.slice(0, this.pageSize);
        this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
        console.log(this.products);
        this.loading = false;
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }

  getAvailableProducts() {
    this.productService.getAvailableProducts(this.pageNum, this.pageSize).subscribe({
      next: (response) => {
        this.shownProducts = response;
        console.log(this.shownProducts);
        this.loading = false;

        console.log(this.pageNum);
        console.log(this.pageSize);

        this.totalProducts = 9999;
        this.totalPages = 9999;
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }

  getPreviousPage() {
    console.log(this.pageNum);
    console.log(this.pageSize);
    this.pageNum--;
    if (this.authService.getRole() === 'Admin' || this.searched){
      this.shownProducts = this.products.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize);
    } else {
      this.productService.getAvailableProducts(this.pageNum, this.pageSize).subscribe({
        next: (response) => {
          this.shownProducts = response;
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

  getNextPage() {
    console.log(this.pageNum);
    console.log(this.pageSize);
    this.pageNum++;

    if (this.authService.getRole() === 'Admin' || this.searched){
      this.shownProducts = this.products.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize);
    } else {
      this.productService.getAvailableProducts(this.pageNum, this.pageSize).subscribe({
        next: (response) => {
          this.shownProducts = response;
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


  onSearchResults(results: any) {
    this.searched = true;
    this.pageNum = 1;
    this.products = results;
    this.totalProducts = this.products.length;
    this.shownProducts = this.products.slice(0, this.pageSize);
    this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
  }
}
