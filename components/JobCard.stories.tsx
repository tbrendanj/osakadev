import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobCard from "./JobCard";
import { Jobs } from "@/app/lib/testing/fixtures/SampleJobs";

const meta = {
  title: "JobCard",
  component: JobCard,
  tags: ["autodocs"],
} satisfies Meta<typeof JobCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    job: Jobs[0]
  }
};
