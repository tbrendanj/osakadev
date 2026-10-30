import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import OverviewMiniSectionGrid from "./OverviewMiniSectionGrid";

const meta = {
  title: "OverviewMiniSectionGrid",
  component: OverviewMiniSectionGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof OverviewMiniSectionGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    overviewMiniSections: [
      {
        icon: "calendar",
        title: "Title",
        content: "Content",
      },
      {
        icon: "stack",
        title: "Title",
        content: "Content",
      },
      {
        icon: "briefcase",
        title: "Title",
        content: "Content",
      },
    ]
  }
};
