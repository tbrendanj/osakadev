import JobPage from "@/components/JobPage";
import { Jobs } from "@/app/lib/testing/fixtures/SampleJobs";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  // should be querying db when db is set up
  const { id } = await params;
  const job = Jobs.filter((job) => {
    return job.jobId === id;
  })[0];
  return <JobPage job={job} />;
}
