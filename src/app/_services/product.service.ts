import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/product`);
  }
}
