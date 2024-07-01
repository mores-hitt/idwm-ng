import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Receipt } from '../_interfaces/receipt';

/**
 * Service for handling purchase-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Makes a purchase request.
   * @param quantity The quantity of the product to purchase.
   * @param productId The ID of the product to purchase.
   * @param userId The ID of the user making the purchase.
   * @returns An Observable that emits the receipt of the purchase.
   */
  purchase(
    quantity: number,
    productId: number,
    userId: number
  ): Observable<Receipt> {
    //params to string
    const quantityStr = String(quantity);
    const productIdStr = String(productId);
    const userIdStr = String(userId);

    return this.http
      .post<Receipt>(`${this.baseUrl}/Purchase`, {
        quantity: quantityStr,
        productId: productIdStr,
        userId: userIdStr,
      })
      .pipe(
        map((receipt: Receipt) => {
          return receipt;
        })
      );
  }
}
