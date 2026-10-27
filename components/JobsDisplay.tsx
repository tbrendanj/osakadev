import styles from "./JobsDisplay.module.css";
import JobsDisplayHeader from "./JobsDisplayHeader";
import JobCardGrid from "./JobCardGrid";
import { JobCardProps } from "./JobCard";

export interface JobsDisplayProps {
  jobCards: JobCardProps[];
  title: string;
}

export default function JobsDisplay({
  jobCards,
  title
}: JobsDisplayProps) {
  return <div className={styles.job_display}>
    <JobsDisplayHeader title={title} />
    <JobCardGrid jobCards={jobCards} isLarge={false} />
  </div>;
}
