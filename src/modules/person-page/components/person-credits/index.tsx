"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

import useGetPersonCredits, {
  type CreditType,
  type MediaType,
} from "../../hooks/getPersonCredits";

import type { PersonCreditsResponse } from "../../models";
import { getImageUrl } from "@/utils/helpers/poster-path";
import Link from "next/link";

interface PersonCreditsProps {
  personId: number;
}

interface CreditItem {
  id: number;
  title?: string;
  name?: string;
  character?: string;
  job?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

const PersonCredits = ({ personId }: PersonCreditsProps) => {
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  const [creditType, setCreditType] = useState<CreditType>("cast");

  const { data, isLoading, isError } = useGetPersonCredits({
    personId,
    mediaType,
    creditType,
  });

  const response = data as PersonCreditsResponse | undefined;
  const credits: CreditItem[] = response?.[creditType] ?? [];

  const getTitle = (item: CreditItem) => item.title ?? item.name ?? "Untitled";

  const getDate = (item: CreditItem) =>
    item.release_date ?? item.first_air_date ?? "";

  return (
    <section className={styles.mainWrapper}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.eyebrow}>CAREER</span>
          <h2 className={styles.sectionTitle}>Known For</h2>
        </div>

        <span className={styles.resultCount}>{credits.length} titles</span>
      </div>

      <div className={styles.creditsNavbar}>
        <div className={styles.mediaTabs}>
          <button
            type="button"
            className={`${styles.navButton} ${
              mediaType === "movie" ? styles.active : ""
            }`}
            onClick={() => setMediaType("movie")}
          >
            Movies
          </button>

          <button
            type="button"
            className={`${styles.navButton} ${
              mediaType === "tv" ? styles.active : ""
            }`}
            onClick={() => setMediaType("tv")}
          >
            TV Shows
          </button>
        </div>

        <div className={styles.creditTabs}>
          <button
            type="button"
            className={`${styles.filterButton} ${
              creditType === "cast" ? styles.filterActive : ""
            }`}
            onClick={() => setCreditType("cast")}
          >
            Cast
          </button>

          <button
            type="button"
            className={`${styles.filterButton} ${
              creditType === "crew" ? styles.filterActive : ""
            }`}
            onClick={() => setCreditType("crew")}
          >
            Crew
          </button>
        </div>
      </div>

      <div className={styles.creditsContent}>
        {isLoading ? (
          <div className={styles.stateMessage}>Loading credits...</div>
        ) : isError ? (
          <div className={styles.stateMessage}>
            Failed to load credits. Please try again.
          </div>
        ) : credits.length === 0 ? (
          <div className={styles.stateMessage}>
            No {creditType} credits found for this category.
          </div>
        ) : (
          <div className={styles.creditsGrid}>
            {credits.slice(0, 10).map((item) => {
              const date = getDate(item);

              return (
                <Link href={`/media/movie/${item.id}`} className={styles.creditCard} key={item.id}>
                  <div className={styles.posterWrapper}>
                    {item.poster_path ? (
                      <Image
                        src={getImageUrl(item.poster_path)}
                        alt={getTitle(item)}
                        fill
                        // sizes="(max-width: 480px) 44vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 170px"
                        className={styles.poster}
                        unoptimized
                      />
                    ) : (
                      <div className={styles.posterPlaceholder}>No Poster</div>
                    )}

                    {typeof item.vote_average === "number" &&
                      item.vote_average > 0 && (
                        <span className={styles.rating}>
                          ★ {item.vote_average.toFixed(1)}
                        </span>
                      )}
                  </div>

                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{getTitle(item)}</h3>

                    {date && (
                      <span className={styles.releaseDate}>
                        {date.slice(0, 4)}
                      </span>
                    )}

                    <p className={styles.role}>
                      {creditType === "cast"
                        ? item.character || "Cast"
                        : item.job || "Crew"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonCredits;
