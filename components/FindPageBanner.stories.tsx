import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import FindPageBanner from "./FindPageBanner";

const meta = {
  title: "FindPageBanner",
  component: FindPageBanner,
  tags: ["autodocs"],
} satisfies Meta<typeof FindPageBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
