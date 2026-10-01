import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobsDisplay from "./JobsDisplay";

const meta = {
  title: "JobsDisplay",
  component: JobsDisplay,
  tags: ["autodocs"],
} satisfies Meta<typeof JobsDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
