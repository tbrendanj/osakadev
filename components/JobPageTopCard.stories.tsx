import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobPageTopCard from "./JobPageTopCard";
import { Jobs } from "@/app/lib/testing/fixtures/SampleJobs";

const meta = {
  title: "JobPageTopCard",
  component: JobPageTopCard,
  tags: ["autodocs"],
} satisfies Meta<typeof JobPageTopCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    job: Jobs[0]
  }
};
