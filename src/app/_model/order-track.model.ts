import { OrderDetails } from "./order-details.model";
import { MyOrderDetails } from "./order.model";

export interface OrderTrack {
  id?: number;
  date?: string;
  address: string;
  location?: number[];
  order: MyOrderDetails;
}
