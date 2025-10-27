import { inject, Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CarouselActions from "./carousel.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { CaraouselService } from "../../_services/caraousel.service";

@Injectable()
export class CarouselEffects {
  // private actions$ = inject(Actions);
  private actions$ = inject(Actions);

  constructor(
    // private actions$: Actions,
    private carouselService: CaraouselService
  ) {}

  loadCarousels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarouselActions.loadCarousels),
      mergeMap(() =>
        this.carouselService.getAllCaraousel().pipe(
          map((carousels) =>
            CarouselActions.loadCarouselsSuccess({ carousels })
          ),
          catchError((error) =>
            of(CarouselActions.loadCarouselsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // addCarousel$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CarouselActions.addCarousel),
  //     mergeMap(({ carousel }) =>
  //       this.carouselService.addCaraousel(carousel).pipe(
  //         map((newCarousel) =>
  //           CarouselActions.addCarouselSuccess({ carousel: newCarousel })
  //         ),
  //         catchError((error) =>
  //           of(CarouselActions.addCarouselFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );

  // updateCarousel$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CarouselActions.updateCarousel),
  //     mergeMap(({ id, carousel }) =>
  //       this.carouselService.updateCarousel(id, carousel).pipe(
  //         map((updated) =>
  //           CarouselActions.updateCarouselSuccess({ carousel: updated })
  //         ),
  //         catchError((error) =>
  //           of(CarouselActions.updateCarouselFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );

  deleteCarousel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarouselActions.deleteCarousel),
      mergeMap(({ id }) =>
        this.carouselService.deleteCarousel(id).pipe(
          map(() => CarouselActions.deleteCarouselSuccess({ id })),
          catchError((error) =>
            of(CarouselActions.deleteCarouselFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
