import styles from "./ShareLinks.module.css";
import { BsLink45Deg, BsLinkedin, BsFacebook, BsTwitter, BsEnvelope } from "react-icons/bs";

export default function ShareLinks() {
  return <div className={styles.share_links}>
    <h3>
      Share This Job
    </h3>
    <div className={styles.links}>
      <a className={`${styles.share_links_button} ${"horizontally_centered"}`}>
        <BsLink45Deg />
        Copy Links
      </a>
      <a className={`${styles.share_links_button} ${"horizontally_centered"}`}>
        <BsLinkedin />
      </a>
      <a className={`${styles.share_links_button} ${"horizontally_centered"}`}>
        <BsFacebook />
      </a>
      <a className={`${styles.share_links_button} ${"horizontally_centered"}`}>
        <BsTwitter />
      </a>
      <a className={`${styles.share_links_button} ${"horizontally_centered"}`}>
        <BsEnvelope />
      </a>
    </div>
  </div>;
}
