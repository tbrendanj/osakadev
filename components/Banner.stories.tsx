import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Banner from "./Banner";
import { HomeBannerText } from "@/app/lib/static/HomeBannerText";

const meta = {
  title: "Banner",
  component: Banner,
  tags: ["autodocs"],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: HomeBannerText,
};
