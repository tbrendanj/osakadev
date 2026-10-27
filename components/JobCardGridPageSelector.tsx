"use client"
import styles from "./JobCardGridPageSelector.module.css";

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
    {currentPage > 1 && <a className={styles.page_selector} onClick={() => pageSelectorFunction(currentPage - 1)}>&lt;</a>}
    {pageSelectorNumbers.map(pageNumber => {
      if (pageNumbers.includes(pageNumber)) {
        return <a className={`${styles.page_selector} ${pageNumber === currentPage && styles.selected_page}`} onClick={() => pageSelectorFunction(pageNumber)}>{pageNumber}</a>;
      }
      return "";
    })}
    {currentPage < maxPage && <a className={styles.page_selector} onClick={() => pageSelectorFunction(currentPage + 1)}>&gt;</a>}
  </div>;
}
