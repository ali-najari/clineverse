"use client";

import Image from "next/image";
import Link from "next/link";

import Carousel from "@/shared/components/carousel/hero-carousel";

import { MediaHeroItem } from "@/modules/media-page/models";

import styles from "./styles.module.scss";

interface HomeHeroProps {
  items: MediaHeroItem[];
}

const HomeHero = ({ items }: HomeHeroProps) => {
  if (!items.length) return null;

  return (
    <section className={styles.heroSection}>
      <Carousel
        items={items}
        getKey={(item) => item.id}
        autoPlay
        interval={7000}
        loop
        showArrows
        showDots
        ariaLabel="Featured movies and TV shows"
        renderItem={(item) => (
          <article className={styles.heroSlide}>
            <div className={styles.backdrop}>
              {item.backdropUrl && (
                <Image
                  src={item.backdropUrl}
                  alt={item.title}
                  fill
                  priority={false}
                  sizes="100vw"
                  unoptimized
                />
              )}
            </div>

            <div className={styles.overlay} />

            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>
                FEATURED
              </span>

              <span className={styles.mediaType}>
                {item.mediaType === "movie"
                  ? "MOVIE"
                  : "TV SERIES"}
              </span>

              <h1 className={styles.title}>
                {item.title}
              </h1>

              <div className={styles.meta}>
                {item.releaseDate && (
                  <span>
                    {item.releaseDate.slice(0, 4)}
                  </span>
                )}

                {item.voteAverage > 0 && (
                  <span className={styles.rating}>
                    ★ {item.voteAverage.toFixed(1)}
                  </span>
                )}
              </div>

              <p className={styles.overview}>
                {item.overview}
              </p>

              <div className={styles.actions}>
                <Link
                  href={item.detailsUrl}
                  className={styles.primaryButton}
                >
                  Explore Details
                </Link>

                <Link
                  href={item.detailsUrl}
                  className={styles.secondaryButton}
                >
                  Discover More
                </Link>
              </div>
            </div>
          </article>
        )}
      />
    </section>
  );
};

export default HomeHero;