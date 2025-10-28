import { Observable } from "rxjs";
import { UserAddress } from "../_model/address.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakService } from "../_auth/keycloak.service";
import { oldapi } from "../enviroments";

@Injectable({
  providedIn: "root",
})
export class UserAddressService {
  //   private baseUrl = "http://localhost:8080/api/address";

  constructor(private http: HttpClient, private keycloak: KeycloakService) {}

  getUserAddresses(userName: string): Observable<UserAddress[]> {
    userName = this.keycloak.getUserEmail();
    return this.http.get<UserAddress[]>(oldapi.getAllAddress + userName);
  }

  addUserAddress(address: UserAddress): Observable<UserAddress> {
    return this.http.post<UserAddress>(oldapi.addAddress, address);
  }

  updateUserAddress(id: number, address: UserAddress): Observable<UserAddress> {
    return this.http.put<UserAddress>(oldapi.updateAddress + id, address);
  }

  deleteUserAddress(id: number): Observable<void> {
    return this.http.delete<void>(oldapi.deleteAddress + id);
  }
}
