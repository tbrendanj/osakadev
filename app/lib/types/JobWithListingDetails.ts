/**
 * This type represents joining Job with JobListing with JobDetails with Company
 * Job > jobId, title, remoteStatus, location, salary
 * 
 * Job joined to JobListing on jobId, queried with user's language as a param
 * if not found then query the other language and translate details
 * if neither found then the job page specifies not found and offers a link back to Find
 * JobListing > description (split with <br> to define paragraph splits)
 * 
 * JobListing joined to JobDetail on jobListingId
 * Details are categorized into requirement, desirable, and benefit
 * being joined to JobListing instead of Job automatically takes care of sorting on langauge for this table
 * JobDetail > query for category and description, transform into array and attach to Job/Listing in endpoint
 * 
 * Job joined to Company on companyId
 * Company > companyName, iconLink
 */
export default interface JobWithListingDetails {
  jobId: number;
  title: string;
  remoteStatus: string;
  location: string;
  salary: string;
  description: string;
  details: JobDetail[];
  companyName: string;
  iconLink: string;

}

export interface JobDetail {
  category: string;
  detail: string;
}
