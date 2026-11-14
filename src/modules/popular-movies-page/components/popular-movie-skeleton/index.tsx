import Skeleton from "@/shared/components/skeleton";
import styles from "./styles.module.scss";

const PopularMoviesSkeleton = () => {
  return (
    <div className={styles.mainWrapper}>
      <Skeleton width={150} height={40} borderRadius={10} />
      <div className={styles.popularMovies}>
        {[...Array(12)].map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <Skeleton width={200} height={300} borderRadius={10} />
            <Skeleton width={150} height={18} borderRadius={4} />
            <Skeleton width={40} height={16} borderRadius={4} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMoviesSkeleton;
