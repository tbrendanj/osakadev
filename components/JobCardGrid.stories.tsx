import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobCardGrid from "./JobCardGrid";
import { JobCards, LargeJobCards } from "@/app/lib/testing/fixtures/SampleJobCards";

const meta = {
  title: "JobCardGrid",
  component: JobCardGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof JobCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    jobCards: JobCards,
    isLarge: false,
  }
};

export const Large: Story = {
  args: {
    jobCards: LargeJobCards,
    isLarge: true
  }
};

