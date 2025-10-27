import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import { UserService } from "../_services/user.service";
import { KeycloakService } from "./keycloak.service";
// import { KeycloakService } from "./keycloak.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService,
    private keycloak: KeycloakService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.keycloak.getUserToken() !== null) {
      const role = route.data["roles"] as Array<string>;

      if (role) {
        const userRoles: any = this.keycloak.getUserRolesToken();
        // const match = this.userService.roleMatch(role, userRoles);
        const match = this.userService.matchRoles(userRoles, role[0]);
        console.log(userRoles + " : " + match);
        if (match) {
          return true;
        } else {
          this.router.navigate(["/forbidden"]);
          return false;
        }
      }
    }

    // this.router.navigate(["/"]);
    this.keycloak.login();
    return false;
  }
}
