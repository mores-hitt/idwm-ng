import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = environment.apiUrl + '/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getAvailableProducts(pageNumber: number, pageSize: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/available/${pageNumber}/${pageSize}`
    );
  }

  addProduct(model: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, model, {
      responseType: 'text' as 'json',
    });
  }

  editProduct(id: number, model: FormData): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, model, {
      responseType: 'text' as 'json',
    });
  }

  deleteProduct(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  searchProductAdmin(searchTerm: string) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/search?query=${searchTerm}`
    );
  }

  searchProductUser(searchTerm: string) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/available/search?query=${searchTerm}`
    );
  }
}
