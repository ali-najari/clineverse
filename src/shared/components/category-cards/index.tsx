
import Link from "next/link";
import { IconType } from "react-icons";

import styles from "./styles.module.scss";

export type CategoryCardAccent = "primary" | "secondary";

interface CategoryCardsProps {
  title: string;
  link: string;
  icon: IconType;
  description?: string;
  eyebrow?: string;
  accent?: CategoryCardAccent;
  className?: string;
}

const CategoryCards = ({
  title,
  link,
  icon: Icon,
  description,
  eyebrow,
  accent = "primary",
  className,
}: CategoryCardsProps) => {
  return (
    <Link
      href={link}
      className={`${styles.mainWrapper} ${styles[accent]} ${
        className ?? ""
      }`}
    >
      <div className={styles.cardContent}>
        {eyebrow && (
          <span className={styles.eyebrow}>{eyebrow}</span>
        )}

        <h2 className={styles.title}>{title}</h2>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        <span className={styles.explore}>
          Explore Collection
          <span className={styles.arrow}>↗</span>
        </span>
      </div>

      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>

      <div className={styles.cardDecoration} />
    </Link>
  );
};

export default CategoryCards;
