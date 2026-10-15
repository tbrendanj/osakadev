import styles from "./Category.module.css";
import Tag from "./Tag";

export interface CategoryProps {
  categoryName: string;
  jobCount: number;
}

export default function Category({
  categoryName,
  jobCount
}: CategoryProps) {
  return <div className={styles.category}>
    <a href={"/"} className={"horizontally_centered"}>
      <Tag tagName={categoryName} />
      <div className={styles.job_count}>{jobCount} jobs</div>
    </a>
  </div>;
}
