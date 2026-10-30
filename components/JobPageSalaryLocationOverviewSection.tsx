import styles from "./JobPageSalaryLocationOverviewSection.module.css";
import { BsMap } from "react-icons/bs";

export interface JobPageSalaryLocationOverviewSectionProps {
  salary: string;
  location: string;
}

export default function JobPageSalaryLocationOverviewSection({
  salary,
  location
}: JobPageSalaryLocationOverviewSectionProps) {
  return <div className={styles.job_page_salary_location}>
    <div className={styles.job_page_salary_location_subsection}>
      <h4>
        Salary
      </h4>
      <div className={styles.salary_main_text}>
        {salary}
      </div>
      <p className={styles.salary_bottom_text}>
        Yearly salary
      </p>
    </div>
    <div className={styles.job_page_salary_location_subsection}>
      <BsMap className={styles.map_icon} />
      <h4>
        Job Location
      </h4>
      <p className={styles.location_text}>
        {location}
      </p>
    </div>
  </div>;
}
