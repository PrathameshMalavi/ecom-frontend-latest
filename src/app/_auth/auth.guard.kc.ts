// import { inject, Injectable } from "@angular/core";
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from "@angular/router";
// import { Observable } from "rxjs";
// import { UserAuthService } from "../_services/user-auth.service";
// import { UserService } from "../_services/user.service";
// import { KeycloakService } from "./keycloak.service";

// @Injectable({
//   providedIn: "root",
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private userAuthService: UserAuthService,
//     private router: Router,
//     private userService: UserService
//   ) {}

//   tokenService: KeycloakService = inject(KeycloakService);

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     // keyclaok code
//     // if (this.tokenService.keycloak.isTokenExpired()) {
//     //   router.navigate(["login"]);
//     //   return false;
//     // }

//     // return true;
//     if (this.userAuthService.getToken() !== null) {
//       const role = route.data["roles"] as Array<string>;

//       if (role) {
//         const match = this.userService.roleMatch(role);

//         if (match) {
//           return true;
//         } else {
//           this.router.navigate(["/forbidden"]);
//           return false;
//         }
//       }
//     }

//     this.router.navigate(["/login"]);
//     return false;
//   }
// }

// export const authGuardKc: CanActivateFn = () => {
//   const tokenService = inject(KeycloakService);

//   const router = inject(Router);
//   if (tokenService.keycloak.isTokenExpired()) {
//     router.navigate(["login"]);
//     return false;
//   }
//   return true;
// };
