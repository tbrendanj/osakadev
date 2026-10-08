import styles from "./Categories.module.css";
import Category, { CategoryProps } from "./Category";

export interface CategoriesProps {
  categories: CategoryProps[];
}

export default function Categories({
  categories
}: CategoriesProps) {
  return <div className={styles.categories}>
    {categories.map(category => {
      return <Category categoryName={category.categoryName} jobCount={category.jobCount} />
    })}
  </div>;
}
