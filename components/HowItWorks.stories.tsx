import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HowItWorks from "./HowItWorks";

const meta = {
  title: "HowItWorks",
  component: HowItWorks,
  tags: ["autodocs"],
} satisfies Meta<typeof HowItWorks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
