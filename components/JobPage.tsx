import JobWithListingDetails from "@/app/lib/types/JobWithListingDetails";
import styles from "./JobPage.module.css";
import JobPageTopCard from "./JobPageTopCard";
import JobPageDetailSection from "./JobPageDetailSection";
import JobPageSalaryLocationOverviewSection from "./JobPageSalaryLocationOverviewSection";

export interface JobPageProps {
  job: JobWithListingDetails;
}

export default function JobPage({
  job,
}: JobPageProps) {
  const requirements = job.details.filter((detail) => {
    return detail.category === "requirement"
  });
  const desirable = job.details.filter((detail) => {
    return detail.category === "desirable"
  });
  const benefits = job.details.filter((detail) => {
    return detail.category === "benefit"
  });
  return <div className={styles.job_page}>
    <JobPageTopCard job={job} />
    <div className={styles.job_page_main_section}>
      <div className={styles.job_page_details_sections}>
        <JobPageDetailSection
          title={"Job Description"}
          jobDetails={job.description}
        />
        <JobPageDetailSection
          title={"Requirements"}
          jobDetails={requirements}
        />
        <JobPageDetailSection
          title={"Desirable"}
          jobDetails={desirable}
        />
        <JobPageDetailSection
          title={"Benefits"}
          jobDetails={benefits}
        />
      </div>
      <div className={styles.job_page_overview_sections}>
        <JobPageSalaryLocationOverviewSection salary={job.salary} location={job.location} />
      </div>
    </div>
  </div>;
}