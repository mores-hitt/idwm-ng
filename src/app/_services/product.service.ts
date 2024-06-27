import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_interfaces/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = environment.apiUrl + '/product';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getAvailableProducts(pageNumber: number, pageSize: number) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/available/${pageNumber}/${pageSize}`
    );
  }
}
