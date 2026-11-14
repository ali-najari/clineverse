"use client";

import { useQueryApi } from "@/utils/services/useQueryApi";
import { TMDBMediaResponse, MediaHeroItem } from "../models";
import mapMediaToHero from "@/utils/helpers/map-media-to-hero";
import { API_ROUTES } from "@/shared/api";

type MediaType = "movies" | "tv-shows";

export const TRENDING_MOVIES_QUERY_KEY_WEEKLY = "trending-movies-weekly";
export const TRENDING_TV_QUERY_KEY_WEEKLY = "trending-tv-weekly";

interface UseMediaHeroProps {
  type: MediaType;
}

const useMediaHero = ({ type }: UseMediaHeroProps) => {
  const mediaType = type === "movies" ? "movie" : "tv";

  return useQueryApi<TMDBMediaResponse, MediaHeroItem[]>({
    queryKey: [`trending-${mediaType}-weekly`],

    url:
      mediaType === "movie"
        ? API_ROUTES.get_trending_movie_weekly
        : API_ROUTES.get_trending_tv_shows_weekly,

    options: {
      select: (data) => mapMediaToHero(data.results, mediaType),
      staleTime: 1000 * 60 * 15,
    },
  });
};

export default useMediaHero;