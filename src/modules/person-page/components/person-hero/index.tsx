import { getImageUrl } from "@/utils/helpers/poster-path";
import styles from "./styles.module.scss";
import Image from "next/image";

interface PersonHeroProps {
  name: string;
  known_for: string;
  profile_path: string;
  birthday: string;
  place_of_birth: string;
  popularity: number;
}

const PersonHero = ({
  name,
  known_for,
  profile_path,
  birthday,
  place_of_birth,
  popularity,
}: PersonHeroProps) => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.profile}>
        {profile_path && (
          <Image
            className={styles.profileImage}
            src={getImageUrl(profile_path)}
            alt={name}
            width={500}
            height={667}
            unoptimized
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.knownFor}>{known_for}</div>
        <div className={styles.birthInfo}>
          <div className={styles.birthday}>{birthday}</div>
          <div className={styles.placeOfBirth}>{place_of_birth}</div>
        </div>
        <div className={styles.popularity}>Popularity: {popularity.toFixed(1)}</div>
      </div>
    </div>
  );
};

export default PersonHero;
