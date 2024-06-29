export interface Receipt {
  id: number;
  purchase_Date: Date;
  productId: number;
  productName: string;
  productType: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}
