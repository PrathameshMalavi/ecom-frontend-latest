// import { OrderQuantity } from "./order-quantity.model";

import { Product } from "./product.model";

export interface OrderDetails {
  fullName: string;
  fullAddress: string;
  contactNumber: string;
  alternateContactNumber: string;
  transactionId: string;
  orderProductQuantityList: OrderQuantity[];
}

export interface OrderQuantity {
  productId: number;
  quantity: number;
}

export interface ProductCartQuantity {
  product: Product;
  quantity: number;
}
