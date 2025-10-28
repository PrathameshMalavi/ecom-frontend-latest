import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CartActions from "./cart.actions";
import { ProductService } from "../../_services/product.service";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap(() =>
        this.productService.getCartDetails().pipe(
          map((cartDetails: any[]) =>
            CartActions.loadCartSuccess({ cartDetails })
          ),
          catchError((error) => of(CartActions.loadCartFailure({ error })))
        )
      )
    )
  );

  deleteCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.deleteCartItem),
      mergeMap(({ cartId }) =>
        this.productService.deleteCartItem(cartId).pipe(
          map(() => CartActions.deleteCartItemSuccess({ cartId })),
          catchError((error) =>
            of(CartActions.deleteCartItemFailure({ error }))
          )
        )
      )
    )
  );

  addCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addCartItem),
      mergeMap(({ item }) =>
        this.productService.addToCart(item).pipe(
          map((newItem) => CartActions.addCartItemSuccess({ item: newItem })),
          catchError((error) => of(CartActions.addCartItemFailure({ error })))
        )
      )
    )
  );
}
