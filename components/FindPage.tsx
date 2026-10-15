import styles from "./FindPage.module.css";

import { LargeJobCards } from "@/app/lib/testing/fixtures/SampleJobCards";
import JobCardGrid from "./JobCardGrid";
import FindPageBanner from "./FindPageBanner";

export default function FindPage() {
  return <>
    <FindPageBanner />
    <div className={styles.job_card_grid_wrapper}>
      <JobCardGrid jobCards={LargeJobCards} isLarge={true} />
    </div>
  </>;
}