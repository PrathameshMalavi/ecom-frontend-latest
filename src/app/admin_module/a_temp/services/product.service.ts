import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../enviroments/enviroments';
import { ProductRequest } from '../models/Product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public addProduct(product: FormData) {
    return this.http.post<ProductRequest>(api.postProduct, product);
  }
}
