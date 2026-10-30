import Image from "next/image";
import JobWithListingDetails from "@/app/lib/types/JobWithListingDetails";

import styles from "./JobPageTopCard.module.css";
import 'material-symbols/outlined.css';
import { HiLocationMarker } from "react-icons/hi";

export interface JobPageTopCardProps {
  job: JobWithListingDetails;
}

export default function JobPageTopCard({
  job,
}: JobPageTopCardProps) {
  return <div className={styles.job_page_top_card}>
    <div className={`${styles.first_row} ${"horizontally_centered"}`}>
      <div className={`${styles.company_profile} ${"horizontally_centered"}`}>
        <Image className={styles.icon} src={job.iconLink} alt={"icon"} width={50} height={50} />
        <div className={styles.company_info}>
          <h4>
            {job.companyName}
          </h4>
          <div className={`${styles.company_location} ${"horizontally_centered"}`}>
            <HiLocationMarker className={styles.location_icon}/>
            <p>
              {job.location}
            </p>
          </div>
        </div>
      </div>
      <span className={`${"material-symbols-outlined"} ${styles.bookmark_icon}`}>bookmark</span>
    </div>
    <h3>
      {job.title}
    </h3>
    <div className={`${styles.third_row} ${"horizontally_centered"}`}>
      <div className={styles.remote_status}>
        {job.remoteStatus}
      </div>
      <div className={styles.salary}>
        Salary: {job.salary}
      </div>
    </div>
    <button className={styles.apply_button}>
      Apply Now
    </button>
  </div>;
}
