"use client";

import styles from "./styles.module.scss";
import { FiBell, FiMenu, FiSearch } from "react-icons/fi";
interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <button className={styles.header__menu} aria-label="Open menu" onClick={onMenuClick}>
          <FiMenu />
        </button>

        <h1 className={styles.header__logo}>
          Cine<span>Verse</span>
        </h1>
      </div>

      <div className={styles.header__search}>
        <FiSearch className={styles.header__searchIcon} />

        <input type="text" placeholder="Search movies, series..." />
      </div>

      <div className={styles.header__right}>
        <button className={styles.header__icon}>
          <FiBell />
        </button>

        <button className={styles.header__profile}>A</button>
      </div>
    </header>
  );
};

export default Header;
