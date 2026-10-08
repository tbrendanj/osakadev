import styles from "./JobsDisplay.module.css";
import JobsDisplayHeader from "./JobsDisplayHeader";
import JobCardGrid from "./JobCardGrid";
import { JobCardProps } from "./JobCard";

export interface JobsDisplayProps {
  jobCards: JobCardProps[];
}

export default function JobsDisplay({
  jobCards
}: JobsDisplayProps) {
  return <div className={styles.job_display}>
    <JobsDisplayHeader />
    <JobCardGrid jobCards={jobCards} />
  </div>;
}

//TODO: missing carousel. Should use react state to move through pages 1-5(max) or directly to a page and display a different grid,
//which each get 6 of the 30 max listings passed in
