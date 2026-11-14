import { API_ROUTES } from "@/shared/api";
import { useQueryApi } from "@/utils/services/useQueryApi";
import { TrendingMoviesResponse } from "../models";

export const TRENDING_MOVIES_QUERY_KEY_DAILY = "trending-movies-daily";
export const TRENDING_MOVIES_QUERY_KEY_WEEKLY = "trending-movies-weekly";

export type TrendingTimeWindow = "day" | "week";

const useGetTrendingMovies = (timeWindow: TrendingTimeWindow = "week") => {
  const isDaily = timeWindow === "day";

  const query = useQueryApi<TrendingMoviesResponse>({
    queryKey: [
      isDaily
        ? TRENDING_MOVIES_QUERY_KEY_DAILY
        : TRENDING_MOVIES_QUERY_KEY_WEEKLY,
    ],
    url: isDaily
      ? API_ROUTES.get_trending_movie_daily
      : API_ROUTES.get_trending_movie_weekly,
    options: {
      staleTime: 1000 * 60 * 15,
    },
  });

  return query;
};

export default useGetTrendingMovies;
