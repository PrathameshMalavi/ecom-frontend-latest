// import { Injectable } from "@angular/core";
// import { DomSanitizer } from "@angular/platform-browser";
// import { FileHandle } from "./_model/file-handle.model";
// import { Product } from "./_model/product.model";

// @Injectable({
//   providedIn: "root",
// })
// export class ImageProcessingService {
//   constructor(private sanitizer: DomSanitizer) {}

//   public createImages(product: Product) {
//     const productImages: any[] = product.productImages;

//     const productImagesToFileHandle: FileHandle[] = [];

//     for (let i = 0; i < productImages.length; i++) {
//       const imageFileData = productImages[i];

//       const imageBlob = this.dataURItoBlob(
//         imageFileData.picByte,
//         imageFileData.type
//       );

//       const imageFile = new File([imageBlob], imageFileData.name, {
//         type: imageFileData.type,
//       });

//       const finalFileHandle: FileHandle = {
//         file: imageFile,
//         url: this.sanitizer.bypassSecurityTrustUrl(
//           window.URL.createObjectURL(imageFile)
//         ),
//       };

//       productImagesToFileHandle.push(finalFileHandle);
//     }

//     product.productImages = productImagesToFileHandle;
//     return product;
//   }

//   public dataURItoBlob(picBytes, imageType) {
//     const byteString = window.atob(picBytes);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const int8Array = new Uint8Array(arrayBuffer);

//     for (let i = 0; i < byteString.length; i++) {
//       int8Array[i] = byteString.charCodeAt(i);
//     }

//     const blob = new Blob([int8Array], { type: imageType });
//     return blob;
//   }
// }

import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { FileHandle } from "./_model/file-handle.model";
import { Product } from "./_model/product.model";

@Injectable({
  providedIn: "root",
})
export class ImageProcessingService {
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Converts all product images from Base64 or data URI to FileHandle objects
   */
  public createImages(product: Product): Product {
    const productImages: any[] = product.productImages;
    const productImagesToFileHandle: FileHandle[] = [];

    for (const imageFileData of productImages) {
      // Convert Base64 / data URI to Blob
      const imageBlob = this.dataURItoBlob(
        imageFileData.picByte,
        imageFileData.type
      );

      // Create File from Blob
      const imageFile = new File([imageBlob], imageFileData.name, {
        type: imageFileData.type,
      });

      // Create FileHandle with Angular-safe URL
      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(imageFile)
        ),
      };

      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandle;
    return product;
  }

  /**
   * Converts Base64 string or full data URI to Blob
   * @param picBytes Base64 string or data URI
   * @param imageType MIME type of the image
   */
  public dataURItoBlob(picBytes: string, imageType: string): Blob {
    // If picBytes is a full data URI, remove the prefix
    const base64 = picBytes.includes(",") ? picBytes.split(",")[1] : picBytes;

    // Decode Base64 to binary string
    const byteString = atob(base64);

    // Convert binary string to Uint8Array
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    // Return as Blob
    return new Blob([int8Array], { type: imageType });
  }
}
