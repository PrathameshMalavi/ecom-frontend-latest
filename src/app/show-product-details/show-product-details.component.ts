import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { ImageProcessingService } from "../image-processing.service";
import { ImageProcessingServiceURI } from "../url-to-image";
import { ShowProductImagesDialogComponent } from "../show-product-images-dialog/show-product-images-dialog.component";
import { Product } from "../_model/product.model";
import { ProductService } from "../_services/product.service";
import { forkJoin } from "rxjs";
import { common, CommonClass } from "../enviroments";

@Component({
  selector: "app-show-product-details",
  templateUrl: "./show-product-details.component.html",
  styleUrls: ["./show-product-details.component.css"],
})
export class ShowProductDetailsComponent implements OnInit {
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    "Id",
    "Product Name",
    "description",
    "Product Discounted Price",
    "Product Actual Price",
    "Actions",
  ];

  constructor(
    private productService: ProductService,
    public imagesDialog: MatDialog,
    // private imageProcessingService: ImageProcessingService,
    private imageService: ImageProcessingServiceURI,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

  public getAllProducts(searchKeyword: string = "") {
    this.showTable = false;
    console.log(
      "Entered getALlProducts *****************************************************************"
    );
    this.productService
      .getAllProducts(this.pageNumber, searchKeyword)
      .pipe(
        switchMap((products: Product[]) => {
          // Map each product to a promise (createImages)
          const productPromises = products.map(
            async (product) => await this.imageService.createImages(product)
          );
          // Wait for all promises to resolve
          return forkJoin(productPromises);
        })
      )
      .subscribe(
        (resp: Product[]) => {
          resp.forEach((product) => this.productDetails.push(product));
          console.log("msg", this.productDetails);
          this.showTable = true;

          this.showLoadMoreProductButton = resp.length === 12;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    // this.productService
    //   .getAllProducts(this.pageNumber, searchKeyword)
    //   .pipe(
    //     map((x: Product[], i) =>
    //       x.map((product: Product) =>
    //         this.imageProcessingService.createImages(product)
    //       )
    //     )
    //   )
    //   .subscribe(
    //     (resp: Product[]) => {
    //       // console.log(resp);
    //       resp.forEach((product) => this.productDetails.push(product));
    //       console.log("msg", this.productDetails);
    //       this.showTable = true;

    //       if (resp.length == 12) {
    //         this.showLoadMoreProductButton = true;
    //       } else {
    //         this.showLoadMoreProductButton = false;
    //       }

    //       // this.productDetails = resp;
    //     },
    //     (error: HttpErrorResponse) => {
    //       console.log(error);
    //     }
    //   );
  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages,
        imageUrls: product.imageUrls,
      },
      height: "500px",
      width: "800px",
    });
  }

  editProductDetails(productId) {
    this.router.navigate(["/admin/addNewProduct", { productId: productId }]);
  }

  getDescription(des: string) {
    let s = des + " " + common.desptext;
    return CommonClass.truncateDescription(s, 1000);
  }
}
