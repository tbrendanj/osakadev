import { JobDetail } from "@/app/lib/types/JobWithListingDetails";
import styles from "./JobPageDetailSection.module.css";

export interface JobPageDetailSectionProps {
  title: string;
  //is either an array of JobDetail or a string split on <br>
  jobDetails: string | JobDetail[];
}

export default function JobPageDetailSection({
  title,
  jobDetails,
}: JobPageDetailSectionProps) {
  return <div className={styles.job_page_detail_section}>
    <h3>
      {title}
    </h3>
    {Array.isArray(jobDetails) && <ul className={styles.job_page_detail_list}>
      {jobDetails.map((jobDetail, index) => {
        return <li key={`${title + "_" + index}`}>
          {jobDetail.detail}
        </li>;
      })}  
    </ul>}
    {!Array.isArray(jobDetails) && jobDetails.split("<br>").map((jobDetail, index) => {
      return <p key={`${title + "_" + index}`}>
        {jobDetail}
      </p>;
    })}
  </div>;
}