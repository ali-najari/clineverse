interface TrendingMovieBase {
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

export interface TrendingMovieResult extends TrendingMovieBase {
  media_type: "movie";
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface TrendingMoviesResponse {
  page: number;
  results: TrendingMovieResult[];
  total_pages: number;
  total_results: number;
}
