import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatAccordion,
} from "@angular/material/expansion";
import { MyOrderDetails } from "../../_model/order.model";
import { orderStatus } from "../../enviroments";
import { ProductService } from "../../_services/product.service";
import { OrderTrack } from "../../_model/order-track.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OrderAddressDialog } from "./order-address-dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { Observable } from "rxjs";

@Component({
  selector: "app-track-order-details-component",
  standalone: true,
  imports: [
    MatDialogActions,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatDialogContent,
    MatAccordion,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: "./track-order-details-component.component.html",
  styleUrl: "./track-order-details-component.component.css",
})
export class TrackOrderDetailsComponentComponent {
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;

  isLoading = false;
  orders: OrderTrack[] = [];
  ordersNew$: Observable<OrderTrack[]>;

  result: string;

  constructor(
    private dialogRef: MatDialogRef<TrackOrderDetailsComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MyOrderDetails,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.getOrderTracks();
    if (data.orderStatus == orderStatus.ORDER_PLACED) {
      this.step1Completed = false;
      this.step2Completed = false;
      this.step3Completed = false;
    } else if (data.orderStatus == orderStatus.ORDER_Shipped) {
      this.step1Completed = true;
      this.step2Completed = false;
      this.step3Completed = false;
    } else if (data.orderStatus == orderStatus.ORDER_ReachedFinalDestination) {
      this.step1Completed = true;
      this.step2Completed = true;
      this.step3Completed = false;
    } else if (data.orderStatus == orderStatus.ORDER_Delivered) {
      this.step1Completed = true;
      this.step2Completed = true;
      this.step3Completed = true;
    }
  }

  completeStep(step: number): void {
    if (step === 1) this.step1Completed = true;
    if (step === 2 && this.step1Completed) this.step2Completed = true;
    if (step === 3 && this.step2Completed) this.step3Completed = true;
  }

  close(): void {
    this.dialogRef.close();
  }

  markAsShipped(orderId) {
    this.isLoading = true;
    this.productService.markAsShipped(orderId).subscribe(
      (response) => {
        this.isLoading = false;

        console.log(response);
        this.result = orderStatus.ORDER_Shipped;
        this.dialogRef.close({
          message: "Order marked as Shipped",
          status: this.result,
        });
      },
      (error) => {
        this.isLoading = false;
        this._snackBar.open("Coudnt Update Status Try Again Later", "Error", {
          duration: 2000,
        });
        console.log(error);
      }
    );

    // this.getAllOrderDetailsForAdmin(this.status);

    // this.data.orderStatus = 'Delivered';
    // this.dialogRef.close({
    //   message: 'Order marked as delivered',
    //   updatedOrder: this.data
    // });
  }

  // markAsDelivered() {
  //   this.data.orderStatus = 'Delivered';
  //   this.dialogRef.close({
  //     message: 'Order marked as delivered',
  //     updatedOrder: this.data
  //   });
  // }

  addOrderTrack(orderId, orderTrack: OrderTrack) {
    this.isLoading = true;
    this.productService.addOrderTrack(orderId, orderTrack).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;

        this.result = "Tracking Added";
        // this.dialogRef.close({
        //   message: "Order Tracking added",
        //   status: this.result,
        // });
      },
      (error) => {
        this.isLoading = false;
        this._snackBar.open(
          "Coudnt Add Track Order, Try Again Later",
          "Error",
          {
            duration: 2000,
          }
        );
        console.log(error);
      }
    );
  }

  markAsReachedDestination(orderId) {
    this.isLoading = true;
    this.productService.markAsReachedDestination(orderId).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.result = orderStatus.ORDER_ReachedFinalDestination;
        this.dialogRef.close({
          message: "Order marked as Reached destination",
          status: this.result,
        });
      },
      (error) => {
        this.isLoading = false;
        this._snackBar.open("Coudnt Update Status Try Again Later", "Error", {
          duration: 2000,
        });
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId) {
    this.isLoading = true;
    this.productService.markAsDelivered(orderId).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.result = orderStatus.ORDER_Delivered;
        this.dialogRef.close({
          message: "Order marked as Delivered",
          status: this.result,
        });
      },
      (error) => {
        this.isLoading = false;
        this._snackBar.open("Coudnt Update Status Try Again Later", "Error", {
          duration: 2000,
        });
        console.log(error);
      }
    );
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(OrderAddressDialog, {
      width: "300px",
    });

    dialogRef.afterClosed().subscribe((address) => {
      this.isLoading = true;
      if (address) {
        const newTrack: OrderTrack = {
          address: address,
          order: this.data,
        };
        this.productService
          .addOrderTrack(this.data.orderId, newTrack)
          .subscribe(
            (response) => {
              console.log(response);
              this.isLoading = false;
              this.result = orderStatus.ORDER_Delivered;
              this.dialogRef.close({
                message: "Order marked as Delivered",
                status: this.result,
              });
            },
            (error) => {
              this.isLoading = false;
              this._snackBar.open(
                "Coudnt Update Status Try Again Later",
                "Error",
                {
                  duration: 2000,
                }
              );
              console.log(error);
            }
          );
      }
    });
  }

  getOrderTracks() {
    // this.isLoading = true;
    this.ordersNew$ = this.productService.getOrderTrack(this.data.orderId);

    this.productService.getOrderTrack(this.data.orderId).subscribe(
      (response) => {
        console.log(response);
        this.orders = response;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this._snackBar.open("Coudnt Update Status Try Again Later", "Error", {
          duration: 2000,
        });
        console.log(error);
      }
    );
  }
}
