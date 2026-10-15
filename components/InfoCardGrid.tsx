import styles from "./InfoCardGrid.module.css";
import InfoCard, { InfoCardProps } from "./InfoCard";

export interface InfoCardGridProps {
  infoCards: InfoCardProps[];
}

export default function InfoCardGrid({
  infoCards
}: InfoCardGridProps) {
  return <div className={styles.info_card_grid}>
    {infoCards.map((infoCard, index) => 
      <InfoCard key={"info_card_" + index} icon={infoCard.icon} title={infoCard.title} content={infoCard.content} />
    )}
  </div>;
}
