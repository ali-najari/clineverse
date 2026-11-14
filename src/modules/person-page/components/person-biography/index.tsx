import { useState } from "react";
import styles from "./styles.module.scss";

const PersonBiography = ({ biography }: { biography: string }) => {
  const [isBiographyExpanded, setIsBiographyExpanded] = useState(false);

  return (
    <div className={styles.mainWrapper}>
      {biography && (
        <section className={styles.biographyWrapper}>
          <h2 className={styles.biographyTitle}>Biography</h2>

          <p
            className={`${styles.biographyText} ${
              isBiographyExpanded ? styles.expanded : ""
            }`}
          >
            {biography}
          </p>

          <button
            type="button"
            className={styles.biographyToggle}
            onClick={() => setIsBiographyExpanded((prev) => !prev)}
            aria-expanded={isBiographyExpanded}
          >
            {isBiographyExpanded ? "Show less" : "Read more"}
          </button>
        </section>
      )}
    </div>
  );
};

export default PersonBiography;
