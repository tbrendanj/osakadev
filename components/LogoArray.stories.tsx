import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import LogoArray from "./LogoArray";

import { FirstLogoUrlArray } from "@/app/lib/testing/fixtures/LogoUrlArrays";

const meta = {
  title: "LogoArray",
  component: LogoArray,
  tags: ["autodocs"],
} satisfies Meta<typeof LogoArray>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logoUrlArray: FirstLogoUrlArray
  }
};
