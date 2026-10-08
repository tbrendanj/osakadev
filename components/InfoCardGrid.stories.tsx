import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InfoCardGrid from "./InfoCardGrid";
import { InfoCards } from "@/app/lib/static/InfoCards";

const meta = {
  title: "InfoCardGrid",
  component: InfoCardGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof InfoCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    infoCards: InfoCards
  }
};
