"use client";

import { useState } from "react";
import { Dropdown } from "@/shared/components/drop-down";
import styles from "./styles.module.scss";
import useGetTrendingMovies, {
  TrendingTimeWindow,
} from "./hooks/useGetTrendingMovies";
import MovieCards from "../media-page/components/media-cards";
import { getImageUrl } from "@/utils/helpers/poster-path";

const TrendingMoviesPageModule = () => {
  const [timeWindow, setTimeWindow] = useState<TrendingTimeWindow>("week");
  const TrendingMovies = useGetTrendingMovies(timeWindow);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.header}>
        <h1>Trending Movies Page</h1>
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
          {TrendingMovies.data?.results.map((movie) => (
            <MovieCards
              key={movie.id}
              poster={getImageUrl(movie.poster_path)}
              title={movie.title}
              rate={movie.vote_average}
              href={`/media/movies/${movie.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingMoviesPageModule;
