"use client";

import MovieCards from "../media-page/components/media-cards";
import PopularMoviesSkeleton from "./components/popular-movie-skeleton";
import { useGetPopularMovies } from "./hooks/useGetPopularMovies";
import { getImageUrl } from "@/utils/helpers/poster-path";
import styles from "./styles.module.scss";

const PopularMoviesModules = () => {
  const { data, isLoading, isError, refetch } = useGetPopularMovies();

  if (isLoading) return <PopularMoviesSkeleton />;

  if (isError) {
    return (
      <div className={styles.mainWrapper}>
        <h2 className={styles.header}>Popular Movies</h2>
        <p>Something went wrong while fetching the data.</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <section className={styles.mainWrapper}>
      <h2 className={styles.header}>Popular Movies</h2>

      <div className={styles.popularMovies}>
        {data?.results.map((movie) => (
          <MovieCards
            key={movie.id}
            poster={getImageUrl(movie.poster_path)}
            title={movie.title ?? movie.name ?? "Untitled"}
            rate={movie.vote_average}
            href={`/media/movies/${movie.id}`}
            date={movie.release_date ?? movie.first_air_date}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularMoviesModules;
