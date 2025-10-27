import { createAction, props } from "@ngrx/store";
import { Carousel } from "../../_model/carousel-model";

// Load all
export const loadCarousels = createAction("[Carousel] Load Carousels");
export const loadCarouselsSuccess = createAction(
  "[Carousel] Load Carousels Success",
  props<{ carousels: Carousel[] }>()
);
export const loadCarouselsFailure = createAction(
  "[Carousel] Load Carousels Failure",
  props<{ error: string }>()
);

// Add
export const addCarousel = createAction(
  "[Carousel] Add Carousel",
  props<{ carousel: Carousel }>()
);
export const addCarouselSuccess = createAction(
  "[Carousel] Add Carousel Success",
  props<{ carousel: Carousel }>()
);
export const addCarouselFailure = createAction(
  "[Carousel] Add Carousel Failure",
  props<{ error: string }>()
);

// Update
export const updateCarousel = createAction(
  "[Carousel] Update Carousel",
  props<{ id: number; carousel: Carousel }>()
);
export const updateCarouselSuccess = createAction(
  "[Carousel] Update Carousel Success",
  props<{ carousel: Carousel }>()
);
export const updateCarouselFailure = createAction(
  "[Carousel] Update Carousel Failure",
  props<{ error: string }>()
);

// Delete
export const deleteCarousel = createAction(
  "[Carousel] Delete Carousel",
  props<{ id: number }>()
);
export const deleteCarouselSuccess = createAction(
  "[Carousel] Delete Carousel Success",
  props<{ id: number }>()
);
export const deleteCarouselFailure = createAction(
  "[Carousel] Delete Carousel Failure",
  props<{ error: string }>()
);
