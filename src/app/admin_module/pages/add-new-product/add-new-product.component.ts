import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { ProductRequest } from "../../a_temp/models/Product.models";
import { ProductService } from "../../a_temp/services/product.service";
import { FileHandle } from "../../../admin_module/a_temp/models/FileUpload";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatGridList } from "@angular/material/grid-list";

@Component({
  selector: "app-add-new-product",
  templateUrl: "./add-new-product.component.html",
  styleUrl: "./add-new-product.component.css",
  standalone: true,
  imports: [MatFormField, MatLabel, FormsModule, MatGridList],
})
export class AddNewProductComponent {
  isNewProduct = true;

  product: ProductRequest = {
    name: "",
    description: "",
    actualProductPrice: 0,
    discountedProductPrice: 0,
    // category?: Category;
    stock: 0,
    returnable: true,
    status: "AVAILABLE",
    newArrival: true,
    images: [],
  };

  productImages: FileHandle[] | undefined;

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.product = this.activatedRoute.snapshot.data['product'];
    // // if (this.product && this.product.id) {
    // if (this.product) {
    //   this.isNewProduct = false;
    //   // this.productImages = this.product.imageUrls;
    // }
  }

  addProduct(productForm: NgForm) {
    const formData = this.prepareFormDataForProduct(this.product);
    this.productService.addProduct(formData).subscribe(
      (response: ProductRequest) => {
        productForm.reset();
        this.product.images = [];
        // this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormDataForProduct(product: ProductRequest): FormData {
    const uploadImageData = new FormData();
    uploadImageData.append(
      "productJson",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    for (var i = 0; i < this.product.images.length; i++) {
      uploadImageData.append(
        "images",
        this.product.images[i].file,
        this.product.images[i].filename
      );
    }
    console.log(uploadImageData.forEach((i) => i.toString));

    return uploadImageData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileUpload: FileHandle = {
        file: file,
        filename: file.name,
        url: file.url,
      };
      this.product.images?.push(fileUpload);

      // this.productImages?.push(fileUpload);

      // const fileHandle: FileHandle = {
      //   file: file,
      //   url: this.sanitizer.bypassSecurityTrustUrl(
      //     window.URL.createObjectURL(file)
      //   ),
      // };
      // this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.product.images.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.images.push(fileHandle);
  }
}
