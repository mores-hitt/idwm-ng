import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_interfaces/product';
import { AuthService } from 'src/app/_services/auth.service';

/**
 * Represents the component for displaying a list of products.
 */
@Component({
  selector: 'app-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent {
  loading: boolean = true; // Indicates whether the products are being loaded
  products: Product[] = []; // The list of products
  shownProducts: Product[] = []; // The subset of products to be shown on the current page
  totalProducts: number = 0; // The total number of products
  totalPages: number = 0; // The total number of pages
  pageNum: number = 1; // The current page number
  pageSize: number = 3; // The number of products to be shown per page
  searched: boolean = false; // Indicates whether a search has been performed

  /**
   * Constructs a new instance of the ProductListComponent.
   * @param productService The service for retrieving products
   * @param authService The service for authentication
   */
  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.totalProducts = 0;
    this.totalPages = 0;
    if (this.authService.getRole() === 'Admin') {
      this.getProducts();
    } else {
      this.getAvailableProducts();
    }
  }

  /**
   * Retrieves all products.
   */
  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.totalProducts = this.products.length;
        this.shownProducts = this.products.slice(0, this.pageSize);
        this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
        this.loading = false;
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          console.log(result.error);
        }
      },
    });
  }

  /**
   * Retrieves available products based on the current page and page size.
   */
  getAvailableProducts() {
    this.productService
      .getAvailableProducts(this.pageNum, this.pageSize)
      .subscribe({
        next: (response) => {
          this.shownProducts = response;
          this.loading = false;
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

  /**
   * Retrieves the previous page of products.
   */
  getPreviousPage() {
    this.pageNum--;
    if (this.authService.getRole() === 'Admin' || this.searched) {
      this.shownProducts = this.products.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    } else {
      this.productService
        .getAvailableProducts(this.pageNum, this.pageSize)
        .subscribe({
          next: (response) => {
            this.shownProducts = response;
          },
          error: (result) => {
            if (typeof result.error === 'string') {
              console.log(result.error);
            }
          },
        });
    }
  }

  /**
   * Retrieves the next page of products.
   */
  getNextPage() {
    this.pageNum++;
    if (this.authService.getRole() === 'Admin' || this.searched) {
      this.shownProducts = this.products.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    } else {
      this.productService
        .getAvailableProducts(this.pageNum, this.pageSize)
        .subscribe({
          next: (response) => {
            this.shownProducts = response;
          },
          error: (result) => {
            if (typeof result.error === 'string') {
              console.log(result.error);
            }
          },
        });
    }
  }

  /**
   * Handles the search results.
   * @param results The search results
   */
  onSearchResults(results: any) {
    this.searched = true;
    this.pageNum = 1;
    this.products = results;
    this.totalProducts = this.products.length;
    this.shownProducts = this.products.slice(0, this.pageSize);
    this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
  }
}
