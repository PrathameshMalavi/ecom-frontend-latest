import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map, startWith } from "rxjs/operators";
import { ImageProcessingService } from "../../image-processing.service";
import { Product } from "../../_model/product.model";
import { ProductService } from "../../_services/product.service";
import { KeycloakService } from "../../_auth/keycloak.service";
import { Store } from "@ngrx/store";
import * as CartSelectors from "../../store/cart/cart.selectors";
import * as CartActions from "../../store/cart/cart.actions";
import { Observable } from "rxjs";
import { SearchBarComponent } from "../../search.component";
import { MatGridList } from "@angular/material/grid-list";

@Component({
  selector: "app-user.home.component",
  templateUrl: "./user.home.component.component.html",
  styleUrl: "./user.home.component.component.css",
})
export class UserHomeComponentComponent {
  pageNumber: number = 0;

  productDetails = [];
  searchText: string = "";

  showLoadButton = false;

  cartDetails$: Observable<any[]>;
  size$: Observable<number>;

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private keycloak: KeycloakService,
    private store: Store
  ) {
    this.cartDetails$ = this.store.select(CartSelectors.selectCartDetails);
    this.size$ = this.store.select(CartSelectors.selectCartSize);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

  public getAllProducts(searchKey: string = "") {
    this.searchText = searchKey;
    this.productService
      .getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          if (resp.length == 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
          resp.forEach((p) => this.productDetails.push(p));
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  showProductDetails(productId) {
    if (this.keycloak.isUser()) {
      this.router.navigate([
        "/user/productViewDetails",
        { productId: productId },
      ]);
      return;
    }

    this.router.navigate(["/productViewDetails", { productId: productId }]);
  }

  // isProductInCart(productID: string): Observable<boolean> {
  //   // return new Observable<boolean>().pipe(startWith(false));
  //   // return this.cartDetails$.pipe(
  //   //   map((items) => items.some((item) => item.productID === productID))
  //   //   // startWith(false)
  //   // );
  // }

  isProductInCart(productID: string): boolean {
    return false;
  }

  onAddToCart(productId: number) {
    console.log("Event Emmited" + productId);
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
        this.store.dispatch(CartActions.loadCart());
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
