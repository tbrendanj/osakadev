import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobCardGrid from "./JobCardGrid";

const meta = {
  title: "JobCardGrid",
  component: JobCardGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof JobCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
