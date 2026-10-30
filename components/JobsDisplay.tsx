import styles from "./JobsDisplay.module.css";
import JobsDisplayHeader from "./JobsDisplayHeader";
import JobCardGrid from "./JobCardGrid";
import JobWithListingDetails from "@/app/lib/types/JobWithListingDetails";

export interface JobsDisplayProps {
  jobs: JobWithListingDetails[];
  title: string;
}

export default function JobsDisplay({
  jobs,
  title
}: JobsDisplayProps) {
  return <div className={styles.job_display}>
    <JobsDisplayHeader title={title} />
    <JobCardGrid jobs={jobs} isLarge={false} />
  </div>;
}
