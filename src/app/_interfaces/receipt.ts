/**
 * Represents a receipt object.
 */
export interface Receipt {
  /**
   * The ID of the receipt.
   */
  id: number;

  /**
   * The purchase date of the receipt.
   */
  purchase_Date: Date;

  /**
   * The ID of the product associated with the receipt.
   */
  productId: number;

  /**
   * The name of the product associated with the receipt.
   */
  productName: string;

  /**
   * The type of the product associated with the receipt.
   */
  productType: string;

  /**
   * The price of the product associated with the receipt.
   */
  productPrice: number;

  /**
   * The quantity of the product associated with the receipt.
   */
  quantity: number;

  /**
   * The total price of the product associated with the receipt.
   */
  totalPrice: number;
}
