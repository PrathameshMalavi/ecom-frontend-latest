import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment, oldapi } from "../enviroments";
import { Carousel } from "../_model/carousel-model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CaraouselService {
  constructor(private httpClient: HttpClient) {}

  getAllCaraousel(): Observable<Carousel[]> {
    return this.httpClient.get<Carousel[]>(oldapi.getAllCarousel, {
      withCredentials: true,
    });
  }

  addCaraousel(formData: FormData): Observable<Carousel> {
    return this.httpClient.post<Carousel>(oldapi.addCarousel, formData);
  }

  updateCarousel(id, formData: FormData): Observable<Carousel> {
    return this.httpClient.put<Carousel>(oldapi.updateCarousel + id, formData);
  }

  deleteCarousel(id): Observable<void> {
    return this.httpClient.delete<void>(oldapi.deleteCarousel + id);
  }
}
