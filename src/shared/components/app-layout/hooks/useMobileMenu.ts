"use client";

import { useCallback, useState } from "react";

const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};

export default useMobileMenu;