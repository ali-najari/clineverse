import styles from "./styles.module.scss";
import React from "react";
import CategoryCards from "@/shared/components/category-cards";
import { Categories } from "./constants";



const TrendingPageModule = () => {
  return (
    <div className={styles.mainWrapper}>
      {Categories.map((category) => (
        <CategoryCards
          key={category.title}
          title={category.title}
          icon={category.icon}
          link={category.Link}
        />
      ))}
    </div>
  );
};

export default TrendingPageModule;
