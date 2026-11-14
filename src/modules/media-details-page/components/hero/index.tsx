import styles from "./styles.module.scss";

interface HeroProps {
  poster:string | null;
  title: string;
  rating: number;
  date: string;
  runtime: string;
  genres: string;
  overview: string;
  actions: string;
}

const MediaHero = ({
  poster,
  title,
  rating,
  date,
  runtime,
  genres,
  overview,
  actions,
}: HeroProps) => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.heroPoster} style={{ backgroundImage: `url(${poster})` }}></div>
      <div className={styles.heroInformations}>
        <div className={styles.title}>{title}</div>
        <div className={styles.dateInformation}>
          <div>★ {rating.toFixed(1)}</div>
          <div>{date}</div>
          <div>{runtime}</div>
        </div>
        <div className={styles.genres}>{genres}</div>
        <div className={styles.overview}>{overview}</div>
        <div className={styles.actions}>{actions}</div>
      </div>
    </div>
  );
};

export default MediaHero;
