"use client";

import useGetMediaSection from "@/modules/media-page/hooks/useGetMediaSection";
import useMediaHero from "@/modules/media-page/hooks/useHeroMedia";

const useHomeData = () => {
  const {
    data: movieHero,
    isLoading: isMovieHeroLoading,
    isError: isMovieHeroError,
  } = useMediaHero({
    type: "movies",
  });

  const {
    data: tvHero,
    isLoading: isTVHeroLoading,
    isError: isTVHeroError,
  } = useMediaHero({
    type: "tv-shows",
  });

  const {
    data: popularMovies,
    isLoading: isPopularMoviesLoading,
  } = useGetMediaSection({
    mediaType: "movies",
    sectionType: "popular",
  });

  const {
    data: popularTV,
    isLoading: isPopularTVLoading,
  } = useGetMediaSection({
    mediaType: "tv",
    sectionType: "popular",
  });

  const {
    data: topRatedMovies,
    isLoading: isTopRatedLoading,
  } = useGetMediaSection({
    mediaType: "movies",
    sectionType: "top-rated",
  });

  const {
    data: upcomingMovies,
    isLoading: isUpcomingLoading,
  } = useGetMediaSection({
    mediaType: "movies",
    sectionType: "up-coming",
  });

  const heroItems = [
    ...(movieHero ?? []),
    ...(tvHero ?? []),
  ]
    .filter((item) => item.backdropUrl && item.overview)
    .slice(0, 6);

  return {
    heroItems,

    isHeroLoading:
      isMovieHeroLoading || isTVHeroLoading,

    isHeroError:
      isMovieHeroError || isTVHeroError,

    popularMovies: popularMovies ?? [],
    popularTV: popularTV ?? [],
    topRatedMovies: topRatedMovies ?? [],
    upcomingMovies: upcomingMovies ?? [],

    isPopularMoviesLoading,
    isPopularTVLoading,
    isTopRatedLoading,
    isUpcomingLoading,
  };
};

export default useHomeData;