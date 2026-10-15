import styles from "./Header.module.css";

import HeaderTabs from "./HeaderTabs";

import { HeaderTabList } from "@/app/lib/static/HeaderTabList";

export default function Header() {
  return <div className={`${styles.header}`}>
    <div className={`${styles.tabs} ${"horizontally_centered"}`}>
      <div>
        <a className={styles.home} href="/">Osaka DEV</a>
      </div>
      <HeaderTabs headerTabList={HeaderTabList} />
    </div>
    <div className={`${styles.accounts} ${"horizontally_centered"}`}>
      <div className={styles.sign_in}>
        <a href="/">Login</a>
      </div>
      <div className={styles.sign_up}>
        <a href="/">Sign Up</a>
      </div>
    </div>
  </div>;
}
