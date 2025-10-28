import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserAddress } from "../../_model/address.model";
import { UserAddressService } from "../../_services/address.service";

@Injectable({
  providedIn: "root",
})
export class UserAddressState {
  private _addresses = new BehaviorSubject<UserAddress[]>([]);
  private _loading = new BehaviorSubject<boolean>(false);
  private _error = new BehaviorSubject<string | null>(null);
  private _selectedAddress = new BehaviorSubject<UserAddress | null>(null);

  readonly addresses$ = this._addresses.asObservable();
  readonly loading$ = this._loading.asObservable();
  readonly error$ = this._error.asObservable();
  readonly selectedAddress$ = this._selectedAddress.asObservable();

  constructor(private service: UserAddressService) {}

  loadAddresses(userName: string): void {
    this._loading.next(true);
    this._error.next(null);

    this.service.getUserAddresses(userName).subscribe({
      next: (data) => {
        this._addresses.next(data);
        this._loading.next(false);
        if (data && data.length > 0) {
          this._selectedAddress.next(data[0]);
        } else {
          this._selectedAddress.next(null);
        }
      },
      error: (err) => {
        this._error.next(err.message || "Failed to load addresses");
        this._loading.next(false);
      },
    });
  }

  addAddress(address: UserAddress): void {
    this._loading.next(true);
    this.service.addUserAddress(address).subscribe({
      next: (newAddress) => {
        const updated = [...this._addresses.value, newAddress];
        this._addresses.next(updated);
        this._loading.next(false);
        if (!this._selectedAddress.value) {
          this._selectedAddress.next(newAddress);
        }
      },
      error: (err) => {
        this._error.next(err.message || "Failed to add address");
        this._loading.next(false);
      },
    });
  }

  updateAddress(id: number, updated: UserAddress): void {
    this._loading.next(true);
    this.service.updateUserAddress(id, updated).subscribe({
      next: (updatedAddress) => {
        const updatedList = this._addresses.value.map((addr) =>
          addr.id === id ? updatedAddress : addr
        );
        this._addresses.next(updatedList);
        this._loading.next(false);

        if (this._selectedAddress.value?.id === id) {
          this._selectedAddress.next(updatedAddress);
        }
      },
      error: (err) => {
        this._error.next(err.message || "Failed to update address");
        this._loading.next(false);
      },
    });
  }

  deleteAddress(id: number): void {
    this._loading.next(true);
    this.service.deleteUserAddress(id).subscribe({
      next: () => {
        const updatedList = this._addresses.value.filter(
          (addr) => addr.id !== id
        );
        this._addresses.next(updatedList);
        this._loading.next(false);
        if (this._selectedAddress.value?.id === id) {
          const first = updatedList.length > 0 ? updatedList[0] : null;
          this._selectedAddress.next(first);
        }
      },
      error: (err) => {
        this._error.next(err.message || "Failed to delete address");
        this._loading.next(false);
      },
    });
  }

  setSelectedAddress(address: UserAddress) {
    this._selectedAddress.next(address);
  }

  get size(): number {
    return this._addresses.value.length;
  }
}
