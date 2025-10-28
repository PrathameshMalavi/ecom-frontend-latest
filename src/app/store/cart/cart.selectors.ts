import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "../main.store";

export const selectCartState = createFeatureSelector<CartState>("cart");

export const selectCartDetails = createSelector(
  selectCartState,
  (state) => state.cartDetails
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state) => state.loading
);

export const selectCartSize = createSelector(
  selectCartState,
  (state) => state.size
);
