import styles from "./JobCardGrid.module.css";
import JobCard, { JobCardProps } from "./JobCard";

export interface JobCardGridProps {
  jobCards: JobCardProps[];
}

export default function JobCardGrid({
  jobCards
}: JobCardGridProps) {
  return <div className={styles.job_card_grid}>
    {jobCards.map(jobCard => 
      <JobCard 
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
