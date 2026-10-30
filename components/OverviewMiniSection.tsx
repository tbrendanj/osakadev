import styles from "./OverviewMiniSection.module.css";
import { BsCalendar4, BsStack, BsBriefcase } from "react-icons/bs";

export interface OverviewMiniSectionProps {
  icon: string;
  title: string;
  content: string | Date;
}

export default function OverviewMiniSection({
  icon,
  title,
  content
}: OverviewMiniSectionProps) {
  return <div className={styles.overview_mini_section}>
    {icon === "calendar" && <BsCalendar4 className={styles.icon} />}
    {icon === "stack" && <BsStack className={styles.icon} />}
    {icon === "briefcase" && <BsBriefcase className={styles.icon} />}
    <p className={styles.title}>
      {title}
    </p>
    <p className={styles.content}>
      {content instanceof Date ? content.toLocaleDateString() : content}
    </p>
  </div>;
}
