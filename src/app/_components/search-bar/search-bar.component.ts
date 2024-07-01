import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { AuthService } from 'src/app/_services/auth.service';

/**
 * Represents the search bar component.
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: [],
})
export class SearchBarComponent {
  /**
   * The search query entered by the user.
   */
  query: string = '';

  /**
   * Event emitter for search results.
   */
  @Output() searchResults = new EventEmitter<any>();

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  /**
   * Performs a search based on the query entered by the user.
   */
  search() {
    if (this.authService.getRole() === 'Admin') {
      this.productService.searchProductAdmin(this.query).subscribe({
        next: (response) => {
          this.searchResults.emit(response);
        },
        error: (result) => {
          //TODO: Handle error
        },
      });
    } else {
      this.productService.searchProductUser(this.query).subscribe({
        next: (response) => {
          this.searchResults.emit(response);
        },
        error: (result) => {
          //TODO: Handle error
        },
      });
    }
  }
}
