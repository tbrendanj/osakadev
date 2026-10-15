import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Tag from "./Tag";

const meta = {
  title: "Tag",
  component: Tag,
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tagName: "Backend"
  }
};
