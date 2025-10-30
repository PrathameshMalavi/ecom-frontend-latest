import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderDetails } from "../_model/order-details.model";
import { MyOrderDetails } from "../_model/order.model";
import { Product } from "../_model/product.model";
import { oldapi } from "../enviroments";
import { OrderTrack } from "../_model/order-track.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public createTransaction(amount) {
    return this.httpClient.get(oldapi.createTransaction + amount);
  }

  public markAsShipped(orderId) {
    return this.httpClient.get(oldapi.markAsShipped + orderId);
  }

  public addOrderTrack(orderId, orderTrack: OrderTrack) {
    return this.httpClient.post(oldapi.addOrderTrack + orderId, orderTrack);
  }

  public getOrderTrack(orderId): Observable<OrderTrack[]> {
    return this.httpClient.get<OrderTrack[]>(oldapi.getOrderTracks + orderId);
  }

  public markAsReachedDestination(orderId) {
    return this.httpClient.get(oldapi.markAsReachedDestination + orderId);
  }

  public markAsDelivered(orderId) {
    return this.httpClient.get(oldapi.markAsDelivered + orderId);
  }

  public getAllOrderDetailsForAdmin(
    status: string
  ): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>(
      oldapi.getAllOrderDetails + status
    );
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>(oldapi.getAllOrderDetails, {
      withCredentials: true,
    });
  }

  public deleteCartItem(cartId) {
    return this.httpClient.delete(oldapi.deleteCartItem + cartId);
  }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>(oldapi.addNewProduct, product);
  }

  public getAllProducts(pageNumber, searchKeyword: string = "") {
    return this.httpClient.get<Product[]>(
      oldapi.getAllProductspageNumber +
        pageNumber +
        "&searchKey=" +
        searchKeyword
    );
  }

  public getProductDetailsById(productId) {
    return this.httpClient.get<Product>(
      oldapi.getProductDetailsById + productId
    );
  }

  public deleteProduct(productId: number) {
    return this.httpClient.delete(oldapi.deleteProductDetails + productId);
  }

  public getProductDetails(isSingleProductCheckout, productId) {
    return this.httpClient.get<Product[]>(
      oldapi.getProductDetails + isSingleProductCheckout + "/" + productId
    );
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout) {
    return this.httpClient.post(
      oldapi.placeOrder + isCartCheckout,
      orderDetails
    );
  }

  public addToCart(productId) {
    return this.httpClient.get(oldapi.addToCart + productId);
  }

  public getCartDetails() {
    return this.httpClient.get(oldapi.getCartDetails);
  }
}
