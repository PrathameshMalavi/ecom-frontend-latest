import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  template: `
    <div class="search-container">
      <mat-icon class="search-icon">search</mat-icon>
      <input
        type="text"
        [placeholder]="displayMsg"
        #searchInput
        (keyup)="onSearch(searchInput.value)"
      />
      <button
        mat-icon-button
        color="primary"
        (click)="onSearch(searchInput.value)"
      >
        <mat-icon>arrow_forward</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      .search-container {
        display: flex;
        align-items: center;
        width: 100%;
        background: #fff;
        border-radius: 50px;
        padding: 10px 18px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        margin-bottom: 24px; /* spacing from elements below */
      }

      .search-container:hover {
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }

      .search-container input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 1rem;
        background: transparent;
        padding: 8px 10px;
      }

      .search-icon {
        color: #757575;
        font-size: 24px;
      }

      .search-container button {
        background-color: #1976d2;
        color: white;
        border-radius: 50%;
        transition: background-color 0.3s ease, transform 0.2s ease;
      }

      .search-container button:hover {
        background-color: #1565c0;
        transform: scale(1.05);
      }

      @media (max-width: 600px) {
        .search-container {
          padding: 8px 14px;
          margin-bottom: 20px;
        }

        .search-container input {
          font-size: 0.95rem;
        }
      }
    `,
  ],
})
export class SearchBarComponent {
  @Input({ required: true }) displayMsg: string;
  @Output() search = new EventEmitter<string>();

  onSearch(keyword: string): void {
    this.search.emit(keyword.trim());
  }
}
