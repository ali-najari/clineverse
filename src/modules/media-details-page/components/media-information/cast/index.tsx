"use client";

import { CastMember } from "@/modules/media-details-page/models";
import styles from "./styles.module.scss";
import { getImageUrl } from "@/utils/helpers/poster-path";
import Image from "next/image";
import Link from "next/link";

interface CastProps {
  members: CastMember[];
  onSeeAll?: () => void;
  profile_path?: string;
}

const Cast = ({ members, onSeeAll }: CastProps) => {
  return (
    <section className={styles.mainWrapper}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.titleIcon} aria-hidden="true">
            <i />
          </span>
          Cast
        </h3>

        {onSeeAll && (
          <button type="button" className={styles.seeAll} onClick={onSeeAll}>
            See all <span aria-hidden="true">›</span>
          </button>
        )}
      </div>

      <div className={styles.castList}>
        {members.slice(0, 8).map((member) => (
          <Link href={`/person/${member.id}`} key={member.id} className={styles.castItem}>
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

            <p className={styles.memberName}>{member.name}</p>

            <p className={styles.memberRole}>
              {member.character || "Unknown role"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Cast;
