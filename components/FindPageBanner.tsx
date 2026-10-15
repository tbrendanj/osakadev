import styles from "./FindPageBanner.module.css";

import BannerSearch from "./BannerSearch";

export default function FindPage() {
  return <>
    <div></div>
    <div className={styles.find_page_banner_lower}>
      <BannerSearch stretch={true} />
    </div>
  </>;
}