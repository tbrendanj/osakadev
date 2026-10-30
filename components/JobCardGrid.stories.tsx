import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobCardGrid from "./JobCardGrid";
import { FewJobs, Jobs } from "@/app/lib/testing/fixtures/SampleJobs";

const meta = {
  title: "JobCardGrid",
  component: JobCardGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof JobCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    jobs: FewJobs,
    isLarge: false,
  }
};

export const Large: Story = {
  args: {
    jobs: Jobs,
    isLarge: true
  }
};

