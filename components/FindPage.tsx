import styles from "./FindPage.module.css";

import { Jobs } from "@/app/lib/testing/fixtures/SampleJobs";
import JobCardGrid from "./JobCardGrid";
import BannerSearch from "./BannerSearch";

export default function FindPage() {
  return <>
    <div className={styles.search_banner}>
      <BannerSearch stretch={true} />
    </div>
    <div className={styles.job_card_grid_wrapper}>
      <JobCardGrid jobs={Jobs} isLarge={true} />
    </div>
  </>;
}