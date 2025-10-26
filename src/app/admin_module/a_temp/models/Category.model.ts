import { Image } from './Image.model';

export interface Category {
  name: string;
  description: string;
  image?: any;
}

export interface CategoryResponse {
  id: number;
  name: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  description: string;
  // image: Image;
  image?: Image | null;
}
