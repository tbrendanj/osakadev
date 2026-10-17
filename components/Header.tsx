import Link from "next/link";
import styles from "./Header.module.css";

import HeaderTabs from "./HeaderTabs";

import { HeaderTabList } from "@/app/lib/static/HeaderTabList";

export interface HeaderProps {
  selectedTab?: string | null;
}

export default function Header({
  selectedTab = null
}: HeaderProps) {
  return <div className={`${styles.header}`}>
    <div className={`${styles.tabs} ${"horizontally_centered"}`}>
      <div>
        <Link className={styles.home} href="/">Osaka DEV</Link>
      </div>
      <HeaderTabs headerTabList={HeaderTabList} selectedTab={selectedTab} />
    </div>
    <div className={`${styles.accounts} ${"horizontally_centered"}`}>
      <div className={styles.sign_in}>
        <Link href="/">Login</Link>
      </div>
      <div className={styles.sign_up}>
        <Link href="/">Sign Up</Link>
      </div>
    </div>
  </div>;
}
