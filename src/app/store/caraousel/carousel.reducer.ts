import { createReducer, on } from "@ngrx/store";
import * as CarouselActions from "./carousel.actions";
import { CarouselState } from "../main.store";

export const initialCarouselState: CarouselState = {
  carousels: [],
  loading: false,
  error: null,
};

export const carouselReducer = createReducer(
  initialCarouselState,

  // Load
  on(CarouselActions.loadCarousels, (state) => ({ ...state, loading: true })),
  on(CarouselActions.loadCarouselsSuccess, (state, { carousels }) => ({
    ...state,
    loading: false,
    carousels,
  })),
  on(CarouselActions.loadCarouselsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add
  on(CarouselActions.addCarouselSuccess, (state, { carousel }) => ({
    ...state,
    carousels: [...state.carousels, carousel],
  })),

  // Update
  on(CarouselActions.updateCarouselSuccess, (state, { carousel }) => ({
    ...state,
    carousels: state.carousels.map((c) =>
      c.id === carousel.id ? carousel : c
    ),
  })),

  // Delete
  on(CarouselActions.deleteCarouselSuccess, (state, { id }) => ({
    ...state,
    carousels: state.carousels.filter((c) => c.id !== id),
  }))
);
