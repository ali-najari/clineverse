"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const useSectionCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const element = scrollRef.current;

    if (!element) return;

    const maxScrollLeft =
      element.scrollWidth - element.clientWidth;

    setCanScrollPrev(element.scrollLeft > 1);
    setCanScrollNext(
      element.scrollLeft < maxScrollLeft - 1
    );
  }, []);

  const scrollNext = useCallback(() => {
    const element = scrollRef.current;

    if (!element) return;

    element.scrollBy({
      left: element.clientWidth,
      behavior: "smooth",
    });
  }, []);

  const scrollPrev = useCallback(() => {
    const element = scrollRef.current;

    if (!element) return;

    element.scrollBy({
      left: -element.clientWidth,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    const track = trackRef.current;

    if (!element) return;

    updateScrollState();

    element.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(updateScrollState);

    resizeObserver.observe(element);

    if (track) {
      resizeObserver.observe(track);
    }

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  return {
    scrollRef,
    trackRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  };
};

export default useSectionCarousel;