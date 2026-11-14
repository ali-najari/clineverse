import { ROUTES } from "@/shared/routes";
import { Category } from "../models";
import { FiFilm, FiTv } from "react-icons/fi";

export const Categories: Category[] = [
  {
    title: "Movies",
    Link: ROUTES.trending_movies,
    icon: FiFilm,
  },
  {
    title: "TV Shows",
    Link: ROUTES.trending_tv_shows,
    icon: FiTv,
  },
];