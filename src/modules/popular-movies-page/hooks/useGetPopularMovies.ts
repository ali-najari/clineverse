"use client"

import { API_ROUTES } from "@/shared/api";
import { useQueryApi } from "@/utils/services/useQueryApi";
import { PopularMoviesResponse } from "../models";

export const POPULAR_MOVIES_QUERY_KEY = "popular-movies";

export const useGetPopularMovies = () => {
  return useQueryApi<PopularMoviesResponse>({
    queryKey: [POPULAR_MOVIES_QUERY_KEY],
    url: API_ROUTES.get_popular_movie,
    options: {
      staleTime: 1000 * 60 * 15,
    },
  });
};
