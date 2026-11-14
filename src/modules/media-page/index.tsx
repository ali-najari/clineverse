"use client";

import MediaHero from "./components/media-hero";
import MediaSection from "./components/media-section";

import useMediaHero from "./hooks/useHeroMedia";
import useGetMediaSection from "./hooks/useGetMediaSection";

import styles from "./styles.module.scss";

interface MediaPageModuleProps {
  type: "movies" | "tv-shows";
}

const MediaPageModule = ({ type }: MediaPageModuleProps) => {
  const mediaType = type === "movies" ? "movies" : "tv";
  const pageTitle = type === "movies" ? "Movies" : "TV Shows";

  // Hero
  const {
    data: heroItems,
    isLoading: isHeroLoading,
    isError: isHeroError,
  } = useMediaHero({ type });

  // Popular
  const { data: popularItems, isLoading: isPopularLoading } =
    useGetMediaSection({
      mediaType,
      sectionType: "popular",
    });

  // Top Rated
  const { data: topRatedItems, isLoading: isTopRatedLoading } =
    useGetMediaSection({
      mediaType,
      sectionType: "top-rated",
    });

  // Trending Weekly
  const { data: trendingItems, isLoading: isTrendingLoading } =
    useGetMediaSection({
      mediaType,
      sectionType: "trending",
    });

  // Upcoming / On The Air
  const { data: upcomingItems, isLoading: isUpcomingLoading } =
    useGetMediaSection({
      mediaType,
      sectionType: "up-coming",
    });

  return (
    <div className={styles.mainWrapper}>
      {/* Hero */}
      {!isHeroLoading && !isHeroError && heroItems?.length ? (
        <MediaHero items={heroItems} />
      ) : null}

      {/* Popular */}
      <MediaSection
        title={`Popular ${pageTitle}`}
        type="popular"
        items={popularItems ?? []}
        isLoading={isPopularLoading}
        viewAllUrl={`/popular`}
        viewAllLabel="Explore All Popular"
      />

      {/* Top Rated */}
      <MediaSection
        title={`Top Rated ${pageTitle}`}
        type="top-rated"
        items={topRatedItems ?? []}
        isLoading={isTopRatedLoading}
      />

      {/* Trending */}
      <MediaSection
        title={`Trending ${pageTitle}`}
        type="trending"
        items={trendingItems ?? []}
        isLoading={isTrendingLoading}
        viewAllUrl={`/trending/${mediaType}`}
        viewAllLabel="Explore All Trending"
      />

      {/* Upcoming / On The Air */}
      <MediaSection
        title={type === "movies" ? "Upcoming Movies" : "Currently Airing"}
        type="up-coming"
        items={upcomingItems ?? []}
        isLoading={isUpcomingLoading}
      />
    </div>
  );
};

export default MediaPageModule;
