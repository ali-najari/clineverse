import { MediaSectionItem } from "@/modules/media-page/models";

export interface HomePageData {
  trending: MediaSectionItem[];
  popularMovies: MediaSectionItem[];
  popularTV: MediaSectionItem[];
  topRatedMovies: MediaSectionItem[];
  upcomingMovies: MediaSectionItem[];
}