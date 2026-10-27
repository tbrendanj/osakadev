"use client"
import { useState } from 'react';
import styles from "./JobCardGrid.module.css";
import JobCard, { JobCardProps } from "./JobCard";
import JobCardGridPageSelector from "./JobCardGridPageSelector";

import { JobCardGridSizes } from "@/app/lib/types/JobCardGridSizes";

export interface JobCardGridProps {
  jobCards: JobCardProps[];
  isLarge: boolean;
}

export default function JobCardGrid({
  jobCards,
  isLarge
}: JobCardGridProps) {
  const [pageNum, setPageNum] = useState<number>(1);
  const gridSize = isLarge ? JobCardGridSizes.LARGE : JobCardGridSizes.REGULAR;
  const maxPage = Math.ceil(jobCards.length / gridSize);
  // slice of size gridSize chosen based on the pageNum state
  const jobCardsForPage = jobCards.slice(gridSize * (pageNum - 1), gridSize * (pageNum));

  const pageSelectorNumbers = Array.from({length: maxPage}, (_, i) => i + 1);

  const validateAndSetPageNum = (pageNum: number) => {
    if (pageNum > 0 && pageNum <= maxPage) {
      setPageNum(pageNum);
    }
  }

  return <>
    <div className={`${styles.job_card_grid} ${isLarge ? styles.large_grid : ""}`}>
      {jobCardsForPage.map((jobCard, index) => 
        <JobCard 
          key={"job_card_" + index}
          title={jobCard.title}
          companyName={jobCard.companyName}
          remoteStatus={jobCard.remoteStatus}
          location={jobCard.location}
          salary={jobCard.salary}
          iconLink={jobCard.iconLink}
          jobLink={jobCard.jobLink}
        />
      )}
    </div>
    {maxPage > 1 && <JobCardGridPageSelector 
      currentPage={pageNum}
      maxPage={maxPage}
      pageNumbers={pageSelectorNumbers}
      pageSelectorFunction={validateAndSetPageNum}
    />}
  </>;
}
