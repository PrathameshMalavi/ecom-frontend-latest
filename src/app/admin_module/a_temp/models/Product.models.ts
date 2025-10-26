// export interface Product {
//   productId: string | null;
//   productName: string | '';
//   productDescription: '';
//   productDiscountedPrice: 0;
//   productActualPrice: 0;
//   productImages: [];
// }

import { Category } from './Category.model';
import { SafeUrl } from '@angular/platform-browser';
import { FileHandle } from './FileUpload';

export interface OriginLocation {
  latitude: number | null;
  longitude: number | null;
}

// export interface ImageUrl {
//   id: number;
//   url: string;
//   fileName?: string;
// }

export interface FeedBack {
  id: number;
  userId: number;
  rating: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductStatus =
  | 'AVAILABLE'
  | 'COMING_SOON'
  | 'OUT_OF_STOCK'
  | 'DISCONTINUED';

export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  actualProductPrice: number;
  discountedProductPrice: number;
  prevProductPrice?: number;
  origin?: OriginLocation[]; // can be null or empty
  imageUrls?: string[];
  category?: Category;
  feedback?: FeedBack[];
  stock: number;
  returnable: boolean;
  status: ProductStatus;
  newArrival: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductRequest {
  // productId: string | '';
  name: string | '';
  description: string | '';
  actualProductPrice: number | 0;
  discountedProductPrice: number | 0;
  origin?: OriginLocation[]; // can be null or empty
  category?: Category;
  stock: number;
  returnable: boolean | true;
  status: ProductStatus | 'AVAILABLE';
  newArrival: boolean | true;
  // imageUrls?: string[];
  images: FileHandle[];
}
