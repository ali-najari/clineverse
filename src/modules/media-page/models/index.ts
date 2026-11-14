export interface TMDBMedia {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
}

export interface TMDBMediaResponse {
  page: number;
  results: TMDBMedia[];
  total_pages: number;
  total_results: number;
}

export interface MediaHeroItem {
  id: number;
  title: string;
  overview: string;
  backdropUrl: string;
  voteAverage: number;
  releaseDate: string;
  mediaType: "movie" | "tv";
  detailsUrl: string;
  trailerUrl?: string;
}

export type MediaSectionType =
  | "popular"
  | "top-rated"
  | "trending"
  | "up-coming";

export interface MediaSectionItem {
  id: number;
  title: string;
  posterUrl: string;
  voteAverage: number;
  releaseDate?: string;
  detailsUrl: string;
}

export interface MediaSectionProps {
  title: string;
  type: MediaSectionType;
  items: MediaSectionItem[];
  isLoading?: boolean;
  viewAllUrl?: string;
  viewAllLabel?: string;
}