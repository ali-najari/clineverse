"use client";

import HomeHero from "./components/home-hero";
import MediaSection from "@/modules/media-page/components/media-section";

import useHomeData from "./hooks/useHomeData";

import styles from "./styles.module.scss";

const HomePageModule = () => {
  const {
    heroItems,
    isHeroLoading,
    isHeroError,

    popularMovies,
    popularTV,
    topRatedMovies,
    upcomingMovies,

    isPopularMoviesLoading,
    isPopularTVLoading,
    isTopRatedLoading,
    isUpcomingLoading,
  } = useHomeData();

  return (
    <main className={styles.homePage}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>
          YOUR CINEMATIC UNIVERSE
        </span>

        <h1>
          Discover Your Next
          <span> Favorite Story.</span>
        </h1>

        <p>
          Explore movies and TV shows worth watching.
        </p>
      </div>

      {/* Featured Hero */}
      {!isHeroLoading &&
        !isHeroError &&
        heroItems.length > 0 && (
          <HomeHero items={heroItems} />
        )}

      {/* Popular Movies */}
      <MediaSection
        title="Popular Movies"
        type="popular"
        items={popularMovies}
        isLoading={isPopularMoviesLoading}
        viewAllUrl="/popular/movies"
        viewAllLabel="Explore Movies"
      />

      {/* Popular TV Shows */}
      <MediaSection
        title="Popular TV Shows"
        type="popular"
        items={popularTV}
        isLoading={isPopularTVLoading}
        viewAllUrl="/popular/tv"
        viewAllLabel="Explore TV Shows"
      />

      {/* Top Rated */}
      <MediaSection
        title="Top Rated Movies"
        type="top-rated"
        items={topRatedMovies}
        isLoading={isTopRatedLoading}
      />

      {/* Upcoming */}
      <MediaSection
        title="Coming Soon"
        type="up-coming"
        items={upcomingMovies}
        isLoading={isUpcomingLoading}
      />
    </main>
  );
};

export default HomePageModule;