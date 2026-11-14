"use client";

import { ReactNode } from "react";
import useCarousel from "./hooks/useCarousel";
import styles from "./styles.module.scss";

interface CarouselProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (
    item: T,
    index: number,
    isActive: boolean
  ) => ReactNode;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  ariaLabel?: string;
}

const Carousel = <T,>({
  items,
  getKey,
  renderItem,
  autoPlay = false,
  interval = 6000,
  loop = true,
  showArrows = true,
  showDots = true,
  className = "",
  ariaLabel = "Carousel",
}: CarouselProps<T>) => {
  const {
    activeIndex,
    setIsPaused,
    goTo,
    next,
    previous,
  } = useCarousel({
    length: items.length,
    autoPlay,
    interval,
    loop,
  });

  if (!items.length) return null;

  return (
    <section
      className={`${styles.carousel} ${className}`}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node
          )
        ) {
          setIsPaused(false);
        }
      }}
    >
      <div className={styles.slides}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={getKey(item)}
              className={`${styles.slide} ${
                isActive ? styles.active : ""
              }`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              {renderItem(item, index, isActive)}
            </div>
          );
        })}
      </div>

      {showArrows && items.length > 1 && (
        <div className={styles.arrows}>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous slide"
            className={styles.arrow}
          >
            &#10094;
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className={styles.arrow}
          >
            &#10095;
          </button>
        </div>
      )}

      {showDots && items.length > 1 && (
        <div className={styles.pagination}>
          {items.map((item, index) => (
            <button
              key={getKey(item)}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={
                activeIndex === index ? "true" : undefined
              }
              className={`${styles.dot} ${
                activeIndex === index
                  ? styles.activeDot
                  : ""
              }`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Carousel;