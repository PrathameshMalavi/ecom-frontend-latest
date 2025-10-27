import { Component } from "@angular/core";
import { CaraouselService } from "../../_services/caraousel.service";
import { Carousel } from "../../_model/carousel-model";
import { CarouselComponentComponent } from "../carousel-component.component";
import { MatDialog } from "@angular/material/dialog";
import { AddCarouselComponent } from "../add-carousel/add-carousel.component";
import { CarouselBannerComponent } from "../carousel-view-componet";

@Component({
  selector: "app-manage-carousel",
  templateUrl: "./manage-carousel.component.html",
  styleUrl: "./manage-carousel.component.css",
})
export class ManageCarouselComponent {
  displayedColumns: string[] = [
    "id",
    "description",
    "imageUrl",
    "url",
    "actions",
  ];

  dataSource: Carousel[] = [];

  constructor(
    private dialog: MatDialog,
    private carouselService: CaraouselService
  ) {}

  ngOnInit(): void {
    this.loadCarousels();
  }

  loadCarousels(): void {
    this.carouselService.getAllCaraousel().subscribe({
      next: (data) => (this.dataSource = data),
      error: (err) => console.error("Error loading carousels", err),
    });
  }

  deleteCarousel(id?: number): void {
    if (!id) return;
    if (confirm("Are you sure you want to delete this carousel?")) {
      this.carouselService.deleteCarousel(id).subscribe({
        next: () => this.loadCarousels(), // reload after delete
        error: (err) => console.error("Delete failed", err),
      });
    }
  }

  // viewCarousel(carousel: Carousel): void {
  //   this.dialog.open(CarouselComponentComponent, {
  //     data: carousel,
  //     width: "400px",
  //   });
  // }

  viewCarousel(carousel: Carousel): void {
    const val = carousel.imageUrl;
    this.dialog.open(CarouselBannerComponent, {
      data: { val },
      panelClass: "carousel-dialog",
      width: "80vw",
      maxWidth: "900px",
    });
  }

  updateCarousel(carousel: Carousel): void {
    const dialogRef = this.dialog.open(CarouselComponentComponent, {
      data: carousel,
      width: "800px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "updated") {
        this.loadCarousels(); // reload after update
      }
    });
  }

  onAddClick(): void {
    const dialogRef = this.dialog.open(AddCarouselComponent, {
      width: "800px",
      height: "800px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "updated") {
        this.loadCarousels(); // reload after update
      }
    });
  }
}
