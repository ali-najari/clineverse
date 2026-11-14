interface TrendingTVBase {
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

export interface TrendingTVResult extends TrendingTVBase {
  media_type: "tv";
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export interface TrendingTVResponse {
  page: number;
  results: TrendingTVResult[];
  total_pages: number;
  total_results: number;
}
