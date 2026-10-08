import styles from "./HowItWorks.module.css";
import { InfoCardProps } from "./InfoCard";
import InfoCardGrid from "./InfoCardGrid";

export interface HowItWorksProps {
  title: string;
  content: string;
  infoCards: InfoCardProps[];
}

export default function HowItWorks({
  title,
  content,
  infoCards
}: HowItWorksProps) {
  return <div className={styles.how_it_works}>
    <h2>
      {title}
    </h2>
    <p>
      {content}
    </p>
    <InfoCardGrid infoCards={infoCards} />
  </div>;
}
