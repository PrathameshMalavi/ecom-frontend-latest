import { createAction, props } from "@ngrx/store";

export const loadCart = createAction("[Cart] Load Cart");
export const loadCartSuccess = createAction(
  "[Cart] Load Cart Success",
  props<{ cartDetails: any[] }>()
);
export const loadCartFailure = createAction(
  "[Cart] Load Cart Failure",
  props<{ error: any }>()
);

export const deleteCartItem = createAction(
  "[Cart] Delete Cart Item",
  props<{ cartId: number }>()
);
export const deleteCartItemSuccess = createAction(
  "[Cart] Delete Cart Item Success",
  props<{ cartId: number }>()
);
export const deleteCartItemFailure = createAction(
  "[Cart] Delete Cart Item Failure",
  props<{ error: any }>()
);

export const addCartItem = createAction(
  "[Cart] Add Cart Item",
  props<{ item: any }>()
);
export const addCartItemSuccess = createAction(
  "[Cart] Add Cart Item Success",
  props<{ item: any }>()
);
export const addCartItemFailure = createAction(
  "[Cart] Add Cart Item Failure",
  props<{ error: any }>()
);
