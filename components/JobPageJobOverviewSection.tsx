import styles from "./JobPageJobOverviewSection.module.css";
import OverviewMiniSectionGrid from "./OverviewMiniSectionGrid";
import ShareLinks from "./ShareLinks";
import { OverviewMiniSectionProps } from "./OverviewMiniSection";

export interface JobPageJobOverviewSectionProps {
  date: Date;
  level: string;
  education: string;
}

export default function JobPageJobOverviewSection({
  date,
  level,
  education
}: JobPageJobOverviewSectionProps) {
  const overviewMiniSections: OverviewMiniSectionProps[] = [
      {
        icon: "calendar",
        title: "Job Posted",
        content: date,
      },
      {
        icon: "stack",
        title: "Job Level",
        content: level,
      },
      {
        icon: "briefcase",
        title: "Education",
        content: education,
      },
    ];
  return <div className={styles.job_overview}>
    <h3>
      Job Overview
    </h3>
    <OverviewMiniSectionGrid overviewMiniSections={overviewMiniSections} />
    <div className={styles.horizontal_rule} />
    <ShareLinks />
  </div>;
}
