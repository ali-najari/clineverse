"use client";

import { API_ROUTES } from "@/shared/api";
import { useQueryApi } from "@/utils/services/useQueryApi";
import { MediaDetailsResult } from "../models";

export const MOVIE_DETAILS = "movie-details";
export const TV_SHOW_DETAILS = "tv-show-details";

export type MediaType = "movies" | "tv";

const useGetMediaDetails = (mediaType: MediaType, mediaId: number) => {
  const isMovie = mediaType === "movies";

  const query = useQueryApi<MediaDetailsResult>({
    queryKey: [isMovie ? MOVIE_DETAILS : TV_SHOW_DETAILS, mediaId],
    url: isMovie
      ? API_ROUTES.get_movie_details(mediaId)
      : API_ROUTES.get_tv_details(mediaId),
    options: {
      staleTime: 1000 * 60 * 15,
    },
  });

  return query;
};

export default useGetMediaDetails;
