import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobsDisplay from "./JobsDisplay";
import { JobCards } from "@/app/lib/testing/fixtures/SampleJobCards";
import { HomeJobsDisplayHeaderTitle } from "@/app/lib/static/HomeJobsDisplayHeaderTitle";

const meta = {
  title: "JobsDisplay",
  component: JobsDisplay,
  tags: ["autodocs"],
} satisfies Meta<typeof JobsDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    jobCards: JobCards,
    title: HomeJobsDisplayHeaderTitle,
  }
};
