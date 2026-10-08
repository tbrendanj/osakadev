import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Categories from "./Categories";

const meta = {
  title: "Categories",
  component: Categories,
  tags: ["autodocs"],
} satisfies Meta<typeof Categories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: [
      {
        categoryName: "Backend",
        jobCount: 45,
      },
      {
        categoryName: "Backend",
        jobCount: 45,
      },
      {
        categoryName: "Backend",
        jobCount: 45,
      },
    ]
  }
};
