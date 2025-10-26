// import * as Keycloak from "keycloak-js";

import { Injectable } from "@angular/core";
import { UserProfile } from "./user-profile.js";
import Keycloak from "keycloak-js";

// pm@gmail.com-user
// pass

// a@gmail.com-admin
// pass

@Injectable({
  providedIn: "root",
})
export class KeycloakService {
  //   Keycloak = require("keycloak-js");

  //   private _keycloak: Keycloak | undefined;p
  private _keycloak: any;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: "http://localhost:8080",
        // url: "http://localhost:8180",
        realm: "ecommerce",
        clientId: "ecommerce-frontend",
      });
    }
    return this._keycloak;
  }

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    console.log("Initializing KeyCLoak Service");
    const authenticated = await this.keycloak.init({
      onLoad: "login-required",
    });

    if (authenticated) {
      console.log("User KeycloakService Authenticated");
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }
  }

  login() {
    console.log("User KeycloakService LogIn Called");
    return this.keycloak.login();
  }

  logout() {
    console.log("User KeycloakService LogOut Called");
    return this.keycloak.logout({
      redirectUri: "http://localhost:4200/login",
    });
  }

  accountManagement() {
    console.log("User KeycloakService AccountManageent Called");
    return this.keycloak.accountManagement();
  }
}
