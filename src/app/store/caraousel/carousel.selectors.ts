import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CarouselState } from "./carousel.state";

export const selectCarouselState =
  createFeatureSelector<CarouselState>("carousel");

export const selectAllCarousels = createSelector(
  selectCarouselState,
  (state) => state.carousels
);

export const selectCarouselLoading = createSelector(
  selectCarouselState,
  (state) => state.loading
);

export const selectCarouselError = createSelector(
  selectCarouselState,
  (state) => state.error
);
