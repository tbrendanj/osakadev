import styles from "./Banner.module.css";
import BannerSearch from "./BannerSearch";

export interface BannerProps {
  titleText: string;
  bannerText: string;
}

export default function Banner({
  titleText,
  bannerText
}: BannerProps) {
  return <div className={styles.banner}>
    <div className={styles.banner_inner_container}>
      <h1 className={styles.banner_text}>
        {titleText}
      </h1>
      <p className={styles.banner_text}>
        {bannerText}
      </p>
      <BannerSearch />
    </div>
  </div>;
}
