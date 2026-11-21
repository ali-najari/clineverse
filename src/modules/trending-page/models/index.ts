
interface TrendingMediaBase {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface TrendingMovieResult extends TrendingMediaBase {
  media_type: "movie";
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface TrendingTVResult extends TrendingMediaBase {
  media_type: "tv";
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export type TrendingMediaResult =
  | TrendingMovieResult
  | TrendingTVResult;

export interface TrendingMediaResponse {
  page: number;
  results: TrendingMediaResult[];
  total_pages: number;
  total_results: number;
}

export type TrendingMediaType = "movie" | "tv";

export type TrendingTimeWindow = "day" | "week";
