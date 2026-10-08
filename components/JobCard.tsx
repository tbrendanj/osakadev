import Image from "next/image";

import styles from "./JobCard.module.css";
import { HiLocationMarker } from "react-icons/hi";

export interface JobCardProps {
  title: string;
  companyName: string;
  remoteStatus: string;
  location: string;
  salary: string;
  iconLink: string;
}

export default function JobCard({
  title,
  companyName,
  remoteStatus,
  location,
  salary,
  iconLink
}: JobCardProps) {
  return <div className={styles.job_card}>
    <h3>
      {title}
    </h3>
    <div className={`${styles.second_row} ${"horizontally_centered"}`}>
      <div className={styles.remote_status}>
        {remoteStatus}
      </div>
      <div className={styles.salary}>
        Salary: {salary}
      </div>
    </div>
    <div className={`${styles.third_row} ${"horizontally_centered"}`}>
      <div className={`${styles.company_profile} ${"horizontally_centered"}`}>
        <Image className={styles.icon} src={iconLink} alt={"icon"} width={50} height={50} />
        <div className={styles.company_info}>
          <h4>
            {companyName}
          </h4>
          <div className={`${styles.company_location} ${"horizontally_centered"}`}>
            <HiLocationMarker className={styles.location_icon}/>
            <p>
              {location}
            </p>
          </div>
        </div>
      </div>
      <span className={`${"material-symbols-outlined"} ${styles.bookmark_icon}`}>bookmark</span>
    </div>
  </div>;
}
