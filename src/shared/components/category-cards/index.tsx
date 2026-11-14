import Link from "next/link";
import styles from "./styles.module.scss";

interface CollectionCardsProps {
  title: string;
  link: string;
  icon: React.ElementType;
}

const CategoryCards = ({ title, link, icon: Icon }: CollectionCardsProps) => {
  return (
    <Link className={styles.mainWrapper} href={link}>
      <div className={styles.title}>{title}</div>
      <div className={styles.icon}>
        <Icon />
      </div>
    </Link>
  );
};

export default CategoryCards;
