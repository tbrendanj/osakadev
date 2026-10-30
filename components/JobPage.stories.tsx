import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobPage from "./JobPage";
import { FewJobs } from "@/app/lib/testing/fixtures/SampleJobs";

const meta = {
  title: "JobPage",
  component: JobPage,
  tags: ["autodocs"],
} satisfies Meta<typeof JobPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    job: FewJobs[0],
  }
};
