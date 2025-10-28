import { CartState } from "../main.store";
import { createReducer, on } from "@ngrx/store";
import * as CartActions from "./cart.actions";

export const initialState: CartState = {
  cartDetails: [],
  loading: false,
  error: null,
  size: 0,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.loadCart, (state) => ({ ...state, loading: true })),
  on(CartActions.loadCartSuccess, (state, { cartDetails }) => ({
    ...state,
    loading: false,
    cartDetails,
    size: cartDetails.length,
  })),
  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    size: 0,
    error,
  })),

  on(CartActions.deleteCartItem, (state) => ({ ...state, loading: true })),
  on(CartActions.deleteCartItemSuccess, (state, { cartId }) => {
    const filteredCart = state.cartDetails.filter(
      (item) => item.cartId !== cartId
    );
    return {
      ...state,
      loading: false,
      cartDetails: filteredCart,
      size: filteredCart.length, // Update size after deletion
    };
  }),
  on(CartActions.deleteCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CartActions.addCartItem, (state) => ({
    ...state,
    loading: true,
  })),

  on(CartActions.addCartItemSuccess, (state, { item }) => ({
    ...state,
    loading: false,
    cartDetails: [...state.cartDetails, item], // Add new item
    size: state.size + 1, // Update size
  })),

  on(CartActions.addCartItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
