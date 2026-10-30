import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import OverviewMiniSection from "./OverviewMiniSection";

const meta = {
  title: "OverviewMiniSection",
  component: OverviewMiniSection,
  tags: ["autodocs"],
} satisfies Meta<typeof OverviewMiniSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "calendar",
    title: "Title",
    content: "Content",
  }
};

export const Stack: Story = {
  args: {
    icon: "stack",
    title: "Title",
    content: "Content",
  }
}

export const Briefcase: Story = {
  args: {
    icon: "briefcase",
    title: "Title",
    content: "Content",
  }
}
