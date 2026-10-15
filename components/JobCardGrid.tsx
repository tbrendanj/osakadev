import styles from "./JobCardGrid.module.css";
import JobCard, { JobCardProps } from "./JobCard";

export interface JobCardGridProps {
  jobCards: JobCardProps[];
  isLarge: boolean;
}

export default function JobCardGrid({
  jobCards,
  isLarge
}: JobCardGridProps) {
  return <div className={`${styles.job_card_grid} ${isLarge ? styles.large_grid : ""}`}>
    {jobCards.map((jobCard, index) => 
      <JobCard 
        key={"job_card_" + index}
        title={jobCard.title}
        companyName={jobCard.companyName}
        remoteStatus={jobCard.remoteStatus}
        location={jobCard.location}
        salary={jobCard.salary}
        iconLink={jobCard.iconLink}
        jobLink={jobCard.jobLink}
      />
    )}
  </div>;
}
