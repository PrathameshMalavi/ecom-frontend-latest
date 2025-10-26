import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, Observable } from "rxjs";
import { AddNewCategoryComponent } from "./add-new-category/add-new-category.component";
import { MatDialog } from "@angular/material/dialog";
import { CategoryResponse } from "../../a_temp/models/Category.model";
import { CategoryService } from "../../a_temp/services/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrl: "./category.component.css",
})
export class CategoryComponent {
  categories$!: Observable<CategoryResponse[]>;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

  viewCategory(cat: CategoryResponse) {
    console.log("View", cat);
  }

  updateCategory(cat: CategoryResponse) {
    console.log("Update", cat);
  }

  deleteCategory(cat: CategoryResponse) {
    console.log("Delete", cat);
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(AddNewCategoryComponent, {
      width: "80%",
      height: "70%",
      disableClose: false, // Allows the dialog to close on outside click or ESC
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Dialog closed by submit—e.g., refresh data
        this.getCategories();
      } else {
        // Dialog was dismissed/canceled, or closed by clicking outside/ESC
      }
    });
  }

  // ngOnInit(): void {
  //   this.categoryService.getCategories().subscribe({
  //     next: (data) => {
  //       this.categories = data;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       this.error = 'Failed to load categories';
  //       this.loading = false;
  //     },
  //   });
  // }
}
