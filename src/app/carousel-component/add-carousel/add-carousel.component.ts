import { Component } from "@angular/core";
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { CaraouselService } from "../../_services/caraousel.service";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { Carousel } from "../../_model/carousel-model";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-carousel",
  providers: [CaraouselService],
  templateUrl: "./add-carousel.component.html",
  styleUrl: "./add-carousel.component.css",
})
export class AddCarouselComponent {
  carouselForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer = "";

  carousel: Carousel = {
    id: null,
    imageUrl: "",
    description: "",
    url: "",
  };
  newCarousel: boolean = true;

  constructor(
    private fb: FormBuilder,
    private carouselService: CaraouselService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<AddCarouselComponent>
  ) {
    // this.carouselForm = this.fb.group({
    //   url: ["", Validators.required],
    //   description: ["", Validators.required],
    //   image: [null, Validators.required],
    // });
  }

  ngOnInit(): void {
    this.carousel = this.activatedRoute.snapshot.data["carousel"];
    if (this.carousel && this.carousel.id) {
      this.newCarousel = false;
      this.carouselForm = this.fb.group({
        url: [this.carousel.url, Validators.required],
        description: [this.carousel.description, Validators.required],
        image: [this.carousel.imageUrl, Validators.required],
      });
    } else {
      this.carouselForm = this.fb.group({
        url: ["", Validators.required],
        description: ["", Validators.required],
        image: [null, Validators.required],
      });
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.carouselForm.patchValue({ image: this.selectedFile }); // ✅ sync with form

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result ?? "";
        console.log("Preview generated");
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      console.warn("No file selected ");
    }
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit(): void {
    if (this.carouselForm.invalid || !this.selectedFile) {
      alert("Please complete all fields.");
      return;
    }

    console.log("Entered the submit");

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    let carId;
    let carImgUrl;

    if (this.newCarousel) {
      carId = null;
      carImgUrl = "";
    } else {
      carId = this.carousel.id;
      carImgUrl = this.carousel.imageUrl;
    }

    const newCarouselObj: Carousel = {
      id: carId,
      imageUrl: carImgUrl,
      url: this.carouselForm.get("url")?.value,
      description: this.carouselForm.get("description")?.value,
    };

    console.log("Appended data the submit");

    formData.append(
      "caraousel",
      new Blob([JSON.stringify(newCarouselObj)], { type: "application/json" })
    );

    this.carouselService.addCaraousel(formData).subscribe({
      next: () => {
        console.log("Carousel added successfully (check console)");
        this.carouselForm.reset();
        this.selectedFile = null;
        this.previewUrl = "";
        // this.router.navigate()
      },
      error: (err) => {
        console.error(err);
      },
    });
    console.log("FormData ready ✅", formData);
  }
}
