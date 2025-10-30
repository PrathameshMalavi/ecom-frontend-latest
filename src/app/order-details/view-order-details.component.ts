import { Component, Inject } from "@angular/core";
import { DatePipe, NgFor, NgIf } from "@angular/common";

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from "@angular/material/dialog";
import { MyOrderDetails } from "../_model/order.model";

@Component({
  selector: "app-view-order-details-dialog",
  standalone: true,
  template: `
    <div class="container m-15">
      <h2 mat-dialog-title class="dialog-title">Order Details</h2>

      <mat-dialog-content class="dialog-content">
        <section class="order-section">
          <h3>🧾 Order Information</h3>
          <div class="info-grid">
            <p><strong>Order ID:</strong> {{ data.orderId }}</p>
            <p><strong>Customer Name:</strong> {{ data.orderFullName }}</p>
            <p><strong>Address:</strong> {{ data.orderFullOrder }}</p>
            <p><strong>Contact:</strong> {{ data.orderContactNumber }}</p>
            <p>
              <strong>Alternate Contact:</strong>
              {{ data.orderAlternateContactNumber }}
            </p>
            <p><strong>Status:</strong> {{ data.orderStatus }}</p>
            <p><strong>Amount:</strong> ₹{{ data.orderAmount }}</p>
            <p>
              <strong>Order Date:</strong>
              {{ data.orderDate | date : "medium" }}
            </p>
          </div>
        </section>

        <!-- <mat-divider class="my-3"></mat-divider> -->

        <section class="product-section">
          <h3>📦 Product Details</h3>
          <div class="product-container">
            <img
              *ngIf="data.product?.imageUrls?.length"
              [src]="data.product.imageUrls[0]"
              alt="{{ data.product.productName }}"
              class="product-image"
            />
            <div class="product-info">
              <p><strong>Name:</strong> {{ data.product.productName }}</p>
              <p>
                <strong>Description:</strong>
                {{ data.product.productDescription }}
              </p>
              <p>
                <strong>Discounted Price:</strong> ₹{{
                  data.product.productDiscountedPrice
                }}
              </p>
              <p>
                <strong>Actual Price:</strong> ₹{{
                  data.product.productActualPrice
                }}
              </p>
            </div>
          </div>
        </section>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-stroked-button color="primary" (click)="close()">
          Close
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .dialog-title {
        font-weight: 600;
        color: #2c3e50;
      }

      .dialog-content {
        max-height: 70vh;
        overflow-y: auto;
      }

      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px 20px;
      }

      .product-container {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        margin-top: 10px;
      }

      .product-image {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      .product-info p {
        margin: 4px 0;
      }

      .my-3 {
        margin: 16px 0;
      }
    `,
  ],
  imports: [MatDialogContent, MatDialogActions, NgIf, NgFor, DatePipe],
})
export class ViewOrderDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MyOrderDetails,
    private dialogRef: MatDialogRef<ViewOrderDetailsDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
