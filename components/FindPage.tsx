import styles from "./FindPage.module.css";

import { Jobs } from "@/app/lib/testing/fixtures/SampleJobs";
import JobCardGrid from "./JobCardGrid";
import FindPageBanner from "./FindPageBanner";

export default function FindPage() {
  return <>
    <FindPageBanner />
    <div className={styles.job_card_grid_wrapper}>
      <JobCardGrid jobs={Jobs} isLarge={true} />
    </div>
  </>;
}