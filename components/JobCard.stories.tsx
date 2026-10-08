import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import JobCard from "./JobCard";
import { JobCards } from "@/app/lib/static/SampleJobCards";

const meta = {
  title: "JobCard",
  component: JobCard,
  tags: ["autodocs"],
} satisfies Meta<typeof JobCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: JobCards[0]
};
