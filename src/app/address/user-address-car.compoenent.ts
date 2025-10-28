import { Component, OnInit, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { UserAddressState } from "../store/user-adress/user.address.state";
import { AddAddressDialogComponent } from "./user-address-dialog.components";
import { UserAddress } from "../_model/address.model";
import { KeycloakService } from "../_auth/keycloak.service";

@Component({
  selector: "app-user-address-cards",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="address-container">
      <div class="header">
        <h2>Select Delivery Address</h2>
        <button mat-raised-button color="primary" (click)="openAddDialog()">
          <mat-icon>add_location_alt</mat-icon>
          Add Address
        </button>
      </div>

      <div class="cards-grid">
        <div
          class="address-card"
          *ngFor="let address of addresses$ | async"
          [class.selected]="(selectedAddress$ | async)?.id === address.id"
          (click)="toggleSelection(address)"
        >
          <div class="card-header">
            <h3>{{ address.name }}</h3>
            <mat-icon
              *ngIf="(selectedAddress$ | async)?.id === address.id"
              color="primary"
              class="check-icon"
              >check_circle</mat-icon
            >
          </div>

          <p class="address-text">
            {{ address.address }}, {{ address.city }}, {{ address.state }} -
            {{ address.pincode }}
          </p>

          <p class="contact-text">📞 {{ address.contact }}</p>

          <div class="actions">
            <button
              mat-stroked-button
              color="warn"
              (click)="deleteAddress($event, address.id)"
            >
              <mat-icon>delete</mat-icon>
              Delete
            </button>
          </div>

          <div
            *ngIf="(selectedAddress$ | async)?.id === address.id"
            class="default-badge"
          >
            Default delivery address
          </div>
        </div>
      </div>

      <div class="empty" *ngIf="(addresses$ | async)?.length === 0">
        <mat-icon>location_off</mat-icon>
        <p>No addresses found. Add one to continue.</p>
      </div>
    </div>
  `,
  styles: [
    `
      .address-container {
        padding: 1.5rem;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
      }

      .address-card {
        background: #fff;
        border: 2px solid transparent;
        border-radius: 16px;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        position: relative;
      }

      .address-card:hover {
        border-color: #2196f3;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(33, 150, 243, 0.2);
      }

      .selected {
        border-color: #1976d2;
        background-color: #e3f2fd;
        box-shadow: 0 0 10px rgba(25, 118, 210, 0.3);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      .check-icon {
        font-size: 24px;
      }

      .address-text {
        color: #333;
        font-size: 0.95rem;
      }

      .contact-text {
        color: #555;
        font-size: 0.9rem;
        margin-top: 0.4rem;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.8rem;
      }

      .default-badge {
        background: #1976d2;
        color: white;
        font-size: 0.8rem;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 12px;
        position: absolute;
        bottom: 8px;
        left: 8px;
      }

      .empty {
        text-align: center;
        color: #777;
        margin-top: 2rem;
      }

      .empty mat-icon {
        font-size: 48px;
        display: block;
        margin: 0 auto 8px;
        color: #b0bec5;
      }
    `,
  ],
})
export class UserAddressCardsComponent implements OnInit {
  private dialog = inject(MatDialog);
  private state = inject(UserAddressState);
  private keycloak = inject(KeycloakService);

  addresses$ = this.state.addresses$;
  selectedAddress$ = this.state.selectedAddress$;

  ngOnInit() {
    this.state.loadAddresses(this.keycloak.getUserEmail());
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddAddressDialogComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.state.addAddress(result);
      }
    });
  }

  toggleSelection(address: UserAddress) {
    const current = this.state["_selectedAddress"].value;
    if (current?.id === address.id) {
      this.state.setSelectedAddress(null as any);
    } else {
      this.state.setSelectedAddress(address);
    }
  }

  deleteAddress(event: MouseEvent, id?: number) {
    event.stopPropagation();
    if (id) this.state.deleteAddress(id);
  }
}
