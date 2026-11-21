
"use client";

import { useState } from "react";
import { FiTrendingUp, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

import CategoryCards from "@/shared/components/category-cards";
import MovieCards from "@/modules/media-page/components/media-cards";

import { getImageUrl } from "@/utils/helpers/poster-path";

import useGetTrendingMedia from "./hooks";
import { Categories } from "./constants";

import {
  TrendingMediaResult,
  TrendingTimeWindow,
} from "./models";

import styles from "./styles.module.scss";

const TrendingPageModule = () => {
  const [timeWindow, setTimeWindow] =
    useState<TrendingTimeWindow>("week");

  const trendingMovies = useGetTrendingMedia({
    mediaType: "movie",
    timeWindow,
  });

  const trendingTV = useGetTrendingMedia({
    mediaType: "tv",
    timeWindow,
  });

  const movieResults = trendingMovies.data?.results ?? [];
  const tvResults = trendingTV.data?.results ?? [];

  const snapshot: TrendingMediaResult[] = [
    ...movieResults,
    ...tvResults,
  ]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);

  const getTitle = (media: TrendingMediaResult) => {
    return "title" in media ? media.title : media.name;
  };

  const getHref = (media: TrendingMediaResult) => {
    return media.media_type === "movie"
      ? `/media/movies/${media.id}`
      : `/media/tv/${media.id}`;
  };

  return (
    <main className={styles.mainWrapper}>
      {/* Introduction */}

      <section className={styles.intro}>
        <div className={styles.introContent}>
          <span className={styles.eyebrow}>
            <FiTrendingUp />
            DISCOVER WHATS POPULAR
          </span>

          <h1>
            Trending <span>Now.</span>
          </h1>

          <p>
            Explore the movies and TV shows capturing
            everyone`s attention.
          </p>
        </div>

        <div className={styles.timeFilter}>
          <span>TIME PERIOD</span>

          <div className={styles.filterOptions}>
            <button
              type="button"
              className={
                timeWindow === "day" ? styles.active : ""
              }
              onClick={() => setTimeWindow("day")}
            >
              Today
            </button>

            <button
              type="button"
              className={
                timeWindow === "week" ? styles.active : ""
              }
              onClick={() => setTimeWindow("week")}
            >
              This Week
            </button>
          </div>
        </div>
      </section>

      {/* Main Categories */}

      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              EXPLORE COLLECTIONS
            </span>

            <h2>Choose Your World</h2>
          </div>

          <span className={styles.sectionDescription}>
            Movies or TV Shows?
          </span>
        </div>

        <div className={styles.categoriesGrid}>
          {Categories.map((category) => (
            <CategoryCards
              key={category.mediaType}
              title={category.title}
              description={category.description}
              eyebrow={category.eyebrow}
              icon={category.icon}
              link={category.link}
              accent={category.accent}
            />
          ))}
        </div>
      </section>

      {/* Trending Snapshot */}

      <section className={styles.snapshotSection}>
        <div className={styles.snapshotHeader}>
          <div>
            <span className={styles.sectionEyebrow}>
              THE CURRENT BUZZ
            </span>

            <h2>Trending Snapshot</h2>

            <p>
              A quick look at what`s trending across CineVerse.
            </p>
          </div>

          <span className={styles.periodBadge}>
            {timeWindow === "week" ? "THIS WEEK" : "TODAY"}
          </span>
        </div>

        {trendingMovies.isLoading || trendingTV.isLoading ? (
          <div className={styles.snapshotStatus}>
            Loading trending titles...
          </div>
        ) : trendingMovies.isError || trendingTV.isError ? (
          <div className={styles.snapshotStatus}>
            Unable to load trending titles.
          </div>
        ) : snapshot.length === 0 ? (
          <div className={styles.snapshotStatus}>
            No trending titles found.
          </div>
        ) : (
          <div className={styles.snapshotGrid}>
            {snapshot.map((media, index) => (
              <div
                key={`${media.media_type}-${media.id}`}
                className={styles.snapshotItem}
              >
                <span className={styles.rank}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.snapshotCard}>
                  <MovieCards
                    poster={getImageUrl(media.poster_path)}
                    title={getTitle(media)}
                    rate={media.vote_average}
                    href={getHref(media)}
                  />

                  <span
                    className={
                      media.media_type === "movie"
                        ? styles.movieTag
                        : styles.tvTag
                    }
                  >
                    {media.media_type === "movie"
                      ? "MOVIE"
                      : "TV SHOW"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.snapshotFooter}>
          <Link href="/trending/movies">
            Explore all trending
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TrendingPageModule;
