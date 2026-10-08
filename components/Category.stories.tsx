import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Category from "./Category";

const meta = {
  title: "Category",
  component: Category,
  tags: ["autodocs"],
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categoryName: "Backend",
    jobCount: 45,
  }
};
