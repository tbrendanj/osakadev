import Image from "next/image";

import styles from "./JobCard.module.css";

export interface JobCardProps {
  title: string;
  remoteStatus: string;
  location: string;
  salary: string;
  iconLink: string;
}

export default function JobCard({
  title,
  remoteStatus,
  location,
  salary,
  iconLink
}: JobCardProps) {
  return <div className={styles.job_card}>
    <h3>
      {title}
    </h3>
    <div className={styles.second_row}>
      <div className={styles.remote_status}>
        {remoteStatus}
      </div>
      <div className={styles.salary}>
        Salary: {salary}
      </div>
    </div>
    <div className={styles.third_row}>
      <Image className={styles.icon} src={iconLink} alt={"icon"} width={75} height={75} />
      <div className={styles.company_info}>
        Salary: {salary}
      </div>
    </div>
  </div>;
}
