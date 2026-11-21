
import { ROUTES } from "@/shared/routes";
import { FiFilm, FiTv } from "react-icons/fi";

import { TrendingMediaType } from "../models";

export interface TrendingCategory {
  title: string;
  description: string;
  eyebrow: string;
  link: string;
  icon: typeof FiFilm;
  accent: "primary" | "secondary";
  mediaType: TrendingMediaType;
}

export const Categories: TrendingCategory[] = [
  {
    title: "Trending Movies",
    description:
      "Discover the movies everyone is talking about.",
    eyebrow: "01 / MOVIES",
    link: ROUTES.trending_movies,
    icon: FiFilm,
    accent: "primary",
    mediaType: "movie",
  },
  {
    title: "Trending TV Shows",
    description:
      "Find the series taking over everyone's screen.",
    eyebrow: "02 / TV SHOWS",
    link: ROUTES.trending_tv_shows,
    icon: FiTv,
    accent: "secondary",
    mediaType: "tv",
  },
];
