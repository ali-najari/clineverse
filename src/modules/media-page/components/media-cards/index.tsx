"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";

interface MediaCardProps {
  href: string;
  poster: string;
  title: string;
  rate: number;
  date?: string;
}

const MediaCard = ({
  href,
  poster,
  title,
  rate,
  date,
}: MediaCardProps) => {
  const hasRating =
    Number.isFinite(rate) && rate > 0;

  return (
    <Link
      href={href}
      className={styles.movieCard}
      aria-label={`View details for ${title}`}
    >
      <div className={styles.posterWrapper}>
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 768px) 44vw, (max-width: 1024px) 30vw, 200px"
            className={styles.poster}
            unoptimized
          />
        ) : (
          <div
            className={styles.posterPlaceholder}
            aria-label="Poster unavailable"
          >
            <span>NO POSTER</span>
          </div>
        )}

        {hasRating && (
          <span className={styles.rating}>
            <span aria-hidden="true">★</span>
            {rate.toFixed(1)}
          </span>
        )}
      </div>

      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{title}</h3>

        {date && (
          <span className={styles.releaseDate}>
            {date.slice(0, 4)}
          </span>
        )}
      </div>
    </Link>
  );
};

export default MediaCard;