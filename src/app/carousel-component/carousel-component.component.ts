import { Component, Input } from "@angular/core";
import { Carousel } from "../_model/carousel-model";
import { CaraouselService } from "../_services/caraousel.service";
import { DIR_DOCUMENT } from "@angular/cdk/bidi";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-carousel-component",
  templateUrl: "./carousel-component.component.html",
  styleUrl: "./carousel-component.component.css",
  // standalone: true,
})
export class CarouselComponentComponent {
  // @Input() items: Carousel[] = [];
  currentIndex = 0;
  size = 0;
  items: Carousel[] = [];
  intervalId?: any;

  constructor(private carouselService: CaraouselService) {}

  ngOnInit() {
    this.carouselService.getAllCaraousel().subscribe({
      next: (data) => {
        console.log("Carousel fetched:", data);
        this.items = data;
        this.size = this.items.length - 1;
        this.startAutoPlay();
      },
      error: (err) => {
        console.error("Error loading carousel", err);
      },
    });
  }

  // previous() {
  //   this.currentIndex =
  //     (this.currentIndex - 1 + this.items.length) % this.items.length;
  // }

  // next() {
  //   this.currentIndex = (this.currentIndex + 1) % this.items.length;
  // }
  ngOnDestroy(): void {
    this.clearAutoPlay();
  }

  previous(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.resetAutoPlay();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.resetAutoPlay();
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  clearAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetAutoPlay(): void {
    this.clearAutoPlay();
    this.startAutoPlay();
  }
}
