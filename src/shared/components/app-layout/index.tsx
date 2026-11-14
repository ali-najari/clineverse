"use client"

import { FC, ReactNode } from "react";
import useMobileMenu from "./hooks/useMobileMenu";
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";

import styles from "./styles.module.scss";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { isOpen, closeMenu, toggleMenu } = useMobileMenu();

  return (
    <div className={styles.layout}>
      <Header onMenuClick={toggleMenu} />

      <Navbar isOpen={isOpen} onClose={closeMenu} />

      {isOpen && <div className={styles.overlay} onClick={closeMenu} />}

      <div className={styles.layout__content}>
        <div className={styles.layout__container}>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
