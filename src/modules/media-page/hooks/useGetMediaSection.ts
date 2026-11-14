import { API_ROUTES } from "@/shared/api";
import { useQueryApi } from "@/utils/services/useQueryApi";
import { getImageUrl } from "@/utils/helpers/poster-path";

import {
  MediaSectionItem,
  MediaSectionType,
  TMDBMediaResponse,
} from "../models";

export type MediaType = "movies" | "tv";

interface UseGetMediaSectionProps {
  mediaType: MediaType;
  sectionType: MediaSectionType;
}

const getEndpoint = (
  mediaType: MediaType,
  sectionType: MediaSectionType
): string => {
  if (sectionType === "trending") {
    return mediaType === "movies"
      ? API_ROUTES.get_trending_movie_weekly
      : API_ROUTES.get_trending_tv_shows_weekly;
  }

  const endpoints = {
    movies: {
      popular: API_ROUTES.get_popular_movie,
      "top-rated": API_ROUTES.get_top_rated_movie,
      "up-coming": API_ROUTES.get_upcoming_movie,
    },

    tv: {
      popular: API_ROUTES.get_popular_tv,
      "top-rated": API_ROUTES.get_top_rated_tv,
      "up-coming": API_ROUTES.get_on_the_air_tv,
    },
  };

  return endpoints[mediaType][sectionType];
};

const useGetMediaSection = ({
  mediaType,
  sectionType,
}: UseGetMediaSectionProps) => {
  return useQueryApi<TMDBMediaResponse, MediaSectionItem[]>({
    queryKey: ["media-section", mediaType, sectionType],
    url: getEndpoint(mediaType, sectionType),

    options: {
      staleTime: 1000 * 60 * 15,

      select: (data) =>
        data.results.map((item) => ({
          id: item.id,
          title: item.title ?? item.name ?? "Untitled",

          posterUrl: item.poster_path
            ? getImageUrl(item.poster_path, "w500")
            : "",

          voteAverage: item.vote_average,

          releaseDate: item.release_date ?? item.first_air_date,

          detailsUrl: `/media/${mediaType}/${item.id}`,
        })),
    },
  });
};

export default useGetMediaSection;