import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserAuthService } from "../_services/user-auth.service";
import { UserService } from "../_services/user.service";
import { KeycloakService } from "../_auth/keycloak.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private keycloak: KeycloakService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

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
    // console.log(
    //   "isAdmin : " +
    //     this.keycloak.isAdmin() +
    //     "isUser : " +
    //     this.keycloak.isUser() +
    //     "isUserAuthenticated : " +
    //     this.keycloak.isUserAuthenticated() +
    //     "getUserRoleToken : " +
    //     this.keycloak.getUserRoles() +
    //     "isUserAuthenticated : " +
    //     this.keycloak.isUserAuthenticated() +
    //     "getToken : " +
    //     this.keycloak.getUserToken()
    // );
    this.keycloak.logoutUser();
    // this.router.navigate(["/"]);
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
