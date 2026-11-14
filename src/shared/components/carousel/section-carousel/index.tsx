"use client";

import { ReactNode, RefObject } from "react";

import styles from "./styles.module.scss";

interface SectionCarouselProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
  scrollRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  className?: string;
  ariaLabel?: string;
}

const SectionCarousel = <T,>({
  items,
  getKey,
  renderItem,
  scrollRef,
  trackRef,
  className = "",
  ariaLabel = "Media section",
}: SectionCarouselProps<T>) => {
  if (!items.length) return null;

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div
        ref={scrollRef}
        className={styles.scrollContainer}
        aria-label={ariaLabel}
        tabIndex={0}
      >
        <div ref={trackRef} className={styles.track}>
          {items.map((item, index) => (
            <div key={getKey(item)} className={styles.slide}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionCarousel;
