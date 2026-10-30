import styles from "./OverviewMiniSectionGrid.module.css";

import OverviewMiniSection, { OverviewMiniSectionProps } from "./OverviewMiniSection";

export interface OverviewMiniSectionGridProps {
  overviewMiniSections: OverviewMiniSectionProps[];
}

export default function OverviewMiniSectionGrid({
  overviewMiniSections
}: OverviewMiniSectionGridProps) {
  return <div className={styles.overview_mini_section_grid}>
    {overviewMiniSections.map((overviewItem, index) => {
      return <OverviewMiniSection
        key={`${"overview_item_" + index}`}
        icon={overviewItem.icon}
        title={overviewItem.title}
        content={overviewItem.content}
      />;
    })}
  </div>;
}
