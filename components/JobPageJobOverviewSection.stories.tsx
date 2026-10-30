import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobPageJobOverviewSection from "./JobPageJobOverviewSection";
import { Jobs } from "@/app/lib/testing/fixtures/SampleJobs";

const meta = {
  title: "JobPageJobOverviewSection",
  component: JobPageJobOverviewSection,
  tags: ["autodocs"],
} satisfies Meta<typeof JobPageJobOverviewSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date("2026-01-01"),
    level: "Entry",
    education: "Bachelor's"
  }
};
