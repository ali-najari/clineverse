"use client";

import { useState } from "react";
import { Dropdown } from "@/shared/components/drop-down";
import styles from "./styles.module.scss";
import MovieCards from "../media-page/components/media-cards";
import { getImageUrl } from "@/utils/helpers/poster-path";
import useGetTrendingTVShows, { TrendingTimeWindow } from "./hook";

const TrendingTVShowsPageModule = () => {
  const [timeWindow, setTimeWindow] = useState<TrendingTimeWindow>("week");
  const TrendingSeries = useGetTrendingTVShows(timeWindow);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.header}>
        <h1>Trending TV Shows Page</h1>
        <Dropdown
          options={[
            { label: "Week", value: "week" },
            { label: "Day", value: "day" },
          ]}
          defaultValue="week"
          onChange={(v) => setTimeWindow(v as TrendingTimeWindow)}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.movieList}>
          {TrendingSeries.data?.results.map((tv) => (
            <MovieCards
              key={tv.id}
              poster={getImageUrl(tv.poster_path)}
              title={tv.name}
              rate={tv.vote_average}
              href={`/media/tv/${tv.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTVShowsPageModule;
