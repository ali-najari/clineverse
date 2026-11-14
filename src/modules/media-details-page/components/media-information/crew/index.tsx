import Image from "next/image";
import { CrewMember } from "@/modules/media-details-page/models";
import styles from "./styles.module.scss";
import { getImageUrl } from "@/utils/helpers/poster-path";
import Link from "next/link";

interface CrewProps {
  members: CrewMember[];
  onSeeAll?: () => void;
}

const Crew = ({ members, onSeeAll }: CrewProps) => {
  return (
    <section className={styles.mainWrapper}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.titleIcon} aria-hidden="true">
            <i />
          </span>
          Crew
        </h3>

        {onSeeAll && (
          <button type="button" className={styles.seeAll} onClick={onSeeAll}>
            See all <span aria-hidden="true">›</span>
          </button>
        )}
      </div>

      <div className={styles.crewList}>
        {members.slice(0, 8).map((member) => (
          <Link
            href={`/person/${member.id}`}
            key={`${member.id}-${member.job}`}
            className={styles.crewItem}
          >
            <div className={styles.memberProfile}>
              {member.profile_path ? (
                <Image
                  src={getImageUrl(member.profile_path)}
                  alt={member.name}
                  fill
                  sizes="76px"
                  className={styles.profileImage}
                  unoptimized
                />
              ) : (
                <span className={styles.profileFallback}>
                  {member.name.charAt(0)}
                </span>
              )}
            </div>

            <div className={styles.memberInfo}>
              <p className={styles.memberName}>{member.name}</p>

              <p className={styles.memberRole}>{member.job}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Crew;
