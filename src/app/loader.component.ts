import { Component, Input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-loader",
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-overlay" *ngIf="loading">
      <mat-progress-spinner color="primary" mode="indeterminate" diameter="60">
      </mat-progress-spinner>
    </div>
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(2px);
        z-index: 2000;
      }
    `,
  ],
})
export class LoaderComponent {
  @Input({ required: true }) loading: boolean = false;
}
