import { Carousel } from "../_model/carousel-model";
import { OrderDetails } from "../_model/order-details.model";
import { Product } from "../_model/product.model";

// cart.state.ts
export interface CartState {
  cartDetails: any[];
  loading: boolean;
  error: any;
  size: number;
}

// products.state.ts
export interface ProductsState {
  products: Product[];
  loading: boolean;
}

// orders.state.ts
export interface OrdersState {
  orders: OrderDetails[];
  status: string;
}

export interface CarouselState {
  carousels: Carousel[];
  loading: boolean;
  error: string | null;
}

// app.state.ts
export interface AppState {
  cart: CartState;
  products: ProductsState;
  orders: OrdersState;
  carousel: CarouselState;
}

// app.module.ts
// StoreModule.forRoot({
//   cart: cartReducer,
//   products: productsReducer,
//   orders: ordersReducer,
// });
