import styles from "./Header.module.css";

import HeaderTab from "@/app/lib/types/HeaderTab";

export interface HeaderTabsProps {
  headerTabList: HeaderTab[];
}

export default function HeaderTabs({
  headerTabList
}: HeaderTabsProps) {
  return <>
    {headerTabList.map((headerTab, index) => {
      return <div key={"header_tab_" + index}>
        <a className={styles.page_tabs} href={headerTab.link}>{headerTab.text}</a>
      </div>;
    })}
  </>;
}
