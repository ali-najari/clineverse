"use client";

import { useState } from "react";
import { FiTrendingUp } from "react-icons/fi";

import { Dropdown } from "@/shared/components/drop-down";
import MovieCards from "@/modules/media-page/components/media-cards";
import { getImageUrl } from "@/utils/helpers/poster-path";

import useGetTrendingMedia from "../trending-page/hooks";
import {
  TrendingMediaResult,
  TrendingMediaType,
  TrendingTimeWindow,
} from "../trending-page/models";

import styles from "./styles.module.scss";

interface TrendingMediaPageModuleProps {
  mediaType: TrendingMediaType;
}

const TrendingMediaPageModule = ({
  mediaType,
}: TrendingMediaPageModuleProps) => {
  const [timeWindow, setTimeWindow] = useState<TrendingTimeWindow>("week");

  const { data, isLoading, isError } = useGetTrendingMedia({
    mediaType,
    timeWindow,
  });

  const isMovie = mediaType === "movie";

  const getMediaTitle = (media: TrendingMediaResult) => {
    return "title" in media ? media.title : media.name;
  };

  const getMediaHref = (id: number) => {
    return isMovie ? `/media/movies/${id}` : `/media/tv/${id}`;
  };

  return (
    <main className={styles.mainWrapper}>
      <section className={styles.pageIntro}>
        <div className={styles.introContent}>
          <span className={styles.eyebrow}>
            <FiTrendingUp />
            {/* WHAT'S POPULAR */}
          </span>

          <h1>
            Trending <span>{isMovie ? "Movies" : "TV Shows"}</span>
          </h1>

          <p>
            Discover the most talked-about {isMovie ? "movies" : "TV shows"}{" "}
            right now.
          </p>
        </div>

        <div className={styles.filterWrapper}>
          <span>TIME PERIOD</span>

          <Dropdown
            options={[
              { label: "This Week", value: "week" },
              { label: "Today", value: "day" },
            ]}
            defaultValue="week"
            onChange={(value) => setTimeWindow(value as TrendingTimeWindow)}
          />
        </div>
      </section>

      <section className={styles.resultsSection}>
        <div className={styles.resultsHeader}>
          <div>
            <span className={styles.sectionEyebrow}>
              {timeWindow === "week" ? "WEEKLY" : "DAILY"} CHART
            </span>

            <h2>{isMovie ? "Popular Movies" : "Popular TV Shows"}</h2>
          </div>

          {data && (
            <span className={styles.resultsCount}>
              {data.total_results} Titles
            </span>
          )}
        </div>

        {isLoading && (
          <div className={styles.statusMessage}>Loading trending titles...</div>
        )}

        {isError && (
          <div className={styles.statusMessage}>
            Something went wrong while loading trending titles.
          </div>
        )}

        {!isLoading && !isError && data?.results.length === 0 && (
          <div className={styles.statusMessage}>No trending titles found.</div>
        )}

        {!isLoading && !isError && data?.results && (
          <div className={styles.movieList}>
            {data.results.map((media) => (
              <MovieCards
                key={media.id}
                poster={getImageUrl(media.poster_path)}
                title={getMediaTitle(media)}
                rate={media.vote_average}
                href={getMediaHref(media.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default TrendingMediaPageModule;
