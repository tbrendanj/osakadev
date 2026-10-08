import styles from "./CompanyLogos.module.css";

import LogoArray from "./LogoArray";

export interface CompanyLogosProps {
  firstLogoUrlArray: string[];
  secondLogoUrlArray: string[];
}

export default function CompanyLogos({
  firstLogoUrlArray,
  secondLogoUrlArray
}: CompanyLogosProps) {
  return <div className={styles.company_logos}>
    <LogoArray logoUrlArray={firstLogoUrlArray} />
    <LogoArray logoUrlArray={secondLogoUrlArray} />
  </div>;
}
