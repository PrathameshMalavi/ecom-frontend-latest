import { Component, Inject, isStandalone } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";

@Component({
  standalone: true,
  template: `
    <div class="dialog-container">
      <button mat-icon-button class="close-btn" (click)="dialogRef.close()">
        <mat-icon>close</mat-icon>
      </button>
      <div class="image-container">
        <img [src]="data.imageUrl" alt="Product Image" class="dialog-image" />
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        position: relative;
        background: #fff;
        padding: 16px;
        border-radius: 12px;
        text-align: center;
        max-width: 100%;
      }
      .close-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
      }
      .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 80vh;
      }
      .dialog-image {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 8px;
        box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
        object-fit: contain;
      }
    `,
  ],
  imports: [MatIcon],
})
export class ImageDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }
  ) {}
}
