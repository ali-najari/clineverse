"use client";

import { API_ROUTES } from "@/shared/api";
import { useQueryApi } from "@/utils/services/useQueryApi";
import { MediaCreditsResult } from "../models";

export const MOVIE_CREDITS = "movie-credits";
export const TV_SHOW_CREDITS = "tv-show-credits";

export type MediaType = "movies" | "tv";

const useGetMediaCredits = (mediaType: MediaType, mediaId: number) => {
  const isMovie = mediaType === "movies";

  const query = useQueryApi<MediaCreditsResult >({
    queryKey: [isMovie ? MOVIE_CREDITS : TV_SHOW_CREDITS, mediaId],
    url: isMovie
      ? API_ROUTES.get_movie_credits(mediaId)
      : API_ROUTES.get_tv_credits(mediaId),
    options: {
      staleTime: 1000 * 60 * 15,
    },
  });

  return query;
};

export default useGetMediaCredits;
