import { Component, OnInit } from "@angular/core";
import { ProductService } from "../_services/product.service";
import { ViewOrderDetailsDialogComponent } from "./view-order-details.component";
import { MatDialog } from "@angular/material/dialog";
import { MyOrderDetails } from "../_model/order.model";
import { TrackOrderDetailsComponentComponent } from "./track-order-details-component/track-order-details-component.component";
import { orderStatus } from "../enviroments";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"],
})
export class OrderDetailsComponent implements OnInit {
  placed: string = orderStatus.ORDER_PLACED;
  shipped: string = orderStatus.ORDER_Shipped;
  reachedDestination: string = orderStatus.ORDER_ReachedFinalDestination;
  delivered: string = orderStatus.ORDER_Delivered;

  displayedColumns: string[] = [
    "Id",
    "Product Name",
    "Name",
    "Address",
    "Contact No.",
    "Status",
    "Action",
  ];
  dataSource = [];

  status: string = "All";
  selectedStatus: any;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (resp) => {
        this.dataSource = resp;
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewOrderDetails(order: MyOrderDetails) {
    this.dialog.open(ViewOrderDetailsDialogComponent, {
      width: "600px",
      data: order,
    });
  }

  openOrderDetails(order: any) {
    const dialogRef = this.dialog.open(TrackOrderDetailsComponentComponent, {
      width: "600px",
      data: order,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     console.log("✅ Dialog returned data:", result);
    //     // You can call an API or update UI here
    //   }
    // });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Dialog returned:", result);
        if (result.status) {
          this.getAllOrderDetailsForAdmin(result.status);
          console.log("Dialog message:", result.message);
        }
      }
    });
  }
}
