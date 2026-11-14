"use client";

import { useCallback, useEffect, useState } from "react";

interface UseCarouselProps {
  length: number;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
}

const useCarousel = ({
  length,
  autoPlay = false,
  interval = 6000,
  loop = true,
}: UseCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (length === 0) return;

      const nextIndex = loop
        ? ((index % length) + length) % length
        : Math.max(0, Math.min(index, length - 1));

      setActiveIndex(nextIndex);
    },
    [length, loop]
  );

  const next = useCallback(() => {
    setActiveIndex((current) => {
      if (length <= 1) return current;

      if (current === length - 1) {
        return loop ? 0 : current;
      }

      return current + 1;
    });
  }, [length, loop]);

  const previous = useCallback(() => {
    setActiveIndex((current) => {
      if (length <= 1) return current;

      if (current === 0) {
        return loop ? length - 1 : current;
      }

      return current - 1;
    });
  }, [length, loop]);

  // Keep active index valid when the items change.
  useEffect(() => {
    setActiveIndex((current) =>
      length === 0 ? 0 : Math.min(current, length - 1)
    );
  }, [length]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || isPaused || length <= 1) return;

    const timer = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, length, interval, next]);

  return {
    activeIndex,
    isPaused,
    setIsPaused,
    goTo,
    next,
    previous,
  };
};

export default useCarousel;
