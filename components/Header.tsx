import styles from "./Header.module.css";

export default function Header() {
  return <div className={styles.header}>
    <div className={styles.tabs}>
      <div>
        <a href="/">Osaka DEV</a>
      </div>
      <div>
        <a href="/">Find Jobs</a>
      </div>
      <div>
        <a href="/">Browse Jobs</a>
      </div>
    </div>
    <div className={styles.accounts}>
      <div>
        <a href="/">Login</a>
      </div>
      <div>
        <button>Sign Up</button>
      </div>
    </div>
  </div>;
}
