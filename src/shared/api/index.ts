const branch = process.env.NEXT_PUBLIC_APP_BRANCH;
const apiMain = process.env.NEXT_PUBLIC_API_MAIN;
const apiTest = process.env.NEXT_PUBLIC_API_TEST;

const Base_URL = branch === "dev" ? apiTest : apiMain;

export const API_ROUTES = {
  get_trending_movie_daily: `${Base_URL}/trending/movie/day`,
  get_trending_movie_weekly: `${Base_URL}/trending/movie/week`,
  get_trending_tv_shows_daily: `${Base_URL}/trending/tv/day`,
  get_trending_tv_shows_weekly: `${Base_URL}/trending/tv/week`,
  get_movie_details: (movieId: number) => `${Base_URL}/movie/${movieId}`,
  get_tv_details: (tvId: number) => `${Base_URL}/tv/${tvId}`,
  get_movie_credits: (movieId: number) =>
    `${Base_URL}/movie/${movieId}/credits`,
  get_tv_credits: (tvId: number) => `${Base_URL}/tv/${tvId}/credits`,
  get_movie_reviews: (movieId: number) =>
    `${Base_URL}/movie/${movieId}/reviews`,
  get_tv_reviews: (tvId: number) => `${Base_URL}/tv/${tvId}/reviews`,
  get_person_details: (personId: number) => `${Base_URL}/person/${personId}`,
  get_person_credits: {
    movie: {
      cast: (personId: number) =>
        `${Base_URL}/person/${personId}/movie_credits`,
      crew: (personId: number) =>
        `${Base_URL}/person/${personId}/movie_credits`,
    },
    tv: {
      cast: (personId: number) => `${Base_URL}/person/${personId}/tv_credits`,
      crew: (personId: number) => `${Base_URL}/person/${personId}/tv_credits`,
    },
  },
  get_popular_movie: `${Base_URL}/movie/popular`,
  get_top_rated_movie: `${Base_URL}/movie/top_rated`,
  get_upcoming_movie: `${Base_URL}/movie/upcoming`,

  // TV Shows
  get_popular_tv: `${Base_URL}/tv/popular`,
  get_top_rated_tv: `${Base_URL}/tv/top_rated`,
  get_on_the_air_tv: `${Base_URL}/tv/on_the_air`,
};
