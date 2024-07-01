import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_interfaces/product';
import { Observable } from 'rxjs';

/**
 * Service for managing products.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = environment.apiUrl + '/product';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all products.
   * @returns An observable of an array of products.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  /**
   * Retrieves available products with pagination.
   * @param pageNumber - The page number.
   * @param pageSize - The number of items per page.
   * @returns An observable of an array of products.
   */
  getAvailableProducts(
    pageNumber: number,
    pageSize: number
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/available/${pageNumber}/${pageSize}`
    );
  }

  /**
   * Adds a new product.
   * @param model - The product data.
   * @returns An observable of a string indicating the success message.
   */
  addProduct(model: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, model, {
      responseType: 'text' as 'json',
    });
  }

  /**
   * Edits an existing product.
   * @param id - The ID of the product to edit.
   * @param model - The updated product data.
   * @returns An observable of a string indicating the success message.
   */
  editProduct(id: number, model: FormData): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, model, {
      responseType: 'text' as 'json',
    });
  }

  /**
   * Deletes a product.
   * @param id - The ID of the product to delete.
   * @returns An observable of a string indicating the success message.
   */
  deleteProduct(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  /**
   * Searches for products in the admin panel.
   * @param searchTerm - The search term.
   * @returns An observable of an array of products.
   */
  searchProductAdmin(searchTerm: string) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/search?query=${searchTerm}`
    );
  }

  /**
   * Searches for available products for users.
   * @param searchTerm - The search term.
   * @returns An observable of an array of products.
   */
  searchProductUser(searchTerm: string) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/available/search?query=${searchTerm}`
    );
  }
}
