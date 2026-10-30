import styles from "./FindPageBanner.module.css";

export default function FindPageBanner() {
  return <>
    <div className={`${styles.find_page_banner} ${"horizontally_centered"}`}>
      <h2>Find Job</h2>
      <div className={"horizontally_centered"}>
        <p className={styles.find_page_banner_gray_text}>Home Page /&nbsp;</p>
        <p>Find</p>
      </div>
    </div>
  </>;
}