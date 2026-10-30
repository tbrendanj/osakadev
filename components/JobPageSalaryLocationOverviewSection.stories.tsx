import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobPageSalaryLocationOverviewSection from "./JobPageSalaryLocationOverviewSection";
import { Jobs } from "@/app/lib/testing/fixtures/SampleJobs";

const meta = {
  title: "JobPageSalaryLocationOverviewSection",
  component: JobPageSalaryLocationOverviewSection,
  tags: ["autodocs"],
} satisfies Meta<typeof JobPageSalaryLocationOverviewSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    salary: "¥4,000,000 – ¥6,000,000",
    location: "Osaka, Japan"
  }
};
