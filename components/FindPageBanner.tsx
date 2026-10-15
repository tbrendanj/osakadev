import styles from "./FindPageBanner.module.css";

import BannerSearch from "./BannerSearch";

export default function FindPage() {
  return <>
    <div className={`${styles.find_page_banner_upper} ${"horizontally_centered"}`}>
      <h2>Find Job</h2>
      <div className={"horizontally_centered"}>
        <p className={styles.find_page_banner_upper_gray_text}>Home Page /&nbsp;</p>
        <p>Find</p>
      </div>
    </div>
    <div className={styles.find_page_banner_lower}>
      <BannerSearch stretch={true} />
    </div>
  </>;
}