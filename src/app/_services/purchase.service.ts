import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_interfaces/product';
import { Receipt } from '../_interfaces/receipt';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  purchase(quantit: number, productI: number, userI: number){
    //params to string
    const quantity = String(quantit);
    const productId = String(productI);
    const userId = String(userI);

    console.log(quantity, productId, userId);


    return this.http.post<Receipt>(`${this.baseUrl}/Purchase`, {quantity, productId, userId}).pipe(
      map((receipt: Receipt) => {
        return receipt;
      })
    );
  }
}
