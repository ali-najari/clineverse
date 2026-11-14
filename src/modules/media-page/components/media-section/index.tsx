"use client";

import Link from "next/link";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import SectionCarousel from "@/shared/components/carousel/section-carousel";
import useSectionCarousel from "@/shared/components/carousel/section-carousel/hooks";
import { MediaSectionProps } from "../../models";
import styles from "./styles.module.scss";
import MediaCards from "../media-cards";

const MediaSection = ({
  title,
  type,
  items,
  isLoading = false,
  viewAllUrl,
  viewAllLabel = "View All",
}: MediaSectionProps) => {
  const {
    scrollRef,
    trackRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  } = useSectionCarousel();

  if (!isLoading && !items.length) return null;

  return (
    <section className={styles.mainWrapper}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerContent}>
          <span className={styles.sectionType}>{type.replace("-", " ")}</span>

          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>

        {!isLoading && (
          <div className={styles.headerActions}>
            <span className={styles.itemCount}>{items.length} Titles</span>

            {items.length > 1 && (
              <div className={styles.carouselControls}>
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  aria-label="Previous titles"
                  className={styles.controlButton}
                >
                  <FiChevronLeft />
                </button>

                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  aria-label="Next titles"
                  className={styles.controlButton}
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div className={styles.sectionHeader}>
        <div className={styles.headerContent}>
          <span className={styles.sectionType}>{type.replace("-", " ")}</span>

          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>

        {!isLoading && (
          <div className={styles.headerActions}>
            <span className={styles.itemCount}>{items.length} Titles</span>

            {items.length > 1 && (
              <div className={styles.carouselControls}>
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  aria-label="Previous titles"
                  className={styles.controlButton}
                >
                  <FiChevronLeft />
                </button>

                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  aria-label="Next titles"
                  className={styles.controlButton}
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>
        )}
      </div> */}

      <div className={styles.sectionContent}>
        {isLoading ? (
          <div className={styles.loadingWrapper}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <div className={styles.skeletonPoster} />
                <div className={styles.skeletonInfo}>
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonDate} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SectionCarousel
            items={items}
            getKey={(item) => item.id}
            scrollRef={scrollRef}
            trackRef={trackRef}
            ariaLabel={title}
            className={styles.sectionCarousel}
            renderItem={(item) => (
              <MediaCards
                href={item.detailsUrl}
                poster={item.posterUrl}
                title={item.title}
                rate={item.voteAverage}
                date={item.releaseDate}
              />
            )}
          />
        )}
      </div>

      {viewAllUrl && (
        <div className={styles.viewAllWrapper}>
          <Link href={viewAllUrl} className={styles.viewAllLink}>
            <span>{viewAllLabel}</span>
            <FiArrowRight />
          </Link>
        </div>
      )}
    </section>
  );
};

export default MediaSection;
