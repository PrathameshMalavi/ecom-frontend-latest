import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { UserAuthService } from "../_services/user-auth.service";
import { KeycloakService } from "../_auth/keycloak.service";
import { Router } from "@angular/router";
import { Observable, startWith } from "rxjs";
import { Store } from "@ngrx/store";
import * as CartSelectors from "../store/cart/cart.selectors";
import * as CartActions from "../store/cart/cart.actions";
import { loadCart } from "../store/cart/cart.actions";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  message;
  // default : Observable<number> = Observable.
  size$: Observable<number>;

  constructor(
    private userAuthService: UserAuthService,
    private keycloak: KeycloakService,
    private router: Router,
    private userService: UserService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.forUser();
    this.store.dispatch(CartActions.loadCart());
    this.size$ = this.store
      .select(CartSelectors.selectCartSize)
      .pipe(startWith(0));
  }

  forUser() {
    this.message = this.userService.forUser();

    // this.userService.forUser().subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.message = response;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  //loginbutton
  isLoggedOut() {
    if (this.keycloak.isLoggedIn()) {
      return false;
    }
    return true;
  }

  //logoutbutton
  public isLoggedIn() {
    if (this.keycloak.isLoggedIn()) {
      return true;
    }
    return false;
  }

  public login() {
    this.keycloak.login();
    // this.router.navigate(["/"]);
  }

  public logout() {
    this.keycloak.logoutUser();
    this.router.navigate(["/"]);
  }

  public isAdmin() {
    return this.keycloak.isAdmin();
  }

  public isUser() {
    if (this.isAdmin()) {
      return false;
    }
    return this.keycloak.isUser();
  }
}
