import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BannerSearch from "./BannerSearch";

const meta = {
  title: "BannerSearch",
  component: BannerSearch,
  tags: ["autodocs"],
} satisfies Meta<typeof BannerSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
