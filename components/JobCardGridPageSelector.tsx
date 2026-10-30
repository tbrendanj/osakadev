"use client"
import styles from "./JobCardGridPageSelector.module.css";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

export interface JobCardGridPageSelectorProps {
  currentPage: number;
  maxPage: number;
  pageNumbers: number[];
  pageSelectorFunction: (value: number) => void;
}

export default function JobCardGridPageSelector({
  currentPage,
  maxPage,
  pageNumbers,
  pageSelectorFunction,
}: JobCardGridPageSelectorProps) {
  const pageSelectorNumbers: number[] = [];
  for (let page = currentPage - 2; page <= currentPage + 2; page++) {
    pageSelectorNumbers.push(page);
  }
  return <div className={styles.job_card_grid_page_selector}>
    <a className={`${styles.page_selector} ${styles.page_selector_arrow} ${currentPage < 2 ? styles.disabled : ""}`} onClick={() => pageSelectorFunction(currentPage - 1)}>
      <BsArrowLeftShort />
    </a>
    {pageSelectorNumbers.map(pageNumber => {
      return <a key={`${"page_" + pageNumber}`} className={`${styles.page_selector} ${pageNumber === currentPage && styles.selected_page} ${!pageNumbers.includes(pageNumber) ? styles.disabled : ""}`} onClick={() => pageSelectorFunction(pageNumber)}>
        {pageNumbers.includes(pageNumber) && pageNumber}
        </a>;
    })}
    <a className={`${styles.page_selector} ${styles.page_selector_arrow} ${currentPage >= maxPage ? styles.disabled : ""}`} onClick={() => pageSelectorFunction(currentPage + 1)}>
      <BsArrowRightShort />
    </a>
  </div>;
}
