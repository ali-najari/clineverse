import { API_ROUTES } from "@/shared/api";
import { useQueryApi } from "@/utils/services/useQueryApi";
import { TrendingTVResponse } from "../models";

export const TRENDING_TV_SHOWS_QUERY_KEY_DAILY = "trending-tv_shows-daily";
export const TRENDING_TV_SHOWS_QUERY_KEY_WEEKLY = "trending-tv_shows-weekly";

export type TrendingTimeWindow = "day" | "week";

const useGetTrendingTVShows = (timeWindow: TrendingTimeWindow = "week") => {
  const isDaily = timeWindow === "day";

  const query = useQueryApi<TrendingTVResponse>({
    queryKey: [
      isDaily
        ? TRENDING_TV_SHOWS_QUERY_KEY_DAILY
        : TRENDING_TV_SHOWS_QUERY_KEY_WEEKLY,
    ],
    url: isDaily
      ? API_ROUTES.get_trending_tv_shows_daily
      : API_ROUTES.get_trending_tv_shows_weekly,
    options: {
      staleTime: 1000 * 60 * 15,
    },
  });

  return query;
};

export default useGetTrendingTVShows;
