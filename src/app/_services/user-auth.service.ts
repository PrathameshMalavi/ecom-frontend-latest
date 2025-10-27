import { Injectable } from "@angular/core";
import { newRoles } from "../enviroments";
import { KeycloakService } from "../_auth/keycloak.service";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  constructor(private keycloak: KeycloakService) {}

  public setRoles(roles: []) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): string[] {
    return this.keycloak.getUserRolesToken();
    // return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(): string {
    return this.keycloak.getUserToken();
    return localStorage.getItem("jwtToken");
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isAdmin() {
    return this.getRoles().includes(newRoles.admin);
    // const roles: any[] = this.getRoles();
    // return roles[0].roleName === newRoles.admin;
  }

  public isUser() {
    return this.getRoles().includes(newRoles.user);
    const roles: any[] = this.getRoles();
    return roles[0].roleName === newRoles.user;
  }
}
