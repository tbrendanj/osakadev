import styles from "./Category.module.css";

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
      <div className={styles.category_name}>{categoryName}</div>
      <div className={styles.job_count}>{jobCount} jobs</div>
    </a>
  </div>;
}
