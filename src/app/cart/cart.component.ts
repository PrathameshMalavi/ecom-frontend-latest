import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../_services/product.service";
import { Store } from "@ngrx/store";
import * as CartActions from "../store/cart/cart.actions";
import * as CartSelectors from "../store/cart/cart.selectors";
import { Observable } from "rxjs";
import { Product } from "../_model/product.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  // displayedColumns: string[] = [
  //   "Name",
  //   "Description",
  //   "Price",
  //   "Discounted Price",
  //   "Action",
  // ];

  // cartDetails: any[] = [];

  // constructor(private productService: ProductService, private router: Router) {}

  // ngOnInit(): void {
  //   this.getCartDetails();
  // }

  // delete(cartId) {
  //   console.log(cartId);
  //   this.productService.deleteCartItem(cartId).subscribe(
  //     (resp) => {
  //       console.log(resp);
  //       this.getCartDetails();
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // getCartDetails() {
  //   this.productService.getCartDetails().subscribe(
  //     (response: any[]) => {
  //       console.log(response);
  //       this.cartDetails = response;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // checkout() {
  //   this.router.navigate([
  //     "/buyProduct",
  //     {
  //       isSingleProductCheckout: false,
  //       id: 0,
  //     },
  //   ]);

  //   // this.productService.getProductDetails(false, 0).subscribe(
  //   //   (resp) => {
  //   //     console.log(resp);
  //   //   }, (err) => {
  //   //     console.log(err);
  //   //   }
  //   // );
  // }

  displayedColumns: string[] = [
    "Name",
    "Description",
    "Price",
    "Discounted Price",
    "Action",
  ];

  cartDetails$: Observable<any[]>;
  loading$: Observable<boolean>;
  size$: Observable<number>;

  constructor(private store: Store, private router: Router) {
    this.cartDetails$ = this.store.select(CartSelectors.selectCartDetails);
    this.loading$ = this.store.select(CartSelectors.selectCartLoading);
    this.size$ = this.store.select(CartSelectors.selectCartSize);
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  delete(cartId: number) {
    this.store.dispatch(CartActions.deleteCartItem({ cartId }));
  }

  checkout() {
    this.router.navigate([
      "/user/buyProduct",
      { isSingleProductCheckout: false, id: 0 },
    ]);
  }

  goToShop() {
    this.router.navigate(["/"]);
  }

  viewProduct(product: Product) {
    this.router.navigate([
      "/user/productViewDetails",
      { productId: product.productId },
    ]);
  }
}
