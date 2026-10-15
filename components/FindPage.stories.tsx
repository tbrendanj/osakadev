import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import FindPage from "./FindPage";

const meta = {
  title: "FindPage",
  component: FindPage,
  tags: ["autodocs"],
} satisfies Meta<typeof FindPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
