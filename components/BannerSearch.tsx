import styles from "./BannerSearch.module.css";
import 'material-symbols/outlined.css';
import { HiLocationMarker } from "react-icons/hi";

export default function Banner() {
  return <div className={`${"horizontally_centered"} ${styles.banner_search}`}>
    <span className={`${"material-symbols-outlined"} ${styles.banner_search_icon}`}>search</span>
    <input className={styles.banner_search_input} name="query" placeholder="Search Job Title, Keyword, or Skill"></input>
    <HiLocationMarker className={styles.banner_search_icon}/>
    <input className={styles.banner_search_input} name="location" placeholder="City, Prefecture, or Remote"></input>
    <button className={`${"horizontally_centered"} ${styles.banner_search_button}`}>
      Find Jobs
      <span className={`${"material-symbols-outlined"} ${styles.banner_search_icon}`}>search</span>
    </button>
  </div>;
}
