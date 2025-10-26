import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../../../a_temp/services/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./add-new-category.component.html",
  styleUrl: "./add-new-category.component.css",
})
export class AddNewCategoryComponent {
  categoryForm: FormGroup;
  selectedFile: File | null = null;
  successMessage: string = "";
  errorMessage: string = "";

  selectedImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      imageFile: [null],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    // if (file) {
    //   this.selectedFile = file;
    // }
    if (file) {
      this.selectedFile = file;

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.categoryForm.invalid) {
      return;
    }

    const categoryData = {
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description,
    };

    this.categoryService
      .addCategory(categoryData, this.selectedFile!)
      .subscribe({
        next: (res) => {
          this.successMessage = "Category added successfully!";
          this.errorMessage = "";
          this.categoryForm.reset();
          this.selectedFile = null;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = "Failed to add category";
          this.successMessage = "";
        },
      });
  }
}
