import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobCard from "./JobCard";

const meta = {
  title: "JobCard",
  component: JobCard,
  tags: ["autodocs"],
} satisfies Meta<typeof JobCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
