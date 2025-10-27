import { Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FileHandle } from "./_model/file-handle.model.js";
import { Product } from "./_model/product.model.js";

@Injectable({
  providedIn: "root",
})
export class ImageProcessingServiceURI {
  constructor(private sanitizer: DomSanitizer) {}

  // Convert a single URL to FileHandle
  //   async convertUrlToFileHandle(imageUrl: string): Promise<FileHandle> {
  //     const fileName = imageUrl.split("/").pop() || "image.jpg";
  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();
  //     const file = new File([blob], fileName, { type: blob.type });
  //     const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
  //       URL.createObjectURL(file)
  //     );
  //     return { file, url: safeUrl };
  //   }

  /**
   * Convert image URLs to FileHandle[] with local blob URLs
   */
  public async createFileHandlesFromUrls(
    urls: string[]
  ): Promise<FileHandle[]> {
    const fileHandles: FileHandle[] = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const fileName = url.split("/").pop() || `image-${i}.png`;

      // Fetch the image as blob
      const response = await fetch(url);
      const blob = await response.blob();

      // Create File object
      const file = new File([blob], fileName, {
        type: blob.type || "image/png",
      });

      // Create FileHandle with local blob URL
      fileHandles.push({
        file,
        url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)),
      });
    }

    return fileHandles;
  }

  async convertUrlToFileHandle(imageUrl: string): Promise<FileHandle> {
    const fileName = imageUrl.split("/").pop() || "image.jpg";
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Make sure the blob has correct type
    const mimeType = blob.type || "image/png"; // fallback
    const file = new File([blob], fileName, { type: mimeType });

    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(file)
    );

    return { file, url: safeUrl };
  }

  // New method for URLs only
  public async createFileHandlesFromUrlsNew(
    urls: string[]
  ): Promise<FileHandle[]> {
    const fileHandles: FileHandle[] = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const fileName = url.split("/").pop() || `image-${i}.png`;

      // Fetch image as blob
      const response = await fetch(url);
      const blob = await response.blob();

      const file = new File([blob], fileName, {
        type: blob.type || "image/png",
      });

      fileHandles.push({
        file,
        url: URL.createObjectURL(file), // plain string like legacy
      });
    }

    return fileHandles;
  }

  // Convert an array of URLs (string[]) to FileHandle[]
  async convertUrlsToFileHandles(imageUrls: string[]): Promise<FileHandle[]> {
    const promises = imageUrls.map((url) => this.convertUrlToFileHandle(url));
    return Promise.all(promises);
  }

  public async createImages(product: Product) {
    try {
      const productImages: any[] = product.imageUrls;

      let productImagesToFileHandle: FileHandle[] = [];

      console.log(
        "Entered Image To Uri *****************************************************************"
      );

      productImagesToFileHandle = await this.createFileHandlesFromUrlsNew(
        product.imageUrls
      );

      //   for (let i = 0; i < productImages.length; i++) {
      //     var file = await this.convertUrlToFileHandle(productImages[i]);
      //     productImagesToFileHandle.push(file);
      //   }
      product.productImages = productImagesToFileHandle;
      //   product.imageUrls = [];
    } catch (e) {
      console.log("Image To Uri Error" + e);
      // product.productImages = product.imageUrl;
    } finally {
      return product;
    }
  }
}
