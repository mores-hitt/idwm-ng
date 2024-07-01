import { ProductType } from './product-type';

/**
 * Represents a product.
 */
export interface Product {
  /**
   * The unique identifier of the product.
   */
  id: number;

  /**
   * The name of the product.
   */
  name: string;

  /**
   * The price of the product.
   */
  price: number;

  /**
   * The stock quantity of the product.
   */
  stock: number;

  /**
   * The URL of the product image.
   */
  imgUrl: string;

  /**
   * The type of the product.
   */
  productType: ProductType;
}
