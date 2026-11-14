"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiHome,
  FiTrendingUp,
  FiFilm,
  FiTv,
  FiBookmark,
  FiClock,
  FiSettings,
} from "react-icons/fi";

import styles from "./styles.module.scss";

const menu = [
  {
    id: 1,
    title: "Home",
    href: "/",
    icon: FiHome,
  },
  {
    id: 2,
    title: "Trending",
    href: "/trending",
    icon: FiTrendingUp,
  },
  {
    id: 3,
    title: "Movies",
    href: "/media/movies",
    icon: FiFilm,
  },
  {
    id: 4,
    title: "TV Shows",
    href: "/media/tv-shows",
    icon: FiTv,
  },
  {
    id: 5,
    title: "Watchlist",
    href: "/watchlist",
    icon: FiBookmark,
  },
  {
    id: 6,
    title: "History",
    href: "/history",
    icon: FiClock,
  },
  {
    id: 7,
    title: "Settings",
    href: "/settings",
    icon: FiSettings,
  },
];

interface NavbarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Navbar = ({ isOpen = false, onClose }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <nav className={styles.sidebar__nav}>
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`${styles.sidebar__item} ${
                pathname === item.href ? styles.active : ""
              }`}
            >
              <Icon />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Navbar;
