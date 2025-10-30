import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../_model/product.model";
import { ProductService } from "../_services/product.service";
import { KeycloakService } from "../_auth/keycloak.service";
import * as CartActions from "../store/cart/cart.actions";
import { common } from "../enviroments";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-product-view-details",
  templateUrl: "./product-view-details.component.html",
  styleUrls: ["./product-view-details.component.css"],
})
export class ProductViewDetailsComponent implements OnInit {
  selectedProductIndex = 0;

  product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private keycloak: KeycloakService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data["product"];
    console.log(this.product);
  }

  addToCart(productId) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        this.store.dispatch(CartActions.loadCart());
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeIndex(index) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId) {
    this.router.navigate([
      "user/buyProduct",
      {
        isSingleProductCheckout: true,
        id: productId,
      },
    ]);
  }

  isUser() {
    if (this.keycloak.isAdmin()) {
      return false;
    }
    return true;
  }

  isAuthenticated() {
    return this.keycloak.isUserAuthenticated();
  }

  getProductDescription() {
    return this.product.productDescription + " " + common.desptext;
  }
}
