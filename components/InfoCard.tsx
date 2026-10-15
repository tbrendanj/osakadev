import styles from "./InfoCard.module.css";
import 'material-symbols/outlined.css';

export interface InfoCardProps {
  icon: string;
  title: string;
  content: string;
}

export default function InfoCard({
  icon,
  title,
  content
}: InfoCardProps) {
  return <div className={styles.info_card}>
    <div className={styles.info_card_heading}>
      <span className={`${"material-symbols-outlined"} ${styles.banner_search_icon}`}>{icon}</span>
      <h3>{title}</h3>
    </div>
    <p>{content}</p>
  </div>;
}
