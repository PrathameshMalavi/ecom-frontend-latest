import { Carousel } from "../../_model/carousel-model";

export interface CarouselState {
  carousels: Carousel[];
  loading: boolean;
  error: string | null;
}

export const initialCarouselState: CarouselState = {
  carousels: [],
  loading: false,
  error: null,
};
