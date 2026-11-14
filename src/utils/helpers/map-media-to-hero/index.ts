import {
  TMDBMedia,
  MediaHeroItem,
} from "@/modules/media-page/models";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const mapMediaToHero = (
  results: TMDBMedia[],
  mediaType: "movie" | "tv"
): MediaHeroItem[] => {
  return results
    .filter((item) => item.backdrop_path && item.overview)
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      title: item.title ?? item.name ?? "Untitled",
      overview: item.overview,
      backdropUrl: `${IMAGE_BASE_URL}${item.backdrop_path}`,
      voteAverage: item.vote_average,
      releaseDate: item.release_date ?? item.first_air_date ?? "",
      mediaType,
      detailsUrl: `/media/${
        mediaType === "movie" ? "movies" : "tv-shows"
      }/${item.id}`,
    }));
};

export default mapMediaToHero;