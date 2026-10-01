import styles from "./Header.module.css";

export default function Header() {
  return <div className={styles.header}>
    <div className={styles.tabs}>
      <div>
        <a className={styles.home} href="/">Osaka DEV</a>
      </div>
      <div>
        <a className={styles.page_tabs} href="/">Find Jobs</a>
      </div>
      <div>
        <a className={styles.page_tabs} href="/">Browse Jobs</a>
      </div>
    </div>
    <div className={styles.accounts}>
      <div className={styles.sign_in}>
        <a href="/">Login</a>
      </div>
      <div className={styles.sign_up}>
        <a href="/">Sign Up</a>
      </div>
    </div>
  </div>;
}
