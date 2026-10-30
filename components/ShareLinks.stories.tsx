import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ShareLinks from "./ShareLinks";

const meta = {
  title: "ShareLinks",
  component: ShareLinks,
  tags: ["autodocs"],
} satisfies Meta<typeof ShareLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
