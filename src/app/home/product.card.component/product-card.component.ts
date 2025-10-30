import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "../../_model/product.model";
import { Router } from "@angular/router";
import { KeycloakService } from "../../_auth/keycloak.service";
import { Observable } from "rxjs";
import { common, CommonClass } from "../../enviroments";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  // @Input() isInCart: Observable<boolean>; // passed from parent, indicates if product is already in cart
  @Input() isInCart: boolean; // passed from parent, indicates if product is already in cart
  @Output() addToCart = new EventEmitter<number>();

  isUserAuthenticated: boolean;

  constructor(private router: Router, private keycloak: KeycloakService) {
    this.isUserAuthenticated = keycloak.isUserAuthenticated();
  }

  ngOnInit(): void {
    console.log(this.product.productName + " : " + this.isInCart);
  }

  get hasPriceDrop(): boolean {
    return (
      this.product.productPrevActualPrice > this.product.productActualPrice
    );
  }

  get displayImage(): string {
    return this.product.imageUrls?.length
      ? this.product.imageUrls[0]
      : "assets/images/no_product_image.png";
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product.productId);

    if (!this.isInCart) {
    }
  }

  getDescription(p: Product) {
    let s = p.productDescription + " " + common.desptext;
    return CommonClass.truncateDescription(s, 1000);
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
}
