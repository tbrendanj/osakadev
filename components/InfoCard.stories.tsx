import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InfoCard from "./InfoCard";
import { InfoCards } from "@/app/lib/static/InfoCards";

const meta = {
  title: "InfoCard",
  component: InfoCard,
  tags: ["autodocs"],
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: InfoCards[0]
};
