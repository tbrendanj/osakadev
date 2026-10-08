import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobsDisplayHeader from "./JobsDisplayHeader";

const meta = {
  title: "JobsDisplayHeader",
  component: JobsDisplayHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof JobsDisplayHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
