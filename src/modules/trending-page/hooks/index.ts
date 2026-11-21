
import { API_ROUTES } from "@/shared/api";
import { useQueryApi } from "@/utils/services/useQueryApi";

import {
  TrendingMediaResponse,
  TrendingMediaType,
  TrendingTimeWindow,
} from "../models";

export const TRENDING_MOVIES_QUERY_KEY_DAILY =
  "trending-movies-daily";

export const TRENDING_MOVIES_QUERY_KEY_WEEKLY =
  "trending-movies-weekly";

export const TRENDING_TV_SHOWS_QUERY_KEY_DAILY =
  "trending-tv_shows-daily";

export const TRENDING_TV_SHOWS_QUERY_KEY_WEEKLY =
  "trending-tv_shows-weekly";

interface UseGetTrendingMediaProps {
  mediaType: TrendingMediaType;
  timeWindow?: TrendingTimeWindow;
}

const useGetTrendingMedia = ({
  mediaType,
  timeWindow = "week",
}: UseGetTrendingMediaProps) => {
  const isMovie = mediaType === "movie";
  const isDaily = timeWindow === "day";

  const url = isMovie
    ? isDaily
      ? API_ROUTES.get_trending_movie_daily
      : API_ROUTES.get_trending_movie_weekly
    : isDaily
      ? API_ROUTES.get_trending_tv_shows_daily
      : API_ROUTES.get_trending_tv_shows_weekly;

  const queryKey = isMovie
    ? isDaily
      ? TRENDING_MOVIES_QUERY_KEY_DAILY
      : TRENDING_MOVIES_QUERY_KEY_WEEKLY
    : isDaily
      ? TRENDING_TV_SHOWS_QUERY_KEY_DAILY
      : TRENDING_TV_SHOWS_QUERY_KEY_WEEKLY;

  return useQueryApi<TrendingMediaResponse>({
    queryKey: [queryKey],
    url,
    options: {
      staleTime: 1000 * 60 * 15,
    },
  });
};

export default useGetTrendingMedia;
