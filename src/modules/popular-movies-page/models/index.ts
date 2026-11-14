import { TMDBMedia } from "@/modules/media-page/models";

export interface PopularMoviesResponse {
  page: number;
  results: TMDBMedia[];
  total_pages: number;
  total_results: number;
}