import { Component, Input } from "@angular/core";

@Component({
  selector: "app-carousel-banner",
  template: `
    <div class="banner-container" *ngIf="url">
      <img [src]="url" alt="Carousel Banner" class="banner-image" />
    </div>
  `,
  styles: [
    `
      .banner-container {
        width: 100%;
        height: 300px;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f4f4f4;
      }

      .banner-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .banner-image:hover {
        transform: scale(1.02);
      }

      @media (max-width: 768px) {
        .banner-container {
          height: 200px;
        }
      }
    `,
  ],
})
export class CarouselBannerComponent {
  @Input() url!: string;
}
