"use client";

import { getImageUrl } from "@/utils/helpers/poster-path";
import MediaHero from "./components/hero";
import styles from "./styles.module.scss";
import useGetMediaDetails, { MediaType } from "./hooks/useGetMediaDetails";
import Cast from "./components/media-information/cast";
import useGetMediaCredits from "./hooks/useGetMediaCredits";
import Crew from "./components/media-information/crew";

interface MediaDetailsPageModuleProps {
  mediaType: MediaType;
  mediaId: number;
}

const MediaDetailsPageModule = ({
  mediaType,
  mediaId,
}: MediaDetailsPageModuleProps) => {
  const { data, isLoading, isError } = useGetMediaDetails(mediaType, mediaId);

  const {
    data: credits,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
  } = useGetMediaCredits(mediaType, mediaId);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Something went wrong.</div>;
  }

  const title = "title" in data ? data.title : data.name;

  const date = "release_date" in data ? data.release_date : data.first_air_date;

  const runtime =
    "runtime" in data
      ? `${data.runtime} min`
      : `${data.number_of_seasons} seasons`;

  return (
    <div className={styles.mainWrapper}>
      <MediaHero
        poster={getImageUrl(data.poster_path)}
        title={title}
        rating={data.vote_average}
        date={date}
        runtime={runtime}
        genres={data.genres.map((genre) => genre.name).join(", ")}
        overview={data.overview}
        actions=""
      />
      {!isCreditsLoading && !isCreditsError && credits && (
        <Cast members={credits.cast}  />
      )}

      {!isCreditsLoading && !isCreditsError && credits && (
      <Crew members={credits.crew} />
      )}
    </div>
  );
};

export default MediaDetailsPageModule;
