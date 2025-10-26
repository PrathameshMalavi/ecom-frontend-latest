import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category, CategoryResponse } from '../models/Category.model';
import { api } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  addCategory(category: Category, file: File): Observable<Category> {
    const formData = new FormData();

    // Attach JSON as string
    formData.append(
      'category',
      new Blob([JSON.stringify(category)], { type: 'application/json' })
    );

    // Attach file
    if (file) {
      formData.append('imageFile', file, file.name);
    }

    return this.http.post<Category>(api.postCategory, formData);
  }

  //   getCategories(): Observable<Category[]> {
  //     return this.http.get<Category[]>(api.getListCategory);
  //   }

  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(api.getListCategory).pipe(
  //     map((categories: any[]) =>
  //       categories.map((cat) => ({
  //         ...cat,
  //         imageBase64: cat.image ? this.convertToBase64(cat.image) : null,
  //       }))
  //     )
  //   );
  // }

  getCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(api.getListCategory).pipe(
      map((categories) =>
        categories.map((cat) => ({
          ...cat,
          image: cat.image
            ? {
                ...cat.image,
                base64: cat.image.data
                  ? this.convertToBase64(cat.image.data, cat.image.type)
                  : null,
              }
            : null,
        }))
      )
    );
  }

  private convertToBase64(byteArray: number[], type: string): string {
    let binary = '';
    const bytes = new Uint8Array(byteArray);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:${type};base64,${btoa(binary)}`;
  }
}
