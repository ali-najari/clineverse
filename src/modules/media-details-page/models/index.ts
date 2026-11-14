interface Genre {
  id: number;
  name: string;
}

interface BaseMediaDetails {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  original_language: string;
  genres: Genre[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  homepage: string | null;
  status: string;
  tagline: string;
}

export interface MovieDetailsResult extends BaseMediaDetails {
  title: string;
  original_title: string;
  release_date: string;
  runtime: number | null;
  budget: number;
  revenue: number;
  imdb_id: string | null;
}

export interface TVDetailsResult extends BaseMediaDetails {
  name: string;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  episode_run_time: number[];
  number_of_seasons: number;
  number_of_episodes: number;
}

export type MediaDetailsResult = MovieDetailsResult | TVDetailsResult;

export interface MediaCreditsResult {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number | undefined | null;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}
