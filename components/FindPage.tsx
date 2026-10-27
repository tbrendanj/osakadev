import styles from "./FindPage.module.css";

import { JobCards } from "@/app/lib/testing/fixtures/SampleJobCards";
import JobCardGrid from "./JobCardGrid";
import FindPageBanner from "./FindPageBanner";

export default function FindPage() {
  return <>
    <FindPageBanner />
    <div className={styles.job_card_grid_wrapper}>
      <JobCardGrid jobCards={JobCards} isLarge={true} />
    </div>
  </>;
}