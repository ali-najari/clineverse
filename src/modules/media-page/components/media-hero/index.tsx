"use client";

import Image from "next/image";
import Link from "next/link";
import { FiInfo, FiPlay, FiStar } from "react-icons/fi";
import Carousel from "@/shared/components/carousel/hero-carousel";
import styles from "./styles.module.scss";
import { MediaHeroItem } from "../../models";

interface MediaHeroProps {
  items: MediaHeroItem[];
}

const MediaHero = ({ items }: MediaHeroProps) => {
  if (!items.length) return null;

  return (
    <Carousel
      items={items}
      getKey={(item) => item.id}
      autoPlay
      interval={7000}
      loop
      showArrows
      showDots
      ariaLabel="Featured media"
      className={styles.heroCarousel}
      renderItem={(item, index, isActive) => (
        <div className={styles.heroSlide}>
          <div className={styles.backdrop}>
            <Image
              src={item.backdropUrl}
              alt=""
              fill
              priority={isActive && index === 0}
              sizes="100vw"
              unoptimized
            />
          </div>

          <div className={styles.overlay} />

          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.type}>
                {item.mediaType === "movie" ? "MOVIE" : "TV SHOW"}
              </span>

              {item.releaseDate && (
                <span className={styles.year}>
                  {item.releaseDate.slice(0, 4)}
                </span>
              )}

              {item.voteAverage > 0 && (
                <span className={styles.rating}>
                  <FiStar />
                  {item.voteAverage.toFixed(1)}
                </span>
              )}
            </div>

            <h1 className={styles.title}>{item.title}</h1>

            {item.overview && (
              <p className={styles.overview}>{item.overview}</p>
            )}

            <div className={styles.actions}>
              {item.trailerUrl && (
                <a
                  href={item.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionButton} ${styles.primaryButton}`}
                >
                  <FiPlay />
                  Watch Trailer
                </a>
              )}

              <Link
                href={item.detailsUrl}
                className={`${styles.actionButton} ${styles.secondaryButton}`}
              >
                <FiInfo />
                More Info
              </Link>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default MediaHero;
