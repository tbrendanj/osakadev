import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobPageDetailSection from "./JobPageDetailSection";
import { FewJobs } from "@/app/lib/testing/fixtures/SampleJobs";

const meta = {
  title: "JobPageDetailSection",
  component: JobPageDetailSection,
  tags: ["autodocs"],
} satisfies Meta<typeof JobPageDetailSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
    jobDetails: FewJobs[0].description,
  }
};

export const DetailListFromArray: Story = {
  args: {
    title: "Title",
    jobDetails: FewJobs[0].details.filter((detail) => {
      return detail.category === "requirement"
    }),
  }
};
