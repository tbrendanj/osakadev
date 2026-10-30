import JobWithListingDetails from "@/app/lib/types/JobWithListingDetails";

const SampleFrontend: JobWithListingDetails = {
  jobId: 1,
  title: "Frontend Developer",
  companyName: "SakuraTech",
  remoteStatus: "hybrid",
  location: "Osaka, Japan",
  salary: "¥4,000,000 – ¥6,000,000 / year",
  iconLink: "/images/noimage.png",
  description: "asdf<br>qwerty",
  details: [
    {
      category: "requirement",
      detail: "asdf",
    },
    {
      category: "requirement",
      detail: "qwerty",
    },
    {
      category: "nice",
      detail: "asdf",
    },
    {
      category: "nice",
      detail: "qwerty",
    },
    {
      category: "benefit",
      detail: "asdf",
    },
    {
      category: "benefit",
      detail: "qwerty",
    },
  ]
};

const SampleBackend: JobWithListingDetails = {
  jobId: 2,
  title: "Backend Engineer",
  companyName: "Nippon Systems",
  remoteStatus: "remote",
  location: "Tokyo, Japan",
  salary: "¥5,000,000 – ¥7,500,000 / year",
  iconLink: "/images/noimage.png",
  description: "asdf<br>qwerty",
  details: [
    {
      category: "requirement",
      detail: "asdf",
    },
    {
      category: "requirement",
      detail: "qwerty",
    },
    {
      category: "nice",
      detail: "asdf",
    },
    {
      category: "nice",
      detail: "qwerty",
    },
    {
      category: "benefit",
      detail: "asdf",
    },
    {
      category: "benefit",
      detail: "qwerty",
    },
  ]
}

export const FewJobs: JobWithListingDetails[] = [
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
];

export const Jobs: JobWithListingDetails[] = [
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
  SampleFrontend,
  SampleBackend,
];
