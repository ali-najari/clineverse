"use client";

import PersonBiography from "./components/person-biography";
import PersonCredits from "./components/person-credits";
import PersonHero from "./components/person-hero";
import getPersonDetails from "./hooks/getPersonDetails";
import styles from "./styles.module.scss";

interface PersonPageModuleProps {
  personId: number;
}

const PersonPageModule = ({ personId }: PersonPageModuleProps) => {
  const { data, isLoading, isError } = getPersonDetails(personId);

  if (isLoading) {
    return <div className={styles.mainWrapper}>Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className={styles.mainWrapper}>
        Failed to load person details.
      </div>
    );
  }

  return (
    <div className={styles.mainWrapper}>
      <PersonHero
        name={data.name}
        known_for={data.known_for_department}
        profile_path={data.profile_path}
        birthday={data.birthday}
        place_of_birth={data.place_of_birth}
        popularity={data.popularity}
      />

      <PersonBiography biography={data.biography} />

      <PersonCredits personId={personId} />
    </div>
  );
};

export default PersonPageModule;