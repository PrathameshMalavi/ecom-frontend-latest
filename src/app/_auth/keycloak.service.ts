// import * as Keycloak from "keycloak-js";

import { Injectable } from "@angular/core";
import { UserProfile } from "./user-profile.js";
import Keycloak from "keycloak-js";
import { environment, frontendUrl, newRoles, oldapi } from "../enviroments";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

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

  constructor(private router: Router, private http: HttpClient) {}

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
      // onLoad: "login-required",
      onLoad: "check-sso", // don't force login immediately
      checkLoginIframe: false,
    });

    if (authenticated) {
      console.log("User KeycloakService Authenticated");
      this.redirectAfterLogin();
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }
  }

  understandMethod() {
    console.log(this.keycloak.realm.role);
    console.log(this.keycloak.realm.roles);
    console.log(this.keycloak.realm.roleName);
  }

  async login() {
    // Redirects to Keycloak login screen and comes back to app
    await this.keycloak.login({ redirectUri: window.location.origin });

    // If login didn't trigger redirect (e.g., silent login), call manually
    if (this.keycloak.authenticated) {
      this.redirectAfterLogin();
    }

    console.log("User KeycloakService LogIn Called");
    // await this._keycloak.login().then(() => {});
    // return this.keycloak.login();
  }

  redirectAfterLogin() {
    if (this.isUserAuthenticated()) {
      this.userEntryRequest();
      if (this.isAdmin()) {
        this.router.navigate(["/admin"]);
      } else {
        this.router.navigate(["/user"]);
      }
    }
  }

  userEntryRequest() {
    this.http.get(oldapi.userEntry, { withCredentials: true }).subscribe({
      next: (response) => console.log("Response:", response),
      error: (err) => console.error("Error:", err),
    });
  }

  logoutUser() {
    console.log("User KeycloakService LogOut Called");
    return this.keycloak.logout({
      // redirectUri: window.location.origin,
      redirectUri: frontendUrl.home,
      // redirectUri: frontendUrl.login,
    });
  }

  accountManagementUser() {
    console.log("User KeycloakService AccountManageent Called");
    return this.keycloak.accountManagement();
  }

  isUserAuthenticated(): boolean {
    if (this.keycloak.authenticated) {
      return true;
    }
    return false;
  }

  getUserRoles(): string[] {
    if (this.isUserAuthenticated()) {
      // const roles = this.keycloak.getUserRoles;
      return this.getUserRolesToken();
    }
    return [newRoles.unauthorized];
  }

  getUserToken(): string {
    if (this.isUserAuthenticated()) {
      const token = this.keycloak.token;
      return token;
    }
    return null;
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    if (this.isUserAuthenticated()) {
      return true;
    }
    return false;
  }

  public isAdmin(): boolean {
    return this.getUserRolesToken().includes(newRoles.admin);
  }

  public isUser(): boolean {
    return this.getUserRolesToken().includes(newRoles.user);
  }

  getUserRolesToken(): string[] {
    if (!this.keycloak || !this.keycloak.tokenParsed) return [];

    // Realm roles
    const realmRoles = this.keycloak.tokenParsed["realm_access"]?.roles || [];

    // Client roles
    const clientRoles =
      this.keycloak.tokenParsed["resource_access"]?.["ecommerce-frontend"]
        ?.roles || [];

    // Combine both if needed
    return [...realmRoles, ...clientRoles];
  }

  // 🔹 Get user’s first + last name
  getUserFullName(): string {
    if (!this.keycloak || !this.keycloak.tokenParsed) return "";

    const firstName = this.keycloak.tokenParsed["given_name"] || "";
    const lastName = this.keycloak.tokenParsed["family_name"] || "";

    return `${firstName} ${lastName}`.trim();
  }

  // Optional: individual getters
  getUserFirstName(): string {
    return this.keycloak?.tokenParsed?.["given_name"] || "";
  }

  getUserLastName(): string {
    return this.keycloak?.tokenParsed?.["family_name"] || "";
  }

  getUserEmail(): string {
    return this.keycloak?.tokenParsed?.["email"] || "";
  }
}
