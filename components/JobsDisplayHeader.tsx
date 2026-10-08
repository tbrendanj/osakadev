import styles from "./JobsDisplayHeader.module.css";
import 'material-symbols/outlined.css';

export default function JobsDisplayHeader() {
  return <div className={styles.job_display_header}>
    <h2 className={styles.title}>
      LATEST DEVELOPER JOBS
    </h2>
    <div className={styles.view_all_button}>
      <a href={"/"} className={"horizontally_centered"}>
        View All
        <span className={`${"material-symbols-outlined"}`}>arrow_forward</span>
      </a>
    </div>
  </div>;
}
