import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobsDisplayHeader from "./JobsDisplayHeader";
import { HomeJobsDisplayHeaderTitle } from "@/app/lib/static/HomeJobsDisplayHeaderTitle";

const meta = {
  title: "JobsDisplayHeader",
  component: JobsDisplayHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof JobsDisplayHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: HomeJobsDisplayHeaderTitle
  }
};
