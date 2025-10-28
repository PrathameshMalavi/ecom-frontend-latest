import { Component, importProvidersFrom, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { UserAddress } from "../_model/address.model";
import { statesCities } from "../../assets/states-cities.json";

@Component({
  selector: "app-add-address-dialog",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <div class="dialog-container">
      <h2 class="dialog-title">Add New Address</h2>

      <div class="form-container">
        <mat-form-field appearance="outline">
          <mat-label>Full Name</mat-label>
          <input matInput [(ngModel)]="form.name" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Address</mat-label>
          <textarea
            matInput
            rows="2"
            [(ngModel)]="form.address"
            placeholder="Flat no, Street, Area"
          ></textarea>
        </mat-form-field>

        <div class="row">
          <mat-form-field appearance="outline" class="half">
            <mat-label>State</mat-label>
            <mat-select
              [(ngModel)]="form.state"
              (selectionChange)="onStateChange()"
            >
              <mat-option *ngFor="let s of states" [value]="s.name">{{
                s.name
              }}</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half">
            <mat-label>City</mat-label>
            <mat-select [(ngModel)]="form.city">
              <mat-option *ngFor="let city of availableCities" [value]="city">{{
                city
              }}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="outline" class="half">
            <mat-label>Pincode</mat-label>
            <input
              matInput
              [(ngModel)]="form.pincode"
              type="number"
              maxlength="6"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="half">
            <mat-label>Contact Number</mat-label>
            <input
              matInput
              [(ngModel)]="form.contact"
              type="tel"
              maxlength="10"
            />
          </mat-form-field>
        </div>
      </div>

      <div class="dialog-actions">
        <button mat-flat-button color="primary" (click)="save()">Save</button>
        <button mat-stroked-button color="warn" (click)="cancel()">
          Cancel
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        display: flex;
        flex-direction: column;
        padding: 20px;
        min-width: 360px;
        max-width: 420px;
        background: #fafafa;
        border-radius: 16px;
      }

      .dialog-title {
        font-size: 1.3rem;
        font-weight: 600;
        color: #222;
        text-align: center;
        margin-bottom: 20px;
      }

      .form-container {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .row {
        display: flex;
        gap: 10px;
        width: 100%;
      }

      .half {
        flex: 1;
      }

      mat-form-field {
        width: 100%;
      }

      textarea {
        resize: none;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
      }

      button[mat-flat-button] {
        font-weight: 600;
      }

      button[mat-stroked-button] {
        border-color: #ff5252;
      }

      @media (max-width: 480px) {
        .dialog-container {
          min-width: unset;
          padding: 16px;
        }
        .row {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class AddAddressDialogComponent {
  dialogRef = inject(MatDialogRef<AddAddressDialogComponent>);

  states = statesCities;
  availableCities: string[] = [];

  form = {
    name: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    contact: "",
  };

  onStateChange() {
    const selected = this.states.find((s) => s.name === this.form.state);
    this.availableCities = selected ? selected.cities : [];
    this.form.city = "";
  }

  save() {
    this.dialogRef.close(this.form);
  }

  cancel() {
    this.dialogRef.close();
  }
}
