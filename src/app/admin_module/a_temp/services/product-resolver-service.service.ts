import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { ProductResponse } from '../models/Product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService {
  constructor(
    private productService: ProductService // private imageProcessingService: ImageProcessingService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const id = route.paramMap.get('productId');

    if (id) {
      //then we have to fetch details from backend
      // return this.productService
      //   .getProductDetailsById(id)
      //   .pipe(map((p) => this.imageProcessingService.createImages(p)));
    } else {
      // return empty product observable.
      return of(this.getProductDetails());
    }
    return undefined;
  }

  getProductDetails() {
    return {
      productId: null,
      productName: '',
      productDescription: '',
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    };
  }
}
