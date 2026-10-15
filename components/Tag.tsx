import styles from "./Tag.module.css";

export interface TagProps {
  tagName: string;
}

export default function Category({
  tagName
}: TagProps) {
  return <div className={styles.tag}>{tagName}</div>;
}
