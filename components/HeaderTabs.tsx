import styles from "./Header.module.css";

import HeaderTab from "@/app/lib/types/HeaderTab";

export interface HeaderTabsProps {
  headerTabList: HeaderTab[];
  selectedTab?: string | null;
}

export default function HeaderTabs({
  headerTabList,
  selectedTab = null
}: HeaderTabsProps) {
  return <>
    {headerTabList.map((headerTab, index) => {
      return <div key={"header_tab_" + index}>
        <a className={`${styles.page_tabs} ${selectedTab === headerTab.text ? styles.selected : ""}`} href={headerTab.link}>{headerTab.text}</a>
      </div>;
    })}
  </>;
}
