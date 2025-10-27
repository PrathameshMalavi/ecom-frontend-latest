import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAuthService } from "./user-auth.service";
import { oldapi } from "../enviroments";
import { KeycloakService } from "../_auth/keycloak.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  PATH_OF_API = "http://localhost:9090";

  requestHeader = new HttpHeaders({ "No-Auth": "True" });
  constructor(private httpclient: HttpClient) {}

  public register(registerData) {
    return this.httpclient.post(oldapi.registerNewUser, registerData);
  }

  public login(loginData) {
    return this.httpclient.post(oldapi.authenticate, loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    // return this.httpclient.get(oldapi.forUser, {
    //   responseType: "text",
    //   withCredentials :true,
    // });
    return "User Acess Allowed";
  }

  public forAdmin() {
    // return this.httpclient.get(oldapi.forAdmin, {
    //   responseType: "text",
    //   withCredentials :true,
    // });
    return "Admin Acess Allowed";
  }

  public matchRoles(allowedRoles: string[], userRole: string) {
    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      return false;
    }
  }

  public roleMatch(allowedRoles, userRoles): boolean {
    let isMatch = false;
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          console.log(userRoles[i] + " : " + allowedRoles[j]);
          if (userRoles[i] === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return false;
  }
}
