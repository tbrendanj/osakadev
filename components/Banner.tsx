import styles from "./Banner.module.css";
import BannerSearch from "./BannerSearch";

export default function Banner() {
  return <div className={styles.banner}>
    <div className={styles.banner_inner_container}>
      <h1 className={styles.banner_text}>
        Find Your Next Developer Job in Japan
      </h1>
      <p className={styles.banner_text}>
        Discover top tech companies hiring in Japan. Filter by role, skills, or location and apply in one click!
      </p>
      <BannerSearch />
    </div>
  </div>;
}
